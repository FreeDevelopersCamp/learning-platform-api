import { Inject, Injectable } from '@nestjs/common';
import { ChangePassword } from '../models/changePassword';
import { Login } from '../models/login';
import { PasswordService } from './password.service';
import {
  ExistUserException,
  InvalidLoginException,
  LoginAttemptsException,
  PasswordFailedException as PasswordFailedException,
} from 'src/utils/exception';
import { TokenService } from './token.service';
import { Payload, Token } from '../models/payload';
import { System, UserRequested } from 'src/infra/system/system.constant';
import { Connection } from 'mongoose';
import { CreateUserDto } from 'src/modules/core/dto/user/create.user';
import { ResourceUserDto } from 'src/modules/core/dto/user/resource.user';
import { UserService } from 'src/modules/core/services/user/user.service';
import { ResourceTenancyDto } from 'src/modules/core/dto/tenancy/resource.tenancy';
import { SessionService } from '../session/sessions.service';
import { Session, SessionParams } from '../session/session';
import { SessionStatus } from '../models/enum/session.status';
import { LookupService } from 'src/modules/core/services/lookup/lookup.service';
import { RoleFactory } from '../guards/roles/roleFactory';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('TENANT_CONNECTION') private _con: Connection,
    private _tokenService: TokenService,
    private _userService: UserService,
    private _passwordService: PasswordService,
    private _sessionService: SessionService,
    private _lookupService: LookupService,
    private _roleFactory: RoleFactory,
  ) {}

  async setConnection(model: ResourceTenancyDto) {
    await this._userService.setConnection(model.alias, model.mongoConnections);
  }

  async register(dto: CreateUserDto): Promise<Token> {
    UserRequested.username = dto.userName;

    const validatePassword = this._passwordService.validatePassword(
      dto.password,
    );

    if (!validatePassword.isValid)
      throw new PasswordFailedException(validatePassword.message);

    const userName = dto.userName.trim().toLowerCase();
    const isUserExists = await this._userService.getByUserName(userName, true);

    if (isUserExists) throw new ExistUserException();

    const user = await this._createUser(dto);

    const tenancyId =
      System.tenancies.find(
        (a) => a.mongoConnections.database == this._con.name,
      ).alias || '';

    const payload: Payload = {
      userId: user._id,
      username: user.userName,
      roles: user.roles,
      tenancyId: tenancyId,
      menu: [],
    };

    const token = await this._tokenService.sign(payload);

    const session = await this._setSession(
      true,
      SessionStatus.active,
      dto.userName,
      dto.roles[0],
      dto.password,
      token,
    );

    if (!session) throw new InvalidLoginException('Invalid session');

    return {
      token: token,
    };
  }

  async login(login: Login): Promise<Token> {
    let user;

    if (!login.password) {
      throw new InvalidLoginException();
    }
    if (!login.userName && !login.email) {
      throw new InvalidLoginException();
    } else if (!login.userName) {
      user = await this._userService.getByEmail(login.email, true);

      UserRequested.username = user.userName;
    } else if (!login.email) {
      user = await this._userService.getByUserName(login.userName, true);
      UserRequested.username = user.userName;
    }

    if (
      (await this._sessionService.isReachMaxAttempts()) &&
      !(await this._sessionService.checkIfCanRetry())
    ) {
      throw new LoginAttemptsException();
    }

    if (!login.role) {
      login.role = user.roles[0];
    }

    if (!user.roles.includes(login.role))
      throw new LoginAttemptsException(
        'You are not allowed to login with this role',
      );

    if (!user) {
      await this._setSession(
        false,
        SessionStatus.inactive,
        login.userName,
        login.role,
        login.password,
        '',
      );

      throw new InvalidLoginException();
    }

    const isMatch = await this._passwordService.comparePasswords(
      login.password,
      user.password,
    );

    if (!isMatch) {
      await this._setSession(
        false,
        SessionStatus.inactive,
        login.userName,
        login.role,
        login.password,
        '',
      );

      throw new InvalidLoginException();
    }

    const tenancyId =
      System.tenancies.find(
        (a) => a.mongoConnections.database == this._con.name,
      ).alias || '';

    const payload: Payload = {
      userId: user._id,
      username: user.userName,
      roles: user.roles,
      tenancyId: tenancyId,
      menu: [],
    };

    const token = await this._tokenService.sign(payload);

    const session = await this._setSession(
      true,
      SessionStatus.active,
      login.userName,
      login.role,
      login.password,
      token,
    );

    if (!session) throw new InvalidLoginException('Invalid session');

    return {
      token: token,
    };
  }

  async changePassword(changePassword: ChangePassword): Promise<Token> {
    const user = await this._userService.getByUserName(
      changePassword.userName,
      true,
    );

    if (!user) throw new InvalidLoginException();

    const checkOldPassword = await this._passwordService.comparePasswords(
      changePassword.oldPassword,
      user.password,
    );

    if (!checkOldPassword)
      throw new PasswordFailedException('Your old password is wrong');

    const newPassword = await this._passwordService.hashPassword(
      changePassword.newPassword,
    );

    const checkedNewPassword = await this._passwordService.comparePasswords(
      changePassword.newPassword,
      user.password,
    );

    if (checkedNewPassword)
      throw new PasswordFailedException('You have not updated your password');

    user.password = newPassword;
    const updatedUser = await this._userService.update(user);

    const token: string = await this.login({
      userName: updatedUser.userName,
      role: updatedUser.roles[0],
      password: changePassword.newPassword,
    }).then();

    const session = await this._setSession(
      true,
      SessionStatus.active,
      user.userName,
      user.roles[0],
      user.password,
      token,
    );

    if (!session) {
      throw new InvalidLoginException('Cannot update session');
    }

    return { token: token };
  }

  async killSession(): Promise<boolean> {
    return await this._sessionService.killSession();
  }

  private async _createUser(dto: CreateUserDto): Promise<ResourceUserDto> {
    dto.password = await this._passwordService.hashPassword(dto.password);

    let user = await this._userService.create(dto);

    // Iterate over roles and use the factory to handle role-specific logic
    for (const role of dto.roles) {
      const { service, dto: roleDto } = this._roleFactory.getServiceAndDto(
        role,
        user._id,
      );
      await service.create(roleDto); // Call the service's create method with the appropriate DTO
    }

    return user;
  }

  private async _setSession(
    active: boolean,
    status: SessionStatus,
    userName: string,
    role: string,
    password: string,
    token: string,
  ): Promise<Session> {
    const sessionParams: SessionParams = {
      active: active,
      status: status,
      token: token,
      password: password,
      role: role,
      username: userName,
    };

    return await this._sessionService.set(sessionParams);
  }

  async getAllRoles(): Promise<string[]> {
    return await this._lookupService.getRoles();
  }

  async getSessionData(): Promise<Session> {
    return await this._sessionService.get();
  }
}

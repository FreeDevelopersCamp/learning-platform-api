import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { UserNotFoundException } from 'src/utils/exception';
import { CreateUserDto } from '../../dto/user/create.user';
import { ForAuthUserDto, ResourceUserDto } from '../../dto/user/resource.user';
import { UpdateUserDto } from '../../dto/user/update.user';
import { User, UserSchema } from '../../entity/user/user.schema';
import { MongooseConnectionService } from 'src/Infra/database/Service/mongoose.connection.service';
import { MongoConnection } from '../../entity/tenancy/tenancy.schema';
import { UserRequested } from 'src/infra/system/system.constant';

@Injectable()
export class UserService {
  private _userRepo: IMongoRepository<User>;

  constructor(
    @Inject('USER_MODEL') private _userModel: Model<User>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly connectionService: MongooseConnectionService,
  ) {
    this._userRepo = new MongoRepository(_userModel);
  }

  async setConnection(tenantId: string, mongoConnection: MongoConnection) {
    const connection = await this.connectionService.getConnection(
      tenantId,
      mongoConnection,
    );
    this._userModel = connection.model(User.name, UserSchema);
    this._userRepo = new MongoRepository<User>(this._userModel);
  }

  async list(): Promise<ResourceUserDto[]> {
    const users = await this._userRepo.findAll();

    return this._mapper.mapArray(users, User, ResourceUserDto);
  }

  async listForSidebar(): Promise<ResourceUserDto[]> {
    const users = await this._userRepo.findAll();

    console.log(UserRequested?.userId);
    return this._mapper.mapArray(
      users.filter((u) => u._id.toString() != UserRequested.userId),
      User,
      ResourceUserDto,
    );
  }

  async getById(id: string): Promise<ResourceUserDto> {
    if (!id || id == ',') {
      id = UserRequested.userId;
    }
    const user = this._mapper.map(
      await this._userRepo.findOne(id),
      User,
      ResourceUserDto,
    );
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async getUserRequested(): Promise<ResourceUserDto> {
    const id = UserRequested.userId;

    const user = this._mapper.map(
      await this._userRepo.findOne(id),
      User,
      ResourceUserDto,
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async create(dto: CreateUserDto): Promise<ResourceUserDto> {
    return this._mapper.map(
      await this._userRepo.create(new this._userModel(dto)),
      User,
      ResourceUserDto,
    );
  }

  async getByUserName(userName: string): Promise<ResourceUserDto>;
  async getByUserName(
    userName: string,
    forAuth: boolean,
  ): Promise<ForAuthUserDto>;

  async getByUserName(userName: string, forAuth?: boolean) {
    const users = await this.list();
    const user = forAuth
      ? this._mapper.map(
          (await this._userRepo.findAll()).find((a) => a.userName === userName),
          User,
          ForAuthUserDto,
        )
      : Array.isArray(users)
        ? users.find((a) => a.userName === userName)
        : null;

    if (!user && !forAuth) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async getByEmail(email: string, forAuth?: boolean) {
    const users = await this.list();
    const user = forAuth
      ? this._mapper.map(
          (await this._userRepo.findAll()).find(
            (a) => a.contacts.email === email,
          ),
          User,
          ForAuthUserDto,
        )
      : Array.isArray(users)
        ? users.find((a) => a.contacts.email === email)
        : null;

    if (!user && !forAuth) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async update(dto: UpdateUserDto): Promise<ResourceUserDto> {
    const user = await this._userRepo.findOne(dto._id);
    if (!user) {
      throw new UserNotFoundException();
    }
    user.contacts.email = dto.contacts.email || user.contacts.email;

    user.roles = dto.roles || user.roles;

    user.contacts.mobile.mobile =
      dto.contacts.mobile.mobile || user.contacts.mobile.mobile;

    user.personalInformation.name.first =
      dto.personalInformation.name.first || user.personalInformation.name.first;

    user.personalInformation.name.second =
      dto.personalInformation.name.second ||
      user.personalInformation.name.second;

    user.personalInformation.name.third =
      dto.personalInformation.name.third || user.personalInformation.name.third;

    user.personalInformation.name.last =
      dto.personalInformation.name.last || user.personalInformation.name.last;

    user.image = dto.image || user.image;

    const updatedUser = await this._userRepo.update(new this._userModel(user));

    return this._mapper.map(updatedUser, User, ResourceUserDto);
  }

  async delete(id: string): Promise<boolean> {
    return await this._userRepo.delete(id);
  }
}

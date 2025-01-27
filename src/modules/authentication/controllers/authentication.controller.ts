import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../service/authentication.service';
import { Login } from '../models/login';
import { ChangePassword } from '../models/changePassword';
import { CreateUserDto } from 'src/modules/core/dto/user/create.user';
import { AuthGuard } from '../guards/auth/auth.guard';
import { Token } from '../models/payload';
import { Session } from '../session/session';

@ApiBearerAuth('authorization')
@Controller('Auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private _authService: AuthenticationService) {}

  @Post('register')
  @ApiResponse({
    description: 'Register token',
    isArray: false,
    type: Token,
  })
  register(@Body() dto: CreateUserDto): Promise<Token> {
    return this._authService.register(dto);
  }

  @Post('login')
  @ApiResponse({
    description: 'login token',
    isArray: false,
    type: Token,
  })
  login(@Body() login: Login): Promise<Token> {
    return this._authService.login(login);
  }

  @Post('changePassword')
  @Post('register')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'Change password token',
    isArray: false,
    type: Token,
  })
  changePassword(@Body() changePassword: ChangePassword): Promise<Token> {
    return this._authService.changePassword(changePassword);
  }

  @Post('logout')
  @ApiResponse({
    description: 'killSession',
    isArray: false,
    type: Boolean,
  })
  @UseGuards(AuthGuard)
  killSession(): Promise<boolean> {
    return this._authService.killSession();
  }

  @Get('session')
  @ApiResponse({
    description: 'Get Session',
    isArray: false,
    type: Session,
  })
  getSession(): Promise<Session> {
    return this._authService.getSessionData();
  }

  @Get('sessions')
  @ApiResponse({
    description: 'Get all Sessions',
    isArray: true,
    type: Session,
  })
  listSession(): Promise<Session[]> {
    return this._authService.listSession();
  }

  @Get('roles')
  @ApiResponse({
    description: 'Get All Roles',
    type: String,
  })
  getAllRoles(): Promise<string[]> {
    return this._authService.getAllRoles();
  }
}

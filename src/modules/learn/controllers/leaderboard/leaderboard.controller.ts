import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
  } from '@nestjs/common';
  import { LeaderboardService } from '../../services/leaderboard/leaderboard.service';
  import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
  import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
  import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
  import { CreateLeaderboardDto } from '../../dto/leaderboard/create.leaderboard';
  import { UpdateLeaderboardDto } from '../../dto/leaderboard/update.leaderboard';
  import { ResourceLeaderboardDto } from '../../dto/leaderboard/resource.leaderboard';
  
  @ApiBearerAuth('authorization')
  @ApiTags('leaderboard')
  @Controller('leaderboard')
  export class LeaderboardController {
    constructor(private readonly _leaderboardService: LeaderboardService) {}
  
    @Get()
    @ApiResponse({
    description: 'List of leaderboard',
    isArray: true,
    type: ResourceLeaderboardDto,
    })
    list() {
      return this._leaderboardService.list();
    }
  
    @Get('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'leaderboard information',
    isArray: false,
    type: ResourceLeaderboardDto,
    })
    getById(@Param('id') id: string) {
      return this._leaderboardService.getById(id);
    }
  
    @Post()
    @UsePipes(new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'leaderboard created information',
    isArray: false,
    type: ResourceLeaderboardDto,
    })
    create(@Body() leaderboard: CreateLeaderboardDto) {
      return this._leaderboardService.create(leaderboard);
    }
  
    @Patch()
    @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'leaderboard updated information',
    isArray: false,
    type: ResourceLeaderboardDto,
    })
    update(@Body() leaderboard: UpdateLeaderboardDto) {
      return this._leaderboardService.update(leaderboard);
    }
  
    @Delete('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceLeaderboardDto,
    })
    delete(@Param('id') id: string) {
      return this._leaderboardService.delete(id);
    }
  }  

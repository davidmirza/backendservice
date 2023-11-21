import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JoinService } from './join.service';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';
import { JoinRoom } from './schema/join.schema';

@Controller('join')
export class JoinController {
  constructor(private readonly joinService: JoinService) {}

  @Post()
  create(@Body() createJoinDto: CreateJoinDto) {
    return this.joinService.create(createJoinDto);
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<{success:boolean, message:string, dtJoin: JoinRoom}> {
    return this.joinService.findOne(email);
  }

  
}

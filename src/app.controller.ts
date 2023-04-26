import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import {UserDtoValidacao} from './objetos/userDtoValidacao'
import { userUpDateDto } from './objetos/userUpDateDto';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() user: UserDtoValidacao) {
  return  this.appService.create(user)
    // Your create method logic
  }
  @Post(":id")
  @UsePipes(new ValidationPipe())
  update(@Body() user: userUpDateDto,@Param("id") id:number) {
  return  this.appService.update(user,id)
  }
}



import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import {UserDtoValidacao} from './objetos/userDtoValidacao'



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() user: UserDtoValidacao) {
    // Your create method logic
  }
}



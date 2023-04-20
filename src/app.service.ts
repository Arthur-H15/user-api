import { Injectable } from '@nestjs/common';
import { Usuarios } from './entities/Usuarios';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDtoValidacao } from './objetos/userDtoValidacao';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Usuarios)
    private UsuarioRP:Repository<Usuarios>
  ){}
  getHello(): string {
    return 'Hello World!';
  }
  create(usuario:UserDtoValidacao){
   const novoUsuario= this.UsuarioRP.create(usuario)
   this.UsuarioRP.save(novoUsuario).then(()=>{console.log('criado com sucesso')})
  }
}

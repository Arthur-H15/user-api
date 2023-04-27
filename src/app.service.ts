import { BadRequestException, Injectable } from '@nestjs/common';
import { Usuarios } from './entities/Usuarios';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDtoValidacao } from './objetos/userDtoValidacao';
import { userUpDateDto } from './objetos/userUpDateDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Usuarios)
    private UsuarioRP:Repository<Usuarios>
  ){}
  findOne(){}
  findAll(){
   return this.UsuarioRP.find({select:['id','nome','email','numero','excluido','ativo']})
  }
create(usuario:UserDtoValidacao){
  try {
    const novoUsuario= this.UsuarioRP.create(usuario)
    novoUsuario.senha=this.criptografarSenha(novoUsuario.senha)
    if(!novoUsuario) throw new BadRequestException("error ao criar Usuario");
  return this.UsuarioRP.save(novoUsuario)
    
    
  } catch (error) {
    console.log(error)
    return error
  }
   
  }
 async update(usuario:userUpDateDto,id:number){
    try {
    const camposPadroes ={dataAtualizacao:new Date()}

      const updateUser=this.UsuarioRP.create({...usuario,...camposPadroes})
      if(updateUser.senha) updateUser.senha=this.criptografarSenha(updateUser.senha) ;
    if(!updateUser) throw new BadRequestException("error ao Atualizar Usuario");
     let atualizado= await this.UsuarioRP.update(id,updateUser)
     if(atualizado.affected<1) throw new BadRequestException("error ao Atualizar Usuario");
      return this.UsuarioRP.findOne({where:{id}})
      
    } catch (error) {
      return  error
      
    }
    
  }
  criptografarSenha(senha:string){
    return bcrypt.hashSync(senha,10)
  }
  // adicionarPropriedades(dados,tipoObjeto:number) {
  //   if(!dados) return dados;
  //   let retorno={};
  //   let chavesExcluidas=["excluido","ativo","dataCriacao","dataAtualizacao"];
  //   if(tipoObjeto==2) chavesExcluidas=["dataCriacao","dataAtualizacao"];
  //  const chavesDados = Object.keys(dados); 
  //  console.log(chavesDados)
  // for (let index = 0; index < chavesDados.length; index++) {
  //   const chave = chavesDados[index];
  //   if(chavesExcluidas.some(f=>f==chave))continue;
  //     retorno[chave] = dados[chave];
  // }
  //   return retorno;
  // }
}

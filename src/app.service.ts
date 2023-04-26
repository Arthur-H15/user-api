import { BadRequestException, Injectable } from '@nestjs/common';
import { Usuarios } from './entities/Usuarios';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDtoValidacao } from './objetos/userDtoValidacao';
import { userUpDateDto } from './objetos/userUpDateDto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Usuarios)
    private UsuarioRP:Repository<Usuarios>
  ){}
  findOne(){}
  findAll(){
   return this.UsuarioRP.find()
  }
create(usuario:UserDtoValidacao){
  try {
   
console.log(this.adicionarPropriedades(usuario,1),"aqui")
  //   const novoUsuario= this.UsuarioRP.create(usuarioCreate)
  //   if(!novoUsuario) throw new BadRequestException("error ao criar Usuario");
  // return this.UsuarioRP.save(novoUsuario)
    
    
  } catch (error) {
    return error
  }
   
  }
 async update(usuario:userUpDateDto,id:number){
    try {
    const camposPadroes ={dataAtualizacao:new Date()}

      const updateUser=this.UsuarioRP.create({...usuario,...camposPadroes})
    if(!updateUser) throw new BadRequestException("error ao Atualizar Usuario");
     let atualizado= await this.UsuarioRP.update(id,updateUser)
     if(atualizado.affected<1) throw new BadRequestException("error ao Atualizar Usuario");
      return this.UsuarioRP.findOne({where:{id}})
      
    } catch (error) {
      return error
      
    }
    
  }
  adicionarPropriedades(dados,tipoObjeto:number) {
    if(!dados) return dados;
    let retorno={};
    let chavesExcluidas=["excluido","ativo","dataCriacao","dataAtualizacao"];
    if(tipoObjeto==2) chavesExcluidas=["dataCriacao","dataAtualizacao"];
   const chavesDados = Object.keys(dados); 
   console.log(chavesDados)
  for (let index = 0; index < chavesDados.length; index++) {
    const chave = chavesDados[index];
    if(chavesExcluidas.some(f=>f==chave))continue;
      retorno[chave] = dados[chave];
  }
    return retorno;
  }
}

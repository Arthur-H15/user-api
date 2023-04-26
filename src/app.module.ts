import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/Usuarios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Tipo de banco de dados
      host: 'db', // Host do banco de dados
      port: 3306, // Porta do banco de dados
      username: 'root', // Nome de usuário do banco de dados
      password: 'password', // Senha do banco de dados
      database: 'db', // Nome do banco de dados
      synchronize: true, // Sincronizar automaticamente as entidades com o banco de dados (apenas para ambiente de desenvolvimento)
      entities: [Usuarios], // Entidades do TypeORM


    }),
    TypeOrmModule.forFeature([
      Usuarios
    ])
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

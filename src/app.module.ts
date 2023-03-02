import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CrudModule } from './modules/crud/crud.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user';
import { Data } from './typeorm/entities/crud';
@Module({
  imports: [   TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'basic-modules',
    entities: [User,Data],
    synchronize: true,
  }),
    AuthModule, CrudModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

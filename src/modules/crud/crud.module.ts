import { Module } from '@nestjs/common';
import { CrudService } from './services/crud/crud.service';
import { CrudController } from './controllers/crud/crud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from 'src/typeorm/entities/crud';
@Module({
  imports:[TypeOrmModule.forFeature([Data])],
  providers: [CrudService],
  controllers: [CrudController]
})
export class CrudModule {}

import {
    Controller,
    Post,
    Body,
    Get,
    Delete,
    Param,
    Patch,
    HttpException,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CrudService } from '../../services/crud/crud.service';
import { DataDto } from '../../dto/data.dto';
import { UpdateDataDto } from '../../dto/updateData.dto';

@Controller('crud')
export class CrudController {
    constructor(private readonly crudService: CrudService) {    }
    @Post('/addData')
    @UsePipes(ValidationPipe)
    async addData(@Body() DataDto: DataDto) {
      const generatedId = await this.crudService.addData(DataDto);
      return {
        id: generatedId,
        message: 'Data Created Successfully!',
        StatusCode: HttpStatus.OK,
      };
    }
    @Get('/getAll')
    async getAll() {
      const data = await this.crudService.getAll();
      return {
        data: data,
        message: 'Data get Successfully!',
        StatusCode: HttpStatus.OK,
      };
    }
    @Get('/getOne/:id')
  async getOne(@Param('id') dataId: string) {
      const data = await this.crudService.getOne(dataId);
      return {
        data: data,
        message: 'Data get Successfully!',
        StatusCode: HttpStatus.OK,
      };
    }

    @Delete('deleteOne/:id')
    async deleteOne(@Param('id') dataId: string) {
        const data = await this.crudService.deleteOne(dataId);
        return {
          data: data,
          message: 'Data delete Successfully!',
          StatusCode: HttpStatus.OK,
        };}
        @Patch('updateData/:id')
        async updateData(@Param('id') id: string, @Body() UpdateDataDto:UpdateDataDto) {
          const res = this.crudService.updateData(id, UpdateDataDto);
          return res;
        }
}

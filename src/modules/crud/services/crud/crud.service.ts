import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from 'src/typeorm/entities/crud';
import { Repository } from 'typeorm';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Data) private dataRepository: Repository<Data>,
  ) {}
  async addData(DataDto: any) {
    const data = await this.dataRepository.findOneBy({
      name: DataDto.name,
    });

    if (data) {
      throw new HttpException('data already exist!', HttpStatus.OK);
    } else {
      const id = CryptoJS.randomBytes(16).toString('hex');
      const newData = this.dataRepository.create({
        id: id,
        name: DataDto.name,
        value: DataDto.value,
      });
      const result = await this.dataRepository.save(newData);
      return result.id as string;
    }
  }

  //get stocks
  async getAll() {
    const data = await this.dataRepository.find();
    return data;
  }

         //getSingledata
         async getOne(dataId: string) {
            const data = await this.dataRepository.findOneBy({
                id: dataId,
            })
            if (!data) {
              throw new HttpException('data does not exist!', HttpStatus.OK);
            } else {
              return data
            }
          }

              //delete
    async deleteOne(dataId: string) {
        const result=await this.dataRepository.delete({id:dataId})
        if (result.affected === 0) {
          throw new HttpException('User not found!', HttpStatus.OK);
        } else {
          return result
        }
      }

        //update stock
        async updateData(id: string,UpdateDataDto:any) {
            const data= await this.dataRepository
              .update({ id: id }, UpdateDataDto)
              if (!data) {
                throw new HttpException('Stock not exist!', HttpStatus.OK);
              } else {
                return {
                  message: 'Data update Successfully!',
                  StatusCode: HttpStatus.OK,
                  data:data
                };
          }}
    }

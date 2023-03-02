import { IsNotEmpty } from 'class-validator';

export class DataDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  value: number;
}
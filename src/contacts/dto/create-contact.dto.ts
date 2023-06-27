import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  profilePhoto: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  notes: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
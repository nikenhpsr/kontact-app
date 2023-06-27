import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from "class-validator"

export class UpdateContactDto{
    @ApiProperty()
    @IsString()
    @IsOptional()
    profilePhoto: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    address: string
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    notes: string
}

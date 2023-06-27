import { ApiProperty } from '@nestjs/swagger';

export class RegistrationResponseEntity {
  @ApiProperty()
  message: string;

  @ApiProperty()
  userId: string;
}

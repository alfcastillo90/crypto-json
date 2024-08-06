import { ApiProperty } from '@nestjs/swagger';

export class CreateJsonDto {
  @ApiProperty({ example: 'test', description: 'El contenido del JSON' })
  data: string;
}

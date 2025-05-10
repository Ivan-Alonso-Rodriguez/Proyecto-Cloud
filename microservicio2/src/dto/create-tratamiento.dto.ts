import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTratamientoDto {
  @ApiProperty({ example: 'Vacuna antirrábica' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Primera dosis aplicada' })
  @IsString()
  descripcion: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTratamientoDto {
  @ApiProperty({ example: 'Desparasitación', description: 'Nombre del tratamiento' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: 'Tratamiento contra parásitos intestinales', description: 'Descripción del tratamiento' })
  @IsString()
  @IsNotEmpty()
  descripcion!: string;
}

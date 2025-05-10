import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsArray,
  IsInt,
  ArrayNotEmpty
} from 'class-validator';

export class CreateConsultaDto {
  @ApiProperty({ example: '2025-05-04T12:00:00.000Z', description: 'Fecha de la consulta' })
  @IsDateString()
  fecha!: string;

  @ApiProperty({ example: 'Chequeo general', description: 'Motivo de la consulta' })
  @IsString()
  @IsNotEmpty()
  motivo!: string;

  @ApiProperty({ example: [1, 2], description: 'IDs de tratamientos relacionados' })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  tratamientoIds!: number[];

  @ApiProperty({ example: 1, description: 'ID de la mascota asociada' })
  @IsInt()
  mascotaId!: number;
}

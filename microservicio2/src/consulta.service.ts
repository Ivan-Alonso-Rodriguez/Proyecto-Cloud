import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from './entities/consulta.entity';
import { Tratamiento } from './entities/tratamiento.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import axios from 'axios';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Consulta)
    private consultaRepo: Repository<Consulta>,

    @InjectRepository(Tratamiento)
    private tratamientoRepo: Repository<Tratamiento>,
  ) {}

  async findAll() {
    return this.consultaRepo.find({ relations: ['tratamientos'] });
  }

  async findOne(id: number) {
    return this.consultaRepo.findOne({ where: { id }, relations: ['tratamientos'] });
  }

  async create(dto: CreateConsultaDto) {
     console.log('DTO recibido:', dto); 
    // Validacion con microservicio 1 (mascota)
    try {
      const response = await axios.get(`http://lb-proyecto-1773710960.us-east-1.elb.amazonaws.com:8000/api/mascotas/${dto.mascotaId}/`);
      if (response.status !== 200) {
        throw new Error();
      }
    } catch (error) {
      throw new HttpException('Mascota no encontrada en el Microservicio 1', HttpStatus.BAD_REQUEST);
    }

    // Relacion con tratamientos
    const tratamientos = await this.tratamientoRepo.findByIds(dto.tratamientoIds);

    const consulta = this.consultaRepo.create({
      fecha: new Date(dto.fecha), // 👈 esto corrige el problema
      motivo: dto.motivo,
      mascotaId: dto.mascotaId,
      tratamientos,
    });

    return this.consultaRepo.save(consulta);
  }

  async update(id: number, dto: CreateConsultaDto) {
    const consulta = await this.consultaRepo.findOneBy({ id });
    if (!consulta) return null;

    consulta.fecha = new Date(dto.fecha);
    consulta.motivo = dto.motivo;
    consulta.mascotaId = dto.mascotaId;
    consulta.tratamientos = await this.tratamientoRepo.findByIds(dto.tratamientoIds);

    return this.consultaRepo.save(consulta);
  }

  async remove(id: number) {
    await this.consultaRepo.delete(id);
    return { deleted: true };
  }
}

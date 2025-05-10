import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { Tratamiento } from './entities/tratamiento.entity';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { TratamientoService } from './tratamiento.service';
import { TratamientoController } from './tratamiento.controller';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.31.21.115',     // IP privada de tu EC2 con MySQL
      port: 3307,                // Puerto mapeado (3307 externo → 3306 interno)
      username: 'root',
      password: 'utec',
      database: 'consultasdb',
      entities: [Consulta, Tratamiento],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),

    TypeOrmModule.forFeature([Consulta, Tratamiento]),
  ],

  controllers: [ConsultaController, TratamientoController, HealthController],
  providers: [ConsultaService, TratamientoService],
})
export class AppModule {}

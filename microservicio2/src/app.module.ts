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
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: 3307,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'clinica_db',
        entities: [Consulta, Tratamiento],
        synchronize: true,
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    TypeOrmModule.forFeature([Consulta, Tratamiento]),
  ],
  controllers: [ConsultaController, TratamientoController, HealthController],
  providers: [ConsultaService, TratamientoService],
})
export class AppModule {}

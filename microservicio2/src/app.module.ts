import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const port = parseInt(config.get('DB_PORT', '3306'));
        console.log('📌 Puerto MySQL leído desde env:', port);  

        return {
          type: 'mysql',
          host: config.get('DB_HOST', 'localhost'),
          port,
          username: config.get('DB_USERNAME', 'root'),
          password: config.get('DB_PASSWORD', 'root'),
          database: config.get('DB_NAME', 'consultasdb'),
          entities: [Consulta, Tratamiento],
          synchronize: true,
          retryAttempts: 10,
          retryDelay: 3000,
        };
      },
    }),

    TypeOrmModule.forFeature([Consulta, Tratamiento]),
  ],

  controllers: [ConsultaController, TratamientoController, HealthController],
  providers: [ConsultaService, TratamientoService],
})
export class AppModule {}

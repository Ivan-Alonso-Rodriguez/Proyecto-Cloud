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
        const port = config.get<string>('DB_PORT');
        const host = config.get('DB_HOST');
        const username = config.get('DB_USERNAME');
        const password = config.get('DB_PASSWORD');
        const database = config.get('DB_NAME');

        console.log('[MS2] Configuración de la BD:', {
          host,
          port,
          username,
          password,
          database,
        });

        if (!port) {
          throw new Error('[MS2] ❌ La variable DB_PORT no se ha cargado correctamente desde .env');
        }

        return {
          type: 'mysql',
          host: host || 'localhost',
          port: parseInt(port),
          username: username || 'root',
          password: password || 'root',
          database: database || 'consultasdb',
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

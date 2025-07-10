import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const neonDatabaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    name: 'default',
    type: 'postgres',
    url: config.get<string>('DATABASE_URL_NEON'),
    autoLoadEntities: true,
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
};

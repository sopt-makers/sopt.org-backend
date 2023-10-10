import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfig } from './env.config';

export const typeORMFactory = {
  imports: [ConfigModule],
  useFactory: (
    configService: ConfigService<EnvConfig>,
  ): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'migration_history',
    logging: configService.get('NODE_ENV') === 'development',
    synchronize: false,
  }),
  inject: [ConfigService],
};

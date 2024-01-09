import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { configuration } from './config/typeConfiguration';

import { config } from 'dotenv';

config();
export const getORMConfig = (): TypeOrmModuleOptions => {
  const { dbHost, username, password, dbName, dbSsl } =
    configuration().databaseConfig;
  const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: dbHost,
    port: 5432,
    username,
    password,
    database: dbName,
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    synchronize: false,
    // dropSchema: true,
    migrations: [`${__dirname}/**/database/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations_TypeORM',
    extra: {
      charset: 'utf8mb4_general_ci',
      ssl: dbSsl,
    },
  };
  return config;
};

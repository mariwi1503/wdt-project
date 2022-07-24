import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from '.';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: config.dbConfig.type,
  host: config.dbConfig.host,
  username: config.dbConfig.username,
  password: config.dbConfig.password,
  database: config.dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  ssl: {
    rejectUnauthorized: false
  },
  port: 5432,
  synchronize: true,
};

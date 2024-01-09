import { DataSource, DataSourceOptions } from 'typeorm';
import { getORMConfig } from './ormConfig';

const datasource = new DataSource(getORMConfig() as DataSourceOptions); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource;

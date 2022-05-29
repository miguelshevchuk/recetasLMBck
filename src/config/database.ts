import { ConnectionOptions } from 'typeorm'
import * as Models from '../model/Models'

const configDev: ConnectionOptions = {
  type: 'postgres',
  host: process.env.BD_SEMINARIO_HOST || '192.168.230.128',
  port: Number(process.env.BD_SEMINARIO_PORT) || 5432,
  username: process.env.BD_SEMINARIO_USER || 'postgres',
  password: process.env.BD_SEMINARIO_PASSWORD || 'admin',
  database: process.env.BD_SEMINARIO_DB || 'recetasLM',
  entities: Object.values(Models),
  synchronize: true,
  logger:'debug'

}

const configProd: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: Object.values(Models),
  synchronize: true,
  logger:'debug'

}

const dbConfig = {
  configDev : configDev,
  configProd : configProd
}



export default dbConfig

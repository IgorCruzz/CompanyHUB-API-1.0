require('dotenv').config

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432, 
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/**/*.js'],
  cli: {
    migrationsDir: 'src/migration',
  },  
}

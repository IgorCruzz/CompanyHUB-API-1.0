require('dotenv').config

module.exports = {
  type: 'postgres',
  port: 5432,
  host: '/cloudsql/company-hub-286820:us-central1:company',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/**/*.js'],
  cli: {
    migrationsDir: 'src/migration',
  },  
}

require('dotenv').config

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/**/*.js'],
  cli: {
    migrationsDir: 'src/migration',
  },
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
    socketPath: '/cloudsql/company-hub-286820:us-central1:company',
  },
}

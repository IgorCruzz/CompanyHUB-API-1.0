require('dotenv').config

module.exports = {
  type: 'postgres',
  extra: {
    socketPath: '/cloudsql/company-hub-286820:us-central1:company'
  },
  port: 5432, 
  username: 'companyhub',
  password: 'narutoplayers',
  database: 'companyhub',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/**/*.js'],
  cli: {
    migrationsDir: 'src/migration',
  },  
}

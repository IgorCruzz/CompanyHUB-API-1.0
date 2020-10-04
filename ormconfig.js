require('dotenv').config

module.exports = {
  type: 'postgres',    
  host: 'localhost',
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
 
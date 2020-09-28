require('dotenv').config

module.exports = {
  type: 'postgres',
  host: '35.202.78.162',
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

console.log(process.env.DB_USERNAME)

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": 5432,
    "dialect": "postgres"
  }
}

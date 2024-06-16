const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'qwerty12345',
    database: 'users',
    port: '5432',
})

module.exports = pool
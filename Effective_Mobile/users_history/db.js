const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Mitya2003',
    database: 'users',
    port: '5432',
})

module.exports = pool;
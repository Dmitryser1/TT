const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const pool = require('./db');

const app = express();

app.use(bodyParser.json());

// Creating a user
app.post('/user', async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query('INSERT INTO user (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        const user = result.rows[0];
        await axios.post('http://localhost:4000/history', { action: 'create', userId: user.id });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Updating user information
app.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const result = await pool.query('UPDATE user SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
        const user = result.rows[0];
        await axios.post('http://localhost:4000/history', { action: 'update', userId: user.id });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Getting all users
app.get('/user', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM user');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const port = 3000;

app.listen(port, () => {
    console.log(`User service running on port ${port}`);
});
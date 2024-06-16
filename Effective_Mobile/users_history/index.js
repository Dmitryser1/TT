const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();

app.use(bodyParser.json());

// Endpoint для создания записи в истории
app.post('/history', async (req, res) => {
    const { action, userId } = req.body;
    try {
        const queryText = 'INSERT INTO history (action, userid) VALUES ($1, $2) RETURNING *';
        const values = [action, userId];
        const result = await pool.query(queryText, values);
        console.log(`Added entry to history: ${JSON.stringify(result.rows[0])}`);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding entry to history:', err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint для получения истории с фильтрами по ID пользователя и постраничной навигацией
app.get('/history', async (req, res) => {
    const { userid, page = 1, pageSize = 10 } = req.query;
    try {
        let queryText = 'SELECT * FROM history';
        const values = [];
        if (userid) {
            queryText += ' WHERE userid = $1';
            values.push(userid);
        }
        queryText += ` ORDER BY timestamp DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
        values.push(pageSize);
        values.push((page - 1) * pageSize);
        const result = await pool.query(queryText, values);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching history:', err);
        res.status(500).json({ error: err.message });
    }
});

const port = 4000;

app.listen(port, () => {
    console.log(`History service running on port ${port}`);
});
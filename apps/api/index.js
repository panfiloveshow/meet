const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

async function start() {
  await db.init();

  // Users
  app.post('/users', async (req, res) => {
    const { rows } = await db.query('INSERT INTO users (data) VALUES ($1) RETURNING id, data', [req.body]);
    res.status(201).json({ id: rows[0].id, ...rows[0].data });
  });

  app.get('/users', async (req, res) => {
    const { rows } = await db.query('SELECT id, data FROM users');
    res.json(rows.map(r => ({ id: r.id, ...r.data })));
  });

  app.get('/users/:id', async (req, res) => {
    const { rows } = await db.query('SELECT id, data FROM users WHERE id=$1', [req.params.id]);
    if (rows.length === 0) return res.sendStatus(404);
    res.json({ id: rows[0].id, ...rows[0].data });
  });

  app.put('/users/:id', async (req, res) => {
    const { rows } = await db.query('UPDATE users SET data=$1 WHERE id=$2 RETURNING id, data', [req.body, req.params.id]);
    if (rows.length === 0) return res.sendStatus(404);
    res.json({ id: rows[0].id, ...rows[0].data });
  });

  app.delete('/users/:id', async (req, res) => {
    const { rowCount } = await db.query('DELETE FROM users WHERE id=$1', [req.params.id]);
    if (rowCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  });

  // Meetings
  app.post('/meetings', async (req, res) => {
    const { rows } = await db.query('INSERT INTO meetings (data) VALUES ($1) RETURNING id, data', [req.body]);
    res.status(201).json({ id: rows[0].id, ...rows[0].data });
  });

  app.get('/meetings', async (req, res) => {
    const { rows } = await db.query('SELECT id, data FROM meetings');
    res.json(rows.map(r => ({ id: r.id, ...r.data })));
  });

  app.get('/meetings/:id', async (req, res) => {
    const { rows } = await db.query('SELECT id, data FROM meetings WHERE id=$1', [req.params.id]);
    if (rows.length === 0) return res.sendStatus(404);
    res.json({ id: rows[0].id, ...rows[0].data });
  });

  app.put('/meetings/:id', async (req, res) => {
    const { rows } = await db.query('UPDATE meetings SET data=$1 WHERE id=$2 RETURNING id, data', [req.body, req.params.id]);
    if (rows.length === 0) return res.sendStatus(404);
    res.json({ id: rows[0].id, ...rows[0].data });
  });

  app.delete('/meetings/:id', async (req, res) => {
    const { rowCount } = await db.query('DELETE FROM meetings WHERE id=$1', [req.params.id]);
    if (rowCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  });

  // Transcripts
  app.post('/transcripts', async (req, res) => {
    const { rows } = await db.query('INSERT INTO transcripts (data) VALUES ($1) RETURNING id, data', [req.body]);
    res.status(201).json({ id: rows[0].id, ...rows[0].data });
  });

  app.get('/transcripts', async (req, res) => {
    const { rows } = await db.query('SELECT id, data FROM transcripts');
    res.json(rows.map(r => ({ id: r.id, ...r.data })));
  });

  app.get('/transcripts/:id', async (req, res) => {
    const { rows } = await db.query('SELECT id, data FROM transcripts WHERE id=$1', [req.params.id]);
    if (rows.length === 0) return res.sendStatus(404);
    res.json({ id: rows[0].id, ...rows[0].data });
  });

  app.put('/transcripts/:id', async (req, res) => {
    const { rows } = await db.query('UPDATE transcripts SET data=$1 WHERE id=$2 RETURNING id, data', [req.body, req.params.id]);
    if (rows.length === 0) return res.sendStatus(404);
    res.json({ id: rows[0].id, ...rows[0].data });
  });

  app.delete('/transcripts/:id', async (req, res) => {
    const { rowCount } = await db.query('DELETE FROM transcripts WHERE id=$1', [req.params.id]);
    if (rowCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});

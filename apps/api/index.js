const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { getAuthUrl, exchangeCodeForToken } = require('../../libs/integrations');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];
let meetings = [];
let transcripts = [];
let tasks = [];

app.post('/users', (req, res) => {
  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/meetings', (req, res) => {
  const meeting = { id: meetings.length + 1, ...req.body };
  meetings.push(meeting);
  res.status(201).json(meeting);
});

app.get('/meetings', (req, res) => {
  res.json(meetings);
});

app.get('/meetings/:id', (req, res) => {
  const meeting = meetings.find(m => m.id === Number(req.params.id));
  if (!meeting) return res.status(404).send('Not found');
  res.json(meeting);
});

app.get('/meetings/:id/transcripts', (req, res) => {
  const items = transcripts.filter(t => t.meetingId === Number(req.params.id));
  res.json(items);
});

app.get('/meetings/:id/tasks', (req, res) => {
  const items = tasks.filter(t => t.meetingId === Number(req.params.id));
  res.json(items);
});

app.post('/meetings/:id/tasks', (req, res) => {
  const task = {
    id: tasks.length + 1,
    meetingId: Number(req.params.id),
    ...req.body,
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.post('/transcripts', (req, res) => {
  const transcript = { id: transcripts.length + 1, ...req.body };
  transcripts.push(transcript);
  res.status(201).json(transcript);
});

app.get('/transcripts', (req, res) => {
  res.json(transcripts);
});

app.get('/zoom/auth', (req, res) => {
  res.json({ url: getAuthUrl() });
});

app.get('/zoom/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const data = await exchangeCodeForToken(code);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Zoom auth failed');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];
let meetings = [];
let transcripts = [];

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

app.post('/transcripts', (req, res) => {
  const transcript = { id: transcripts.length + 1, ...req.body };
  transcripts.push(transcript);
  res.status(201).json(transcript);
});

app.get('/transcripts', (req, res) => {
  res.json(transcripts);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});

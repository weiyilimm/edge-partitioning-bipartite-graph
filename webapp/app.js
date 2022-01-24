const express = require('express');
const path = require('path');
app = express()
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/', (req, res) => {
  const { spawn } = require('child_process');
  const pythonSpawn = spawn('python', ['algorithm.py']);

  pythonSpawn.stdout.on('data', (data) => {
      res.json(JSON.parse(data));
  });

  pythonSpawn.stderr.on('data', (data) => {
    console.log(`error:${data}`);
 });

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const PORT = process.env.PORT || 4896
app.listen(PORT, () => {
  console.log(`Listening Port : ${PORT}`)
});


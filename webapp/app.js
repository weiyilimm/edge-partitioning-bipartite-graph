const express = require('express');
const path = require('path');
app = express()
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

app.post('/api/', (req, res) => {
    const { spawn } = require('child_process');
    const pythonSpawn = spawn('python', ['algorithm.py', req.body.jsonData]);

    pythonSpawn.stdout.on('data', (data) => {
      // When there's no error
      res.status(200).send(JSON.parse(data));
    });

    pythonSpawn.stderr.on('data', (data) => {
      // When there's error 
      res.status(400)
      return res.end();
    });
  })
  
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Get the port number or set it to 4896
const PORT = process.env.PORT || 4896
app.listen(PORT, () => {
  console.log(`Listening Port : ${PORT}`)
});


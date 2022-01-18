const graph = (req, res) => {
  const { spawn } = require('child_process');
  const pythonSpawn = spawn('python', ['algorithm.py']);
  pythonSpawn.stdout.on('data', (data) => {
      res.json(JSON.parse(data));
  });
};

exports.graph = graph;

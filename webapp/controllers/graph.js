const graph = (req, res) => {
  const { spawn } = require('child_process');
  const pythonSpawn = spawn('C:/Users/User/anaconda3/envs/dis/python', ['algorithm.py']);
  pythonSpawn.stdout.on('data', (data) => {
      res.json(JSON.parse(data));
  });
  pythonSpawn.stderr.on('data', (data) => {
    console.log(`error:${data}`);
 });
};

exports.graph = graph;

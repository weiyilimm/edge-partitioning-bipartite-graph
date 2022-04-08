Edge partitioning is a tutorial-like web application to allow computer science students who have partial knowledge of Algorithms
and Data Structure to grasp the knowledge about the edge partitioning algorithm.

The web application is hosted on http://edge-partitioning.herokuapp.com/

## How to run it locally?
1. Open up a terminal
1. Clone this repository by typing `git clone https://github.com/weiyilimm/edge-partitioning-bipartite-graph.git`
1. Create a virtual python env by typing `conda create -n yourenvname`
1. Activate the env by typing `conda activate yourenvname`
1. Access to the `edge-partitioning-bipartite-graph/webapp/` folder and install the libraries by typing `pip install -r requirements.txt`
1. Now get path of python.exe by typing `python` in terminal, followed by `import sys` and `print(sys.executable)`
1. Copy the output and paste it in inside the method `spawn` of `edge-partitioning-bipartite-graph/webapp/app.js`
1. Ensure that you are in `edge-partitioning-bipartite-graph/webapp/` folder, and type `npm start` to run the middleware (Express.js)
1. While keeping the previous terminal, open up another terminal and access to `edge-partitioning-bipartite-graph/webapp/client`, and type `npm start` to run the website locally

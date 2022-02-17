import React from 'react';
import "./App.css";
import Home from './components/home'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Learn from './components/learn';
import Algo from './components/algo';


class App extends React.Component {
    render() {
        return (
          <Router>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/graph-initialisation" element={<Learn/>} />
              <Route path="/graph-initialisation/learn" element={<Algo/>} />
            </Routes>
          </Router>
        )
    }
}

export default App;


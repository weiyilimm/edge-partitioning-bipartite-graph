import React, { Component, components, useEffect, useState } from 'react';
import "./App.css";
import Home from './components/home'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Learn from './components/learn';


class App extends React.Component {
    render() {
        return (
          <Router>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/learn" element={<Learn/>} />
            </Routes>
          </Router>
        )
    }
}

export default App;


import React from 'react';
import { Graph } from './components/graph'

class App extends React.Component {

  render() {
      return (
        <><Input /><RestAPI /></>
      );
  }
}

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    }
  }

  render() {
      return (
        <div>
          <h1>Assignment Problem</h1>
          <p>An assignment algorithm that solves in linear time complexity</p>
          <input onChange={this.updateInput} value={this.state.userInput} />
          <button onClick={this.handleClick}>Run</button>
        </div>
      );
  }
  
  handleClick = () => {
    alert("Hi")
  }

  updateInput = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }
}

class RestAPI extends React.Component {
  render() {
      return (
        <div>
          <Graph/>
        </div>
      );
  }
  
}

export default App;


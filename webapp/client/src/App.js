import React from 'react';

class App extends React.Component {
  render() {
      return (
        <Input />
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
    this.setState({userInput: ""})
    
    const userInput = this.state.userInput
    const axios = require('axios')
    // {'x_1': {1}, 'x_2': {3}, 'x_3': {4}, 'x_4': {2}, 'x_5': {0}, 2: {'x_4'}, 3: {'x_2'}, 1: {'x_1'}, 4: {'x_3'}, 0: {'x_5'}}
    axios.post('/api', 
    {
      jsonData : userInput
    }).then(res => {
      console.log(`statusCode: ${res.status}`)
      console.log(res.data)
    }).catch(error => {
      console.log(`statusCode: ${error.response.status}`)
      console.log(`Bad Request`)
    })
  }

  updateInput = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }
}

export default App;


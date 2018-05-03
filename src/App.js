import React, { Component } from 'react';
import logo from './logo.svg';
import Prepare from './Prepare'

class App extends Component {
  constructor() {
    super()
    this.state = {started: false}
    this.start = this.start.bind(this)
  }

  start(params) {
    this.setState({started: true})
  }

  render() {
    const { started } = this.state
    return (
      <div>
        {!started && <Prepare onStart={this.start} />}
      </div>
    );
  }
}

export default App;

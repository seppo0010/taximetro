import React, { Component } from 'react';
import Prepare from './Prepare'
import Taximeter from './Taximeter'

class App extends Component {
  constructor() {
    super()
    this.state = {started: false}
    this.start = this.start.bind(this)
  }

  start(params) {
    this.setState({started: true, taximeterParams: params})
  }

  render() {
    const { started, taximeterParams } = this.state
    return (
      <div>
        {!started && <Prepare onStart={this.start} />}
        {started && <Taximeter params={taximeterParams} />}
      </div>
    );
  }
}

export default App;

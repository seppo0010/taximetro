import React, { Component } from 'react';

export default class Taximeter extends Component {
  constructor() {
    super()
    this.state = {startDate: new Date(), time: 0}
  }

  componentDidMount() {
    this.timer = setInterval(() => this.setState({
      time: (new Date() - this.state.startDate) / 1000,
    }), 1000)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  render() {
    const { time } = this.state
    const { params } = this.props
    const total = (
      params.initialAmount +
      params.tickAmount * (
        Math.floor(time / params.tickTime)
      )
    ) * (params.isNight ? (1 + params.nightIncrease / 100) : 1)
    const formatter = new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS'})
    return (
      <div>
        Total: { formatter.format(total) }
      </div>
    );
  }
}

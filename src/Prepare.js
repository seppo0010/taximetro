import React, { Component } from 'react';
import './Prepare.css'

const defaultParameters = {
  tickAmount: 3.26,
  initialAmount: 32.6,
  tickDistance: 200,
  tickTime: 60,
  nightIncrease: 20,
}

export default class Prepare extends Component {
  constructor() {
    super()
    const hour = new Date().getHours()
    this.state = Object.assign({
      isNight: hour < 6 || hour > 22
    }, defaultParameters)
  }

  render() {
    const { tickAmount, initialAmount, tickDistance, tickTime, nightIncrease, isNight } = this.state
    return (
      <div>
        <label>
          Valor ficha
          <input name="tick-amount" value={tickAmount} onChange={(event) => this.setState({tickAmount: event.target.value})} />
        </label>
        <label>
          Bajada de bandera
          <input name="initial-amount" value={initialAmount} onChange={(event) => this.setState({initialAmount: event.target.value})} />
        </label>
        <label>
          Distancia ficha
          <input name="tick-distance" value={tickDistance} onChange={(event) => this.setState({tickDistance: event.target.value})} />
        </label>
        <label>
          Tiempo ficha
          <input name="tick-time" value={tickTime} onChange={(event) => this.setState({tickTime: event.target.value})} />
        </label>
        <label>
          Porcentaje de aumento nocturno
          <input name="night-increase" value={nightIncrease} onChange={(event) => this.setState({nightIncrease: event.target.value})} />
        </label>
        <label>
          <input type="checkbox" name="is-night" value={isNight} onChange={(event) => this.setState({isNight: event.target.checked})} />
          Usar tarifa nocturna
        </label>
        <button onClick={() => this.props.onStart({
          tickAmount,
          initialAmount,
          tickDistance,
          tickTime,
          nightIncrease,
          isNight,
        })}>Empezar</button>
      </div>
    );
  }
}

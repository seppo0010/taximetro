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
      isNight: hour < 6 || hour >= 22,
      geolocationEnabled: false,
      geolocationError: '',
    }, defaultParameters)
  }

  enableGeolocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        geolocationEnabled: true,
      })
    }, (err) => {
      this.setState({geolocationError: err.message})
    });
  }

  render() {
    const {
      tickAmount, initialAmount, tickDistance, tickTime, nightIncrease, isNight,
      geolocationEnabled, geolocationError
    } = this.state
    return (
      <div>
        <label onClick={() => geolocationEnabled || this.enableGeolocation()}>
          <input type="checkbox" checked={geolocationEnabled} disabled={true} />Geolocalización habilitada
          {"geolocation" in navigator || "Tu navegador no soporta geolocalización"}
          {geolocationError}
        </label>
        <label>
          Valor ficha
          <input name="tick-amount" type="number" value={tickAmount} onChange={(event) => this.setState({tickAmount: event.target.value})} min="0" step="0.01" />
        </label>
        <label>
          Bajada de bandera
          <input name="initial-amount" type="number" value={initialAmount} onChange={(event) => this.setState({initialAmount: event.target.value})} min="0" step="0.01" />
        </label>
        <label>
          Distancia ficha (metros)
          <input name="tick-distance" type="number" value={tickDistance} onChange={(event) => this.setState({tickDistance: event.target.value})} min="1" step="1" />
        </label>
        <label>
          Tiempo ficha (segundos)
          <input name="tick-time" type="number" min="1" step="1" value={tickTime} onChange={(event) => this.setState({tickTime: event.target.value})} />
        </label>
        <label>
          Porcentaje de aumento nocturno
          <input name="night-increase" type="number" value={nightIncrease} onChange={(event) => this.setState({nightIncrease: event.target.value})} min="0" />
        </label>
        <label>
          <input type="checkbox" name="is-night" value={isNight} onChange={(event) => this.setState({isNight: event.target.checked})} />
          Usar tarifa nocturna
        </label>
        <button onClick={() => geolocationEnabled && this.props.onStart({
          tickAmount: parseFloat(tickAmount),
          initialAmount: parseFloat(initialAmount),
          tickDistance: parseInt(tickDistance, 10),
          tickTime: parseInt(tickTime, 10),
          nightIncrease: parseFloat(nightIncrease),
          isNight: isNight,
        })}>Empezar</button>
      </div>
    );
  }
}

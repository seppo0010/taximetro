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
      <div class="container">
      <div class="form-group">
        <div class="custom-control custom-checkbox">
        <input class="custom-control-input" id="geolocation" type="checkbox" checked={geolocationEnabled} disabled={true} />
        <label class="custom-control-label" for="geolocation" onClick={() => geolocationEnabled || this.enableGeolocation()}>
          Geolocalización habilitada
          {"geolocation" in navigator || "Tu navegador no soporta geolocalización"}
          {geolocationError}
        </label>
        </div>
      </div>
      <div class="form-group">
        <label for="tick-amount">
          Valor ficha
        </label>
          <input class="form-control" id="tick-amount" name="tick-amount" type="number" value={tickAmount} onChange={(event) => this.setState({tickAmount: event.target.value})} min="0" step="0.01" />
      </div>
      <div class="form-group">
        <label for="initial-amount">
          Bajada de bandera
        </label>
          <input class="form-control" id="initial-amount" name="initial-amount" type="number" value={initialAmount} onChange={(event) => this.setState({initialAmount: event.target.value})} min="0" step="0.01" />
      </div>
      <div class="form-group">
        <label for="tick-distance">
          Distancia ficha (metros)
        </label>
          <input class="form-control" id="tick-distance" name="tick-distance" type="number" value={tickDistance} onChange={(event) => this.setState({tickDistance: event.target.value})} min="1" step="1" />
      </div>
      <div class="form-group">
        <label for="tick-time">
          Tiempo ficha (segundos)
        </label>
          <input class="form-control" id="tick-time" name="tick-time" type="number" min="1" step="1" value={tickTime} onChange={(event) => this.setState({tickTime: event.target.value})} />
      </div>
      <div class="form-group">
        <label for="night-increase">
          Porcentaje de aumento nocturno
        </label>
          <input class="form-control" id="night-increase" name="night-increase" type="number" value={nightIncrease} onChange={(event) => this.setState({nightIncrease: event.target.value})} min="0" />
      </div>
      <div class="form-group">
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input" id="is-night" type="checkbox" name="is-night" value={isNight} onChange={(event) => this.setState({isNight: event.target.checked})} />
        <label class="custom-control-label" for="is-night">
          Usar tarifa nocturna
        </label>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block" onClick={() => geolocationEnabled && this.props.onStart({
          tickAmount: parseFloat(tickAmount),
          initialAmount: parseFloat(initialAmount),
          tickDistance: parseInt(tickDistance, 10),
          tickTime: parseInt(tickTime, 10),
          nightIncrease: parseFloat(nightIncrease),
          isNight: isNight,
        })}>Empezar</button>
      </div>
      </div>
    );
  }
}

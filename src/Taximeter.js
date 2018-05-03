import React, { Component } from 'react';

function toRad(num) {
  return num * Math.PI / 180
}

function distance(lon1, lat1, lon2, lat2) {
  const R = 6371
  const dLat = toRad(lat2-lat1)
  const dLon = toRad(lon2-lon1)
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const d = R * c
  return d;
}

export default class Taximeter extends Component {
  constructor() {
    super()
    this.state = {
      startDate: new Date(),
      time: 0,
      lastLocation: null,
      distance: 0,
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => this.setState({
      time: (new Date() - this.state.startDate) / 1000,
    }), 1000)
    this.watcher = navigator.geolocation.watchPosition((position) => {
      if (this.state.lastLocation) {
        this.setState({
          distance: this.state.distance + distance(
            position.coords.longitude,
            position.coords.latitude,
            this.state.lastLocation.longitude,
            this.state.lastLocation.latitude
          )
        })
      }
      this.setState({lastLocation: position.coords})
    });
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    if (this.watcher) {
      navigator.geolocation.clearWatch(this.watcher)
      this.watcher = null
    }
  }

  render() {
    const { time, distance } = this.state
    const { params } = this.props
    const total = (
      params.initialAmount +
      params.tickAmount * (
        Math.floor(time / params.tickTime) +
        Math.floor(distance / params.tickDistance)
      )
    ) * (params.isNight ? (1 + params.nightIncrease / 100) : 1)
    const formatter = new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS'})
    return (
      <div>
        Total: { formatter.format(total) }<br />
        Tiempo transcurrido: { Math.floor(time / 60) }m<br />
        Distancia transcurrida: { Math.floor(distance / 10) * 10 }m<br />
      </div>
    );
  }
}

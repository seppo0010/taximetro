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
  return d * 1000;
}

export default class Taximeter extends Component {
  constructor() {
    super()
    this.state = {
      startDate: new Date(),
      time: 0,
      lastLocation: null,
      distance: 0,
      ticks: 0,
      tickDistance: 0,
      tickStartDate: new Date(),
    }
  }

  addTick(many) {
    this.setState({
      ticks: this.state.ticks + many,
      tickDistance: 0,
      tickStartDate: new Date(),
    })
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      const tickTime = (new Date() - this.state.tickStartDate) / 1000
      if (tickTime >= this.props.params.tickTime) {
        this.addTick(Math.floor(tickTime / this.props.params.tickTime))
      }
      this.setState({
        time: (new Date() - this.state.startDate) / 1000,
      })
    }, 1000)
    this.watcher = navigator.geolocation.watchPosition((position) => {
      if (this.state.lastLocation) {
        const addDistance = distance(
          position.coords.longitude,
          position.coords.latitude,
          this.state.lastLocation.longitude,
          this.state.lastLocation.latitude
        )
        this.setState({
          tickDistance: this.state.tickDistance + addDistance,
          distance: this.state.distance + addDistance,
        })
        if (this.state.tickDistance >= this.props.params.tickDistance) {
          this.addTick(Math.floor(this.state.tickDistance / this.props.params.tickDistance))
        }
      }
      this.setState({lastLocation: position.coords})
    }, (err) => {
      alert(err.message)
    }, {
      enableHighAccuracy: true,
      maximumAge: 0,
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
    const { time, distance, ticks } = this.state
    const { params } = this.props
    const total = (params.initialAmount + params.tickAmount * ticks
    ) * (params.isNight ? (1 + params.nightIncrease / 100) : 1)
    const formatter = new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS'})
    return (
      <div>
        Total: { formatter.format(total) }<br />
        Tiempo: { Math.floor(time / 60) }m<br />
        Distancia: { Math.floor(distance) }m<br />
      </div>
    );
  }
}

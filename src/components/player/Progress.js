import React from 'react'
import propTypes from 'prop-types'

import 'assets/css/player/progress.sass'

class Progress extends React.Component {
  static propTypes = {
    currentTime: propTypes.number.isRequired,
    buffered: propTypes.number,
    duration: propTypes.number.isRequired,
    changePlayTime: propTypes.func.isRequired
  }

  state = {
    mousedown: false
  }

  componentDidMount () {
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseup', this.mouseUp)
  }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  }

  render () {
    const { buffered } = this.props
    return (
      <div>
        <div
          className='progress-phantom'
          onClick={this.calculateNewTime}
          onMouseDown={() => this.setState({ mousedown: true })}
          onMouseLeave={this.onMouseLeave}
        />
        <div
          className='progress-line'/>

        <div
          style={{ width: `${buffered * 100}%` }}
          className='progress-line progress-line__buffered'
        />
        <div
          style={{ width: `${this.getTimeLineWidth()}%` }}
          className='progress-line progress-line__time'/>
      </div>
    )
  }

  // methods

  getTimeLineWidth = () => {
    const { currentTime, duration } = this.props
    const progressLine = document.querySelector('.progress-line')
    if (progressLine) {
      const timePercentWidth = currentTime / duration
      return timePercentWidth * 100
    }
    return 0
  }

  getOffsetFromEvent = (e, target) => {
    const event = e.nativeEvent || e
    const borders = event.target.getBoundingClientRect
      ? event.target.getBoundingClientRect()
      : target.getBoundingClientRect()
    const xPageOffset = event.pageX
    const xOffset = Math.abs(borders.left - xPageOffset)

    const progressWidth = event.target.clientWidth

    const relativeOffset = xOffset / progressWidth
    return relativeOffset
  }

  calculateNewTime = (e) => {
    const relativeOffset = this.getOffsetFromEvent(e)
    const { changePlayTime, duration } = this.props
    const newTime = duration * relativeOffset
    changePlayTime(newTime)
  }

  mouseUp = (e) => {
    this.setState({ mousedown: false })
    this.onMouseMove(e)
  }

  onMouseLeave = (e) => {
    if (!this.state.mousedown) {
      this.setState({ mousedown: false })
      this.onMouseMove(e)
    }
  }

  onMouseMove = (e) => {
    if (this.state.mousedown) {
      const el = document.querySelector('.progress-line')
      console.log(el)
      this.calculateNewTime(e, el)
    }
  }
}

export default Progress

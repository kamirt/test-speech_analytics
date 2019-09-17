import React from 'react'
import propTypes from 'prop-types'

import 'assets/css/player/playbtn.sass'

import loadingBtn from '../../assets/img/load-button.png'
import playBtn from '../../assets/img/play-button.png'
import pauseBtn from '../../assets/img/pause-button.png'

class PlayButton extends React.Component {
  static propTypes = {
    loading: propTypes.bool.isRequired,
    disabled: propTypes.bool,
    playPause: propTypes.func
  }

  state = {
    playing: false
  }

  render () {
    return (
      <div onClick={this.playPauseToggle} className='play-button'>
        <img
          src={this.getBtnImageSource()}
          className={this.props.loading ? 'circle-animate' : ''}
          alt="play/pause"/>
      </div>
    )
  }

  // methods
  getBtnImageSource = () => {
    const { loading } = this.props
    const { playing } = this.state
    if (loading) {
      return loadingBtn
    }
    if (playing) {
      return pauseBtn
    }
    return playBtn
  }

  playPauseToggle = () => {
    const { playPause, loading, disabled } = this.props
    if (!loading && !disabled && playPause) {
      this.setState({ playing: !this.state.playing })
      playPause()
    }
  }
}

export default PlayButton

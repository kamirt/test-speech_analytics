import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import { GET_TRACK, STOP_TRACK, PLAY_TRACK } from 'store/actions/audio'

import 'assets/css/player/player.sass'

import Progress from './Progress'
import PlayBtn from './PlayBtn'

import { prettifyTime } from 'utils/utils'

class Player extends React.Component {
  static propTypes = {
    loading: propTypes.bool,
    track: propTypes.any,
    currentTime: propTypes.number,
    buffered: propTypes.number,
    duration: propTypes.number,
    dispatch: propTypes.func.isRequired
  }

  render () {
    const { buffered, currentTime, duration, loading } = this.props
    return (
      <div className='player'>
        <div className={'btn-container'}>
          <PlayBtn loading={loading} playPause={this.playPause}/>
        </div>
        <div className={'progress-container'}>
          <Progress
            buffered={buffered}
            currentTime={currentTime}
            duration={duration}
            changePlayTime={this.changePlayTime}/>
        </div>
        <div className={'time-container'}>
          { `${prettifyTime(currentTime)} / ${prettifyTime(duration)}` }
        </div>
      </div>
    )
  }

  // methods

  playPause = () => {
    const { dispatch, track } = this.props
    if (!track) {
      dispatch(GET_TRACK(`
        https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3ce5cba6-f12d-46d6-abac-9fe643420799/audio.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAT73L2G45EMY3624Z%2F20190917%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20190917T222233Z&X-Amz-Expires=86400&X-Amz-Security-Token=AgoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQChxr5gpkuxrMh2N5eSruELIEo1%2FQVUIn52IRl5fIBIkgIhAKP5bDAjh3%2BUFMWMKdMXMkCJRMfOscSnylOqWM3pocOPKtoDCHsQABoMMjc0NTY3MTQ5MzcwIgw5Um2FMz7%2BX9zJ%2FM8qtwN4sWyOe2lNozlVpz5Ax6WRHLj11H45urV6oH4m%2FAHCQF5Ne%2Bf8%2Fxm7eX4tMHk3GnLmwE1FGjCjjhevRn8R29NxGSMuPb2G3EyzF%2FzZIX1f85HGJ3u23874i6k06HMaPXnajfA7H9WrCHkyNcyccRhLbigjY0GT%2FLMehPKVNRSaoClXDr0MsB3M7nDMjlCuKg%2FUivM41orHIHyAd8swz5d6oIQ%2BuMxJ6lvt%2FeM1I9iz1B0HcnT%2Bh4Pm3hC%2B7iPpWie4t%2FOV82%2BeYTvDCTZyFG28NgozS%2BTbpJYKtLTJUc%2BfF1r4KPhmUp%2FKI0AqArWz1zF5nMTLMTIkNPtg1brqmQpEyYkNzghDpJmmkj5shsq1z0U6sRvZPHM7hACpUWPdK1xZGtA06Kg5As9FjPcWMNFZXCo37Hag1UAxZuB0daz8LZSn%2FFhegytxdYZ5E11d0H38TvBQkRby51O06vsZ%2BsWiGdvycIwro4jfALMnZLPK5vj3n8y0Gd8%2F9vA%2Faz99oGo1p8BlIiCMCy6ep4S%2B%2F%2FckD%2FbKwA%2Bn%2BrjLt4W974klhgMRt%2BfGP5jHpgs51WhNPvZ5AWaUAzbWMP7EhOwFOrMBsl5rLWejY4ipisLVv1myzIG%2Fe2TXctu9g0EC22eik3reruBl6QW%2FIHp%2FxzVmJ1HGwJHsr%2FdE9r6FFfux3elcRCctE3umBNqn%2BklwxakbTfI%2BW%2BjhV4aWQQzzXOdFLds7C1j1OjTaM1Kcwv9obqMLl0vVI9XmUiEvWpiAM4gxHaZ6ewUoartAhUeTblq40L6Si4XWknj0Xf1g2%2BiFOy3DoAezcivXZBMpGYNBAtsxGiU29yw%3D&X-Amz-Signature=67318e047008bf762556041b725e20cf274e456843bb243491b5c78a514be941&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22audio.wav%22
      `))
    } else {
      track.paused ? dispatch(PLAY_TRACK(track)) : dispatch(STOP_TRACK())
    }
  }

  changePlayTime = (newTime) => {
    const { track } = this.props
    if (track) {
      track.currentTime = newTime
    }
  }
}

const mapStateToProps = state => ({
  track: state.audio.track,
  currentTime: state.audio.currentTime,
  duration: state.audio.duration,
  buffered: state.audio.buffered,
  loading: state.audio.loading
})

export default connect(mapStateToProps)(Player)

import { call, put, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  GET_TRACK,
  PLAY_TRACK,
  STOP_TRACK,
  LOADING,
  SUCCESS,
  TRACK_UPDATED
} from 'store/actions/audio'

const getMeta = (track) => {
  return new Promise((resolve, reject) => {
    track.onloadedmetadata = (e, meta) => {
      console.log('META', e, meta)
      console.log(track)
      const duration = track.duration
      resolve({ track, duration })
    }
  })
}

const getAudioTrack = async (url) => {
  const track = new Audio(url)
  const trackWithMeta = await getMeta(track)
  return trackWithMeta
}

const trackChangeChannel = (track) => {
  // function that called after current time changed
  const timeUpdate = (emitter) => {
    emitter({
      currentTime: track.currentTime,
      buffered: track.buffered.end(0) / track.duration
    })
  }

  // function that called after buffered changed
  const bufferedUpdate = (emitter) => {
    emitter({ buffered: track.buffered.end(0) / track.duration })
  }

  return eventChannel(emitter => {
    track.ontimeupdate = () => {
      timeUpdate(emitter)
    }

    track.onprogress = () => {
      bufferedUpdate(emitter)
    }

    return () => {
      // function to unsubscribe from track's time change
      track.removeEventListener('timeupdate', timeUpdate)
      track.removeEventListener('progress', timeUpdate)
    }
  })
}

function * trackChange (action) {
  yield put(TRACK_UPDATED(action))
}

const stopTrack = (track) => {
  track.pause()
}

function * audioFlow (action) {
  const url = action.payload
  // show loader
  yield put(LOADING(true))
  // loading track with metadata from audio url
  const { track, duration, buffered } = yield call(getAudioTrack, url)
  // put this track on state with duration
  // so we can dispatch action to play it
  yield put(SUCCESS({ track, duration, buffered }))
  // hide loader
  yield put(LOADING(false))
  // and dispatching play action
  yield put(PLAY_TRACK(track))
}

function * playingFlow (action) {
  const track = action.payload
  track.loop = false
  track.play()
  // watch on time changing
  const trackChannel = yield call(trackChangeChannel, track)
  yield takeEvery(trackChannel, trackChange)
  // watch stop playing
  yield takeEvery(STOP_TRACK().type, stopTrack, track)
}

export default function * saga () {
  yield takeEvery(GET_TRACK().type, audioFlow)
  yield takeEvery(PLAY_TRACK().type, playingFlow)
}

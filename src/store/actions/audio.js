export const GET_TRACK = (url) => {
  return {
    type: 'GET_AUDIO',
    payload: url
  }
}

export const LOADING = (loading) => {
  return {
    type: 'TRACK_LOADING',
    payload: loading
  }
}

export const SUCCESS = (data) => {
  return {
    type: 'TRACK_SUCCESS',
    payload: data
  }
}

export const PLAY_TRACK = (track) => {
  return {
    type: 'PLAY_TRACK',
    payload: track
  }
}

export const STOP_TRACK = () => {
  return {
    type: 'STOP_TRACK'
  }
}

export const TRACK_UPDATED = (updates) => {
  return {
    type: 'TIME_UPDATED',
    payload: updates
  }
}

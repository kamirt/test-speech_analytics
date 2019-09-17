import { LOADING, SUCCESS, TRACK_UPDATED } from 'store/actions/audio'

const initialState = {
  track: null,
  duration: 0,
  buffered: 0,
  currentTime: 0,
  loading: false,
  error: null
}

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING().type:
      return Object.assign({}, { ...state}, { loading: action.payload })

    case SUCCESS().type:
      return Object.assign({}, { ...state}, { ...action.payload })

    case TRACK_UPDATED().type:
      return Object.assign({}, { ...state }, { ...action.payload })

    default:
      return state
  }
}

export default audioReducer

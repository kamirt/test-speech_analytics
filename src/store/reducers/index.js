import { combineReducers } from 'redux'

import transcribition from 'store/reducers/transcribition/index'
import audio from 'store/reducers/audio/index'

export default combineReducers({
  transcribition,
  audio
})

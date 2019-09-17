import { fork } from 'redux-saga/effects'
import audio from 'store/sagas/audio/index'
import transcribition from 'store/sagas/transcribition/index'

export default function * rootSaga () {
  yield fork(audio)
  yield fork(transcribition)
}

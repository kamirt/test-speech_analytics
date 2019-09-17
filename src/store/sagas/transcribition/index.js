import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_TRANSCRIBITION, LOADING, SUCCESS, FAIL } from 'store/actions/transcribitions'

// request
const asyncRequest = async (url) => {
  // here should be fetch or something like that
  const json = await import(`assets/files/${url}`)
  return { json: json.default, ok: true }
}

function * transcribitionFlow (action) {
  const url = action.payload
  // show loader
  yield put(LOADING(true))
  // then make request
  const response = yield call(asyncRequest, url)
  // then hide loader
  yield put(LOADING(false))
  // finally success or fail action depends on result
  if (response.ok) {
    yield put(SUCCESS(response.json))
  } else {
    yield put(FAIL(response.json))
  }
}

export default function * saga () {
  yield takeEvery(GET_TRANSCRIBITION().type, transcribitionFlow)
}

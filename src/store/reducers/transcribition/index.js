import { LOADING, SUCCESS, FAIL } from 'store/actions/transcribitions'

const initialState = {
  data: [],
  error: null,
  loading: false
}

const transcribitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING().type:
      return Object.assign({}, { ...state }, { loading: action.payload })

    case SUCCESS().type:
      return Object.assign({}, { ...state }, { data: action.payload })

    case FAIL().type:
      return Object.assign({}, { ...state }, { error: action.payload })

    default:
      return state
  }
}

export default transcribitionReducer

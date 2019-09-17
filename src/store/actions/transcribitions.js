export const GET_TRANSCRIBITION = (url) => (
  { type: 'GET_TRANSCRIBITION', payload: url }
)

export const LOADING = (loading) => {
  return {
    type: 'LOADING_TRANSCRIBITION',
    payload: loading
  }
}
export const SUCCESS = (data) => {
  return {
    type: 'SUCCESS_TRANSCRIBITION',
    payload: data
  }
}
export const FAIL = (error) => {
  return {
    type: 'FAIL_TRANSCRIBITION',
    payload: error
  }
}

import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import { GET_TRANSCRIBITION } from 'store/actions/transcribitions'

import 'assets/css/reader/reader.sass'

import Loader from 'components/player/PlayBtn'
import Dialog from './Dialog'

class Reader extends React.Component {
  static propTypes = {
    loading: propTypes.bool,
    data: propTypes.array,
    error: propTypes.string,
    currentTime: propTypes.number,
    dispatch: propTypes.func.isRequired
  }

  componentDidMount () {
    this.props.dispatch(GET_TRANSCRIBITION('transcribition.json'))
  }

  render () {
    const { loading, data, error, currentTime } = this.props
    return (
      <div className="reader">
        <h2 className="header">Пример звонка.wav</h2>
        <p className="date">21 мар 18:03:41</p>
        {loading && <div className="loader">
          <Loader disabled={true} loading={true} />
        </div>}

        {error && <div className="error">
          <span>{ error }</span>
        </div>}

        { data && <Dialog data={data} currentTime={currentTime}/> }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.transcribition.loading,
  error: state.transcribition.error,
  data: state.transcribition.data,
  currentTime: state.audio.currentTime
})

export default connect(mapStateToProps)(Reader)

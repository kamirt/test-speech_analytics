import React from 'react'
import propTypes from 'prop-types'

import 'assets/css/reader/dialog.sass'
import avatar from 'assets/img/avatar.png'

import { prettifyTime } from 'utils/utils'

class Dialog extends React.Component {
  static propTypes = {
    data: propTypes.array,
    currentTime: propTypes.number
  }

  renderReplica = (words, elIndex, currentTime) => {
    return (
      words.map((word, index) => {
        const { timeStart, timeEnd } = word

        if (currentTime >= timeStart && currentTime <= timeEnd) {
          return (
            <span
              key={`word-${elIndex}-${index}`}
              className="highlighted">{`${word.word} `}
            </span>
          )
        }
        return `${word.word} `
      })
    )
  }

  render () {
    const { data, currentTime } = this.props
    return (
      <div className="dialog">
        { data.map((el, index) => (
          <div key={`dialog-item-${index}`} className="dialog-item">
            <div className="avatar-container">
              <div className="avatar">
                <img src={avatar} alt="avatar"/>
              </div>
            </div>
            <div className="content">
              <div className="time">{prettifyTime(el.timeStart)}</div>
              <div className="text">
                { this.renderReplica(el.words, index, currentTime) }
              </div>
            </div>

          </div>
        )) }
      </div>
    )
  }
}

export default Dialog

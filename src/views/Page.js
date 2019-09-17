import React from 'react'

import '../assets/css/App.sass'

import Player from 'components/player/Player'
import Reader from 'components/reader/Reader'

class Page extends React.Component {

  render () {
    return (
      <main className="main">
        <Reader/>
        <Player/>
      </main>
    )
  }
}

export default Page

import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <p
        style={{
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Ryan Lanciaux`}
          style={{
            float: 'left',
            marginRight: rhythm(1 / 4),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        Written by <strong>Ryan Lanciaux</strong> who lives Ann Arbor. Ryan is the author of <a href="http://griddlegriddle.github.io/Griddle">Griddle (react data-grid)</a> and other various open source projects.
        <a href="https://twitter.com/ryanlanciaux">
          You're really missing out if you're not following him on Twitter (not really)
        </a>
      </p>
    )
  }
}

export default Bio

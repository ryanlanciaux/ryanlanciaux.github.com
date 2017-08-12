import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div>
        <p
          style={{
            marginBottom: 0,
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
          Written by <strong>Ryan Lanciaux</strong>. Ryan is a developer based out of Ann Arbor who programs in many languages. He is the author of <a href="http://griddlegriddle.github.io/Griddle">Griddle (react data-grid)</a> and other various open source projects.
        </p>
        <p
          style={{
            marginBottom: rhythm(1),
            textAlign: 'right'
          }}
        >
          <a href="https://twitter.com/ryanlanciaux">
            Follow him on twitter.
          </a>
        </p>
      </div>
    )
}
}

export default Bio

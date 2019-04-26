import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Image from "./lanciaux.inline.svg"

const HeaderElement = styled.header`
  background: ${({ theme }) => theme.colors.main};
`

const Link = styled(GatsbyLink)`
  color: white;
  text-decoration: none;

  &:focus .gatsby-image-wrapper {
    text-decoration: underline;
  }
`

const Header = ({ siteTitle }) => (
  <HeaderElement>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link to="/">
          <Image style={{ maxWidth: 400 }} />
        </Link>
      </h1>
    </div>
  </HeaderElement>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

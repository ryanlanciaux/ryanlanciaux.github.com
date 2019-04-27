import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import OriginalImage from "./lanciaux.inline.svg"

const HeaderElement = styled.header`
  background: ${({ theme }) => theme.colors.main};
`

const HeaderContainer = styled.div`
  display: flex;
  max-width: 960px;
  margin: 0 1rem;
  padding: 0;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`

const Link = styled(GatsbyLink)`
  color: white;
  text-decoration: none;

  &:focus .gatsby-image-wrapper {
    text-decoration: underline;
  }
`

const Image = styled(OriginalImage)`
  max-width: 400px;

  @media (max-width: 400px) {
    display: flex;
    align-self: center;
    width: 90%;
    max-width: 90%;
  }
`

const Header = ({ siteTitle }) => (
  <HeaderElement>
    <HeaderContainer>
      <h1 style={{ margin: 0 }}>
        <Link to="/">
          <Image style={{ maxWidth: 400 }} />
        </Link>
      </h1>
    </HeaderContainer>
  </HeaderElement>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

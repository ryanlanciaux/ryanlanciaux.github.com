import React from "react"
import { ThemeProvider } from "styled-components"
import theme from "../utils/theme"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import Header from "./header"
import "./layout.css"
import { SpaceBackground } from "./spaceBackground"

require("typeface-montserrat")

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.white};
    font-family: Arial, Helvetica, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.secondary};
    font-family: 'Montserrat', sans-serif;
  };

  a {
    color: ${({ theme }) => theme.colors.secondary};
    box-shadow: none;
  }
`

const Heading = createGlobalStyle`
`

const LayoutWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: ${props => (props.padMain ? "0px 1.0875rem 1.45rem" : "0")};
  padding-top: 0;
`

const Footer = styled.footer`
  margin: 0px 1.0875rem 1.45rem;

  & a {
    color: ${({ theme }) => theme.colors.secondaryLight};
  }
`

const Layout = ({ children, hero, hideHeader, padMain = true }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <SpaceBackground>
            <div />
          </SpaceBackground>

          <Heading />

          <LayoutWrapper padMain={padMain}>
            {!hideHeader && <Header siteTitle={data.site.siteMetadata.title} />}
            <main>{children}</main>
            <Footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </Footer>
          </LayoutWrapper>
        </>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

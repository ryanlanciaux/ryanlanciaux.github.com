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

const Layout = ({ children, hero, hideHeader }) => (
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

          {!hideHeader && <Header siteTitle={data.site.siteMetadata.title} />}
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `0px 1.0875rem 1.45rem`,
              paddingTop: 0,
            }}
          >
            <main>{children}</main>
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </div>
        </>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

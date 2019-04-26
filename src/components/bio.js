/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import Box from "./Box"
import styled from "styled-components"

import { rhythm } from "../utils/typography"

const Container = styled.div`
  display: flex;
  flex-direction: ${({ large }) => (large === true ? "column" : "row")};
  margin-bottom: ${rhythm(2.5)};
  font-family: ${({ large }) =>
    large === true
      ? "Montserrat, Arial, Helvetica, sans-serif"
      : "Arial, Helvetica, sans-serif"};

  font-size: ${({ large }) => (large === true ? "3rem" : "1rem")};
  line-height: ${({ large }) => (large === true ? "3.2rem" : "1.43rem")};
  margin-top: ${({ large }) => (large !== true ? rhythm(1) : rhythm(2.5))};

  & p {
    margin-bottom: ${({ large }) => (large === true ? rhythm(1) : rhythm(0.5))};
  }
`

function Bio({ large }) {
  const imageSize = large ? 128 : 64

  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <Container large={large}>
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                height: imageSize,
                width: imageSize,
                maxWidth: imageSize,
                minWidth: imageSize,
                borderRadius: `100%`,
                marginRight: rhythm(0.75),
                marginBottom: rhythm(0.75),
              }}
              imgStyle={{
                borderRadius: "50%",
                height: imageSize,
                width: imageSize,
              }}
            />
            <div>
              <p>
                Hi 👋 I'm <strong>{author}</strong>. I run{" "}
                <a href="http://www.spaceship.studio">Spaceship Studio, LLC.</a>{" "}
                a consultancy specializing in fast and dynamic web and native
                mobile applications.
              </p>
              <p>
                I live in Ann Arbor with my wonderful family! In my freetime, I
                create{"  "}
                <a href="https://soundcloud.com/ryanlanciaux/">
                  electronic music
                </a>
                .
              </p>
              {!large && (
                <p>
                  <a href={`https://twitter.com/${social.twitter}`}>
                    You should follow me on Twitter
                  </a>
                </p>
              )}
            </div>
          </Container>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 300, height: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio

import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import SEO from "../components/seo"
import Box from "../components/Box"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"

import SpaceLayout from "../components/layout"

const NextLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondaryLight};
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <SpaceLayout padMain={false}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <Box>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
        </Box>
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <NextLink to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </NextLink>
            )}
          </li>
          <li>
            {next && (
              <NextLink to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </NextLink>
            )}
          </li>
        </ul>
      </SpaceLayout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query PagePostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 300, height: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`

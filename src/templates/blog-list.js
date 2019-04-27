import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import Bio from "../components/bio"
import Layout from "../components/layout"
import { rhythm } from "../utils/typography"
import styled from "styled-components"

const NextLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondaryLight};
`

const PageLink = styled(Link)`
  padding: ${props => props.padding};
  text-decoration: none;
  color: ${({ index, currentPage, theme }) =>
    index + 1 === currentPage ? theme.colors.primary : theme.colors.white};
  border: ${({ index, currentPage, theme }) =>
    index + 1 === currentPage ? "1px solid" : "unset"};
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    const pagination = (
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          listStyle: "none",
          padding: 0,
        }}
      >
        {!isFirst && (
          <li>
            <NextLink to={prevPage} rel="prev">
              ← Previous Page
            </NextLink>
          </li>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <li
            key={`pagination-number${i + 1}`}
            style={{
              margin: 0,
            }}
          >
            <PageLink
              currentPage={currentPage}
              index={i}
              padding={rhythm(1 / 4)}
              to={`/${i === 0 ? "" : i + 1}`}
            >
              {i + 1}
            </PageLink>
          </li>
        ))}
        {!isLast && (
          <li>
            <NextLink to={nextPage} rel="next">
              Next Page →
            </NextLink>
          </li>
        )}
      </ul>
    )

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        hideHeader={currentPage === 1}
      >
        <SEO
          title={siteTitle}
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {currentPage === 1 && <Bio large={currentPage === 1} />}
        {currentPage === 1 ? (
          <h2>Articles</h2>
        ) : (
          <h2>Articles - Page {currentPage}</h2>
        )}
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: "none" }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
        {pagination}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`

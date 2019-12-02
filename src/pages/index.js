import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

// const displayDate = () => {
//   let today = moment().format('[The date and time now:] DD MMM YYYY h:mm a');
//   document.getElementById("displayDate").innerHTML = today;
// }  

class RootIndex extends React.Component {

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const stories = get(this, 'props.data.allContentfulStory.edges')
    // const [author] = get(this, 'props.data.allContentfulPerson.edges')
    const mainArticle = get(this, 'props.data.contentfulHeroArticle')

    return (
      <Layout location={this.props.location} >
        <Helmet title={siteTitle} />       
        <Hero data={mainArticle} />
        <div className="wrapper">
          <h2 className="section-headline">Stories</h2>
          <ul className="article-list">
            {stories.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
                </li>
              )
            })}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulHeroArticle {
      title
      mainImage {
        fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
         ...GatsbyContentfulFluid_tracedSVG
        }
      }
    }
    allContentfulStory(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
             ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`

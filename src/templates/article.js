import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import MainBanner from '@components/_Article/MainBanner'
import Content from '@components/_Article/Content'
import PdfForm from '@components/_Article/PdfForm'
import NextArticle from '../components/_Article/NextArticle'


const ArticlePage = ({ data }) => {
  const {
    seo,
    slug,
    updatedAt,
    metadata,
    date,
    mainBanner,
    featuredTitle,
    content,
    pdfForm,
    createdAt,
    nextArticle
  } = data.contentfulArticle

  const moreArticles = data.allContentfulArticle.nodes;

  return (
    <>
      <Seo data={seo} slug={`insights/${slug}`} article parentCategory="news" createdAt={createdAt} updatedAt={updatedAt}/>
      <MainBanner image={mainBanner} title={featuredTitle} date={date} metadata={metadata}/>
      <Content content={content}/>
      {pdfForm && <PdfForm data={pdfForm}/>}
      {nextArticle && <NextArticle data={nextArticle}/>}
    </>
  )
}

export default ArticlePage

export const pageQuery = graphql`
    query ArticlePage($slug: String!) {
        
        contentfulArticle(slug: { eq: $slug }) {
            seo {
                ...SEO
            }
            metadata {
                tags {
                    name
                    contentful_id
                }
            }
            slug
            mainImage {
                ...Image
            }
            mainBanner {
                ...Image
            }
            featuredTitle {
                raw
            }
            date(formatString: "MMMM YYYY") 
            content {
                raw
                references {
                    ...References
                }
            }
            pdfForm {
                formId
                formattedTitle {
                    raw
                }
                buttonTitle
                thanksMessage
            }
            updatedAt
            createdAt
            nextArticle {
                title
                slug
                metadata {
                    tags {
                        name
                        contentful_id
                    }
                }
                excerpt {
                    excerpt
                }
                mainImage {
                    ...Image
                }
                mainBanner {
                    ...Image
                }
            }
        }
        allContentfulArticle (
                filter: {slug: { ne: $slug } }
            ) {
            nodes {
                title
                slug
                mainImage {
                    ...Image
                }
                metadata {
                    tags {
                        name
                        contentful_id
                    }
                }
            }
        }
    }
`

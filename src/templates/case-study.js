import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import MainBanner from '@components/_CaseStudy/MainBanner'
import Services from '@components/_CaseStudy/Services'
import Builder from '@components/_CaseStudy/Builder'
import NextCaseStudy from '@components/_CaseStudy/NextCaseStudy'


const CaseStudyPage = ({ data }) => {
  const {
    title,
    seo, 
    slug,
    metadata,
    featuredTitle,
    bannerImage,
    content,
    excerpt,
    nextCaseStudy
  } = data.contentfulCaseStudy

  const allServices = data.allContentfulService.nodes

  return (
    <>
      <Seo data={seo} slug={`our-work/${slug}`} />
      <MainBanner title={featuredTitle} excerpt={excerpt} image={bannerImage} metadata={metadata}/>
      <Services metadata={metadata} allServices={allServices}/>
      {content && <Builder list={content}/>}
      {nextCaseStudy && <NextCaseStudy data={nextCaseStudy}/>}
    </>
  )
}

export default CaseStudyPage

export const pageQuery = graphql`
    query CaseStudyPage($slug: String!) {
        allContentfulService {
            nodes {
                metadata {
					tags {
						name
						contentful_id
					}
				}
				title
				slug
            }
        }
        contentfulCaseStudy(slug: { eq: $slug }) {
            title
            seo {
                ...SEO
            }
            slug
            metadata {
                tags {
                    name
                    contentful_id
                }
            }
            featuredTitle {
                raw
            }
            excerpt {
                excerpt
            }
            mainImage {
                ...Image
            }
            bannerImage {
                ...Image
            }
            content {
                __typename
                ... on ContentfulInformation {
                    contentful_id
                    title
                    content {
                        raw
                    }
                    image {
                        ...Image
                    }
                    type
                    backgroundColor
                    textColor
                }
                ... on ContentfulBanner {
                    contentful_id
                    title
                    image {
                        ...Image
                    }
                    videoUrl
                }
                ... on ContentfulResults {
                    contentful_id
                    title
                    items {
                        content {
                            raw
                        }
                    }
                }
                ... on ContentfulTestimonials {
                    contentful_id
                    title
                    image {
                        ...Image
                    }
                    items {
                        content {
                            raw
                        }
                        image {
                            ...Image
                        }
                    }
                }
            }
            nextCaseStudy {
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
                bannerImage {
                    ...Image
                }
            }
        }
    }
`

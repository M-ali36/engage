import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import MainBanner from '@components/_Careers/MainBanner'


const CareersPage = ({ data }) => {
  const {
    seo,
    slug,
    featuredTitle,
    subTitle,
    bannerImage,
  } = data.contentfulCareers

  return (
    <>
      <Seo data={seo} slug={slug}/>
      <MainBanner title={featuredTitle} subTitle={subTitle} image={bannerImage}/>
    </>
  )
}

export default CareersPage

export const pageQuery = graphql`
    query CareersPage($slug: String!) {
        
        contentfulCareers(slug: { eq: $slug }) {
            slug
            seo {
                ...SEO
            }
            featuredTitle {
                raw
            }
            subTitle
            bannerImage {
                ...Image
            }
            mainInfo {
                title
                content {
                    raw
                }
                image {
                    ...Image
                }
            }
            ourValues {
                title
                content {
                    raw
                }
                image {
                    ...Image
                }
            }
            openRoles {
                title
                url
                location
            }
            awareness {
                raw
            }
            pageFooter {
				content {
					raw
				}
				link {
					...Link
				}
				backgroundImage {
					...Image
				}
			}
        }
    }
`

import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import MainBanner from '@components/_AboutUs/MainBanner'
import Results from '@components/_AboutUs/Results'
import OurDifference from '@components/_AboutUs/OurDifference'
import WhoWeServe from '@components/_AboutUs/WhoWeServe'
import Team from '@components/_AboutUs/Team'
import Partners from "@components/Partners"


const AboutUsPage = ({ data }) => {
  const {
    seo,
    slug,
    bannerTitle,
    bannerSubTitle,
    bannerImages,
    resultsTitle,
    results,
    ourDifferenceTitle,
    ourDifferenceImages,
    ourDifferenceList,
    whoWeServeTitle,
    partnersTitle,
    partners,
    teamTitle, 
    team
  } = data.contentfulAbout

  return (
    <>
      <Seo data={seo} slug={slug}/>
      <MainBanner title={bannerTitle} subTitle={bannerSubTitle} images={bannerImages}/>
      <Results title={resultsTitle} items={results}/>
      <OurDifference title={ourDifferenceTitle} images={ourDifferenceImages} list={ourDifferenceList}/>
      <WhoWeServe title={whoWeServeTitle}/>
      <Partners title={partnersTitle} items={partners}/>
      <Team items={team} title={teamTitle}/>
    </>
  )
}

export default AboutUsPage

export const pageQuery = graphql`
    query AboutUsPage($slug: String!) {
        
        contentfulAbout(slug: { eq: $slug }) {
            slug
            seo {
                ...SEO
            }
            bannerTitle {
                raw
            }
            bannerSubTitle {
                raw
            }
            bannerImages {
                ...Image
            }
            resultsTitle {
                raw
            }
            results {
                content {
                    raw
                }
            }
            ourDifferenceTitle {
                raw
            }
            ourDifferenceImages {
                ...Image
            }
            ourDifferenceList {
                title
                content {
                    raw
                }
                image {
                    ...Image
                }
            }
            whoWeServeTitle {
                raw
            }
            partnersTitle {
                raw
            }
            partners {
                ...Image
            }
            teamTitle {
                raw
            }
            team {
                title
                rule
                image {
                    ...Image
                }
                links {
                    url
                    icon
                }
            }
        }
    }
`

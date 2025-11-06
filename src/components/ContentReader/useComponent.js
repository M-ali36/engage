import React from 'react'
import AnimatedLink from '@Ui/AnimatedLink'
import VideoEmbed from '@components/VideoEmbed'

const useComponents = () => {
  const getComponent = (data) => {
      switch (data.__typename) {
          case 'ContentfulLink':
            return  <AnimatedLink link={`${data.linkToPage ? data.linkToPage.slug : data.url}`} title={data.title} as={data.linkType}/>
          case 'ContentfulVideo':
            return  <VideoEmbed data={data}/>
          default:
            return null;
      }
  }
  return {
      getComponent
  }
}

export default useComponents 
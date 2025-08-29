import React from 'react'
import AnimatedLink from '@Ui/AnimatedLink'

const useComponents = () => {
  const getComponent = (data) => {
      switch (data.__typename) {
          case 'ContentfulLink':
            return  <AnimatedLink link={`${data.linkToPage ? data.linkToPage.slug : data.url}`} title={data.title} as={data.linkType}/>
          default:
            return null;
      }
  }
  return {
      getComponent
  }
}

export default useComponents 
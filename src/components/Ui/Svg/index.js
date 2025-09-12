import React, { useEffect, useState } from "react"

const InlineSVG = ({ url, ...props }) => {
  const [svgContent, setSvgContent] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(setSvgContent)
  }, [url])

  return (
    <span
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  )
}

export default InlineSVG

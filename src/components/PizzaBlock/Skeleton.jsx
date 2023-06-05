import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader 
    className="pizza-block"
    speed={1}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="137" cy="127" r="124" /> 
    <rect x="2" y="277" rx="15" ry="15" width="278" height="30" /> 
    <rect x="1" y="317" rx="15" ry="15" width="277" height="70" /> 
    <rect x="9" y="414" rx="15" ry="15" width="90" height="26" /> 
    <rect x="126" y="407" rx="26" ry="26" width="152" height="41" />
  </ContentLoader>
)

export default Skeleton
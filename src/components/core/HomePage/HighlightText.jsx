import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className="text-transparent bg-clip-text bg-text-gradient">
        {" "}    
        {text}
    </span>
  )
}

export default HighlightText
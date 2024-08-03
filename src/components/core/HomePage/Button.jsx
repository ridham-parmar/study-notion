import React from 'react'
import { NavLink } from 'react-router-dom'

const Button = ({children, text, active, linkTo}) => {
  return (
    <NavLink to={linkTo}>
      <div className={`py-[0.6rem] px-4 text-[0.8rem] min-[390px]:px-6 min-[390px]:py-3 min-[390px]:text-base flex items-center justify-center gap-2  rounded-lg  font-medium hover:scale-95 transition-all duration-200 text-center tracking-wide
      ${active ? 
      "bg-yellow-50 text-richblack-900 shadow-[inset_-2px_-2px_0px_0px_rgba(255,255,255,0.51)]" : 
      "bg-richblack-800 text-richblack-5 shadow-[inset_-2px_-2px_0px_0px_rgba(255,255,255,0.18)]" }`}>
        {text}
        {children}
      </div>
    </NavLink>
  )
}

export default Button
import React from 'react'

const TimeLineQuality = ({active, src, heading, subheading}) => {
  return (
    <div className="relative sm:py-4 sm:px-3 flex gap-6">
       <div className="h-[52px] w-[52px] p-4 flex justify-center items-center rounded-[200px] z-10
        bg-white shadow-[0px_0px_62px_0px_rgba(0,0,0,0.12)]">
            <img src={src} alt="logo"/>
       </div>
       <div>
            <p className="text-lg font-inter non-italic font-semibold text-richblack-800">
                {heading}
            </p>
            <p className="text-sm leading-[22px] tracking-wider font-inter non-italic font-normal text-richblack-700">
                {subheading}
            </p>
       </div>
       { active && 
         <div className="absolute left-[26px] top-12 sm:left-[38px] sm:top-[79px] w-[1px] h-[100px] sm:h-11 border-[1px] border-dashed border-richblack-100"></div>
       }
    </div>
  )
}

export default TimeLineQuality
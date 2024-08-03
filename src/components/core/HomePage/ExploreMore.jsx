import React, { useState } from 'react'
import HighlightText from './HighlightText'
import { HomePageExplore } from '../../../data/homepage-explore'
import { BsFillPeopleFill } from 'react-icons/bs'
import { ImTree } from 'react-icons/im'

const ExploreMore = () => {

    const tabName = [
        "Free",
        "New to Coding",
        "Most Popular",
        "Skill Paths",
        "Career Paths"
    ] 

    const [ currentTab, setCurrentTab ] = useState(tabName[0]) ;
    const [ courses, setCourses ] = useState(HomePageExplore[0].courses) ;
    const [ courseBorder, setCourseBorder ] = useState(courses[0].heading);
    

    const setValue = (value) => {
        setCurrentTab(value) ;
        const result = HomePageExplore.filter((course) => course.tag === value) ;
        setCourses(result[0].courses) ;
        setCourseBorder(result[0].courses[0].heading) ;
    }

  return (
    <div className="relative w-11/12 pt-[38px] pb-[90px] sm:py-[90px] mx-auto max-w-maxContent flex flex-col justify-center items-center gap-9">
        <div className="flex w-full sm:items-center flex-col gap-8 mb-[47rem] min-[900px]:mb-[30rem] xl:mb-40">
            <div className="sm:text-center flex flex-col gap-2">
                <h2 className="text-richblack-5 text-3xl sm:text-4xl font-semibold -tracking-[0.72px] font-inter">
                    Unlock the <HighlightText text={"Power of Code"}/>
                </h2>

                <p className="text-richblack-300 text-base font-medium font-inter tracking-wider">
                    Learn to Build Anything You Can Imagine
                </p>
            </div>

            <div className=" items-center hidden sm:flex min-[900px]:gap-5 rounded-full bg-richblack-800 p-1 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]">
                {
                    tabName.map( (tab, index) => {
                        return (
                            <p className={`font-inter text-center tracking-wider text-sm md:text-base font-medium px-3 sm:px-5 min-[900px]:px-7 py-[7px] text-richblack-200 cursor-pointer transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5 hover:scale-95 rounded-full
                            ${currentTab === tab ? "bg-richblack-900 text-richblack-5" : "bg-richblack-800"}`} 
                            onClick={ () => setValue(tab)}
                            key={index}>
                                {tab}
                            </p>
                        )
                    })
                }
            </div>
        </div>

        <div className="absolute -bottom-24 grid grid-cols-1 min-[900px]:grid-cols-2 xl:grid-cols-3 text-white font-inter gap-8 sm:gap-11 pt-8  sm:px-[52px]">
            {
                courses.map((course, index) => {
                    return (
                        <div 
                        onClick={() => setCourseBorder(course.heading)}
                        key={index}
                        className={`bg-richblack-800 hover:cursor-pointer transition-all duration-200 justify-self-center flex flex-col justify-between w-[341px] max-w-full ${index === 2 ? "min-[900px]:col-span-2 xl:col-span-1" : ""}
                        ${course.heading === courseBorder ? "shadow-[12px_12px_0_0_#ffd60a] bg-white" : "bg-richblack-800"}`}>
                            <div className="flex flex-col gap-3 pt-8 px-6 pb-[52px]">
                                <p 
                                className={`text-richblack-25 text-xl font-semibold
                                ${course.heading === courseBorder ? "text-richblack-800" : "text-richblack-25"}`}>
                                    {course.heading}
                                </p>
                                <p 
                                className={`text-base font-normal text-richblack-400
                                ${course.heading === courseBorder ? "text-richblack-500" : "text-richblack-400"}`}>
                                    {course.description}
                                </p>
                            </div>
                            <div 
                            className={`flex justify-between items-center py-4 px-6 text-richblack-400 font-inter border-t-2 border-dashed border-richblack-600
                            ${course.heading === courseBorder ? "border-richblack-50 text-blue-300" : "border-richblack-600"}`}>
                                <div className="flex items-center gap-2">
                                    <BsFillPeopleFill className="h-5 w-5" />
                                    <p className="text-base font-normal ">{course.level}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ImTree/>
                                    <p>{course.lessionNumber}</p>
                                    <p>Lessons</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore
import React from 'react'
import Button from './Button'
import HighlightText from './HighlightText'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimeLineQuality from './TimeLineQuality'
// import TimeLineVideo from '../../../assets/Images/TimelineVideo.mp4'
import TimelineImage from '../../../assets/Images/TimelineImage.png'

const TimeLine = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 sm:gap-[52px] mx-auto w-11/12 max-w-maxContent py-[38px] sm:py-[90px] ">

        <div className="flex flex-col lg:flex-row gap-3">
            <div className="lg:mr-4 text-3xl sm:text-4xl font-semibold -tracking-[0.72px] font-inter text-richblack-900">
                Get the skills you need for a <HighlightText text={"job that is in demand."}/>
            </div>

            <div className="flex flex-col gap-9">
                <p className="lg:w-[84%] text-richblack-700 text-base font-medium font-inter tracking-wider">
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </p>
                <div className="self-start">
                    <Button text={"Learn More"} active={true} linkTo={"/login"}/>
                </div>
            </div>
        </div>


        <div className="flex flex-col lg:flex-row sm:items-center justify-center gap-[76px] ">
            <div className="flex flex-col h-fit justify-center gap-8 relative">
              <TimeLineQuality active={true} src={logo1} heading={"Leadership"} subheading={"Fully committed to the success company"}/>

              <TimeLineQuality active={true} src={logo2} heading={"Responsibility"} subheading={"Students will always be our top priority"}/>

              <TimeLineQuality active={true} src={logo3} heading={"Flexibility"} subheading={"The ability to switch is an important skills"}/>

              <TimeLineQuality src={logo4} heading={"Solve the problem"} subheading={" Code your way to a solution"}/>
            </div>

            <div className="relative flex justify-center items-center px-4 lg:px-0">
               
                <img src={TimelineImage} alt={"timeline"} className="relative z-10 shadow-[10px_10px_0px_0px_#fff] sm:shadow-[20px_20px_0px_0px_#fff]"/>
                {/* <video 
                    // src={TimeLineVideo}
                    muted
                    loop
                    autoPlay
                    className="w-[714px] h-[545px] shadow-[20px_20px_0px_0px_#fff]"
                >
                    <source src={TimeLineVideo}></source>
                </video> */}

                <div className="absolute rounded-[749.262px] top-0 sm:top-[5%] w-full h-[250px] sm:h-[480px]
                opacity-60 bg-timeline-ellipse blur-[34px]"></div> 

                <div className="absolute left-0 top-0 sm:-bottom-[13%] sm:left-auto sm:top-auto z-20 p-[23px] gap-[3px] sm:p-[25px] sm:gap-[30px] md:p-[35px] md:gap-[52px] bg-caribbeangreen-700 flex flex-col items-center sm:flex-row font-inter">

                    <div className="flex gap-6">
                        <p className="text-white text-2xl sm:text-3xl leading-[40px] font-bold -tracking-[0.72px]">10</p>
                        <p className="text-caribbeangreen-300 text-sm leading-[22px] font-medium">YEARS <br/>EXPERIENCE</p>
                    </div>
                    <div className=" rotate-90 sm:rotate-0 h-11 w-[1px] bg-caribbeangreen-500"></div>
                    <div className="flex gap-6">
                        <p className="text-white text-2xl sm:text-3xl leading-[40px] font-bold">250</p>  
                        <p className="text-caribbeangreen-300 text-sm leading-[22px] font-medium">TYPES <br/> OF COURSES</p>
                    </div>

                </div>              
            </div>
        </div>
    </div>
  )
}

export default TimeLine
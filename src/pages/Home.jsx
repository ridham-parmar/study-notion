import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import Button from '../components/core/HomePage/Button'
// import banner from '../assets/Images/banner.mp4'
import boxOffice from '../assets/Images/boxoffice.png'
import Codeblocks from '../components/core/HomePage/Codeblocks'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import TimeLine from '../components/core/HomePage/TimeLine'
import KnowYourProgress from '../assets/Images/Know_your_progress.svg'
import CompareWithOthers from '../assets/Images/Compare_with_others.svg'
import PlanYourLessons from '../assets/Images/Plan_your_lessons.svg'
import Instructor from '../assets/Images/Instructor.png'
import Footer from '../components//common/Footer'

const Home = () => {
  return (
    <div className="w-full pt-8">
    
      {/* section 1 */}
      <div className="relative w-full bg-richblack-900 flex flex-col items-center">
        <div className="w-11/12 max-w-[913px] mx-auto flex flex-col sm:items-center justify-center gap-[38px] mt-16 text-white font-inter">
          <NavLink to='/signup' className="self-start sm:self-center">
            <div className="group text-center shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)] rounded-full bg-richblack-800 p-1 hover:scale-95 transition-all duration-200">
              <div className="flex non-italic tracking-wider items-center py-[0.375rem] px-[1.125rem] gap-[0.625rem] text-richblack-200 text-base font-medium">
                <p>Become an Instructor</p>
                <FaArrowRight className="w-3 h-3"/>
              </div>
            </div>
          </NavLink>

          <div className="sm:text-center flex flex-col gap-4">
            <p className="text-3xl sm:text-4xl non-italic font-semibold -tracking-[0.045rem] text-richblack-5">
              Empower Your Future with 
              <HighlightText text={"Coding Skills"}/>
            </p>
            <p className="text-richblack-300 non-italic text-base font-medium tracking-wider">
              With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </p>
          </div>

          <div className="flex gap-6 z-10">
            <Button text={"Learn More"} active={true} linkTo={"/signup"}/>
            <Button text={"Book a Demo"} active={false} linkTo={"/login"}/>
          </div>
        </div>

        <div className="relative mt-[38px] sm:mt-14 flex justify-center px-4 sm:px-8">
          {/* <video muted loop autoPlay className="w-[1035px] h-[515px] mx-auto shadow-[20px_20px_0_0_#f5f5f5]">
            <source src={banner}></source>
          </video> */}
          <img src={boxOffice} alt="boxoffice" className="relative  z-10"/>

          <div className="absolute top-0 left-[50%] -translate-x-[50%] w-[298px] h-[69px] rounded-[298px] lg:w-[992px] lg:h-[295px] lg:rounded-[992px] opacity-60 sm:opacity-40 bg-ellipse-gradient blur-[60px]"></div>
        </div>

        <Codeblocks 
          active={true}

          heading={
            <div className="text-richblack-5 text-3xl non-italic sm:text-4xl font-semibold -tracking-[0.72px]">
              Unlock your <HighlightText text={"coding potential"} /> with our online courses.
            </div>
          }

          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          
          btn1={"Try it Yourself"}

          btn2={"Learn More"}

          codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three<a>\n/nav>`}
        />  

        <Codeblocks 
          active={false}
          
          heading={
            <div className="text-richblack-5 text-3xl sm:text-4xl font-semibold -tracking-[0.72px] w-[240px]">
              Start <HighlightText text={"coding in seconds"} />
            </div>
          }

          subheading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          
          btn1={"Continue Lesson"}

          btn2={"Learn More"}

          codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three<a>\n/nav>`}
        /> 
        
        <ExploreMore/>
      </div>

      {/* section 2 */}
      <div className="w-full bg-pure-greys-5">
          <div className='w-full h-[210px] sm:h-[320px] flex items-center justify-center gap-6 bg-frameImage'>
            <div className="flex gap-6 mt-24 sm:mt-9"> 
                <Button text={"Explore Full Catalog"} active={true} linkTo={"/signup"}>
                    <FaArrowRight/>
                </Button>
                <Button text={"Learn More"} active={false} linkTo={"/login"}/>
            </div>
          </div>

          <TimeLine/>

          <div className="flex flex-col justify-center items-center gap-[52px] mx-auto w-11/12 max-w-maxContent py-[38px] sm:py-[90px] ">
            <div className="flex flex-col gap-3 lg:text-center lg:px-[220px]">
              <h2 className="text-richblack-900 text-3xl sm:text-4xl font-semibold -tracking-[0.72px] font-inter">
                Your swiss knife for <HighlightText text={"learning any language"}/>
              </h2>

              <p className="text-richblack-700 text-base font-medium font-inter tracking-wider">
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:w-full lg:h-[500px] relative">
              <img src={KnowYourProgress} alt={KnowYourProgress} className="lg:absolute lg:left-0 xl:left-9"/>
              <img src={CompareWithOthers} alt={CompareWithOthers} className="-mt-20 lg:mt-0 lg:absolute lg:bottom-0 lg:left-[50%] lg:-translate-x-[50%]"/>
              <img src={PlanYourLessons} alt={PlanYourLessons} className="-mt-28 lg:mt-0 lg:absolute lg:right-0"/>
            </div>

            <div>
              <Button text={"Learn More"} active={true} linkTo={"/login"} />
            </div>
          </div>
      </div>

      {/* section 3 */}
      <div className="w-full bg-richblack-900">
          <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-8 sm:gap-[98px] mx-auto w-11/12 max-w-maxContent py-[38px] sm:py-[90px]">
            <div className="sm:shadow-[-20px_-20px_0_0_#fff] ">
              <img src={Instructor} alt={Instructor} className="object-cover"/>
            </div>

            <div className="flex flex-col gap-3 lg:w-[486px]">

              <h2 className="text-richblack-5 text-3xl sm:text-4xl font-semibold -tracking-[0.72px] font-inter">
                Become an <br/> <HighlightText text={"instructor"}/>
              </h2>

              <p className="text-richblack-300 text-base font-medium font-inter tracking-wider">
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
              </p>

              <div className="pt-[52px] self-start">
                <Button text={"Start Teaching Toady"} active={true} linkTo={"/signup"}>
                  <FaArrowRight/>
                </Button>
              </div>

            </div>
          </div>
      </div>

      {/* section 4 */}
      <Footer/>
    </div>
  )
}

export default Home
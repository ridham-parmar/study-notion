import React from 'react'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const Codeblocks = ({active, heading, subheading, btn1, btn2, codeblock}) => {
  return (
    <div className={`flex ${active ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col text-white w-11/12 max-w-maxContent items-center justify-center py-[38px] sm:pt-[90px]  gap-12 lg:gap-[98px]`}>

        {/* section left */}
        <div className="font-inter w-full lg:w-[486px] flex flex-col items-start gap-3 ">
            {heading}

            <p className="text-richblack-300 text-base font-medium tracking-wider">
                {subheading}
            </p>

            <div className="flex pt-6 sm:pt-[52px] gap-6">
                <Button text={btn1} active={true} linkTo={"/signup"}>
                    <FaArrowRight/>
                </Button>
                <Button text={btn2} active={false} linkTo={"/login"}/>
            </div>
        </div>

        {/* section right */}
        <div className="relative lg:w-[534px] w-full lg:p-8 flex items-center">

            {/* ellipse gradient */}
            <div className={`${active ? "bg-animation-ellipse-1" : "bg-animation-ellipse-2"} absolute -left-[91.2px] -right-[17px] sm:-left-[3.2px] rounded-[373px] sm:-top-[5px] w-[373px] h-[257px]  blur-[34px] opacity-20`}></div>
            
            {/* Typed animation */}
            <div className="flex p-2 gap-2 bg-animation-gradient w-full rounded-sm">
                <div className="w-[10%] flex flex-col gap-[2px] px-1 max-w-max items-center text-richblack-400 text-center text-sm font-bold font-mono">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] ${active ? "text-brown-100" : "text-blue-100"} text-sm h-fit font-mono`}>
                    <TypeAnimation
                        sequence={[codeblock, 2000, ""]}
                        repeat={Infinity}
                    
                        style = {
                            {
                                whiteSpace: "pre-line",
                                // fontSize:"14px",
                                // fontFamily:"monospace",
                                fontWeight:"bold",
                                lineHeight:"21.5px",
                                letterSpacing:"0.025rem"
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Codeblocks
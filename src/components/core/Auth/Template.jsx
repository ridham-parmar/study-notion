import React from 'react'
import frameImage from '../../../assets/Images/frame.png'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'
import { useSelector } from 'react-redux'


const Template = ({title, desc1, desc2, image, formtype}) => {

    const { loading } =  useSelector( (state) => state.auth ) ;

  return (
    <div className="bg-richblack-900 min-h-[calc(100dvh-3.55rem)] flex items-center justify-center">
        {
            loading 
            ? (
                <div className='spinner'></div>
            ) 
            : (
                <div className='w-11/12 max-w-maxContent mx-auto flex flex-col-reverse md:flex-row justify-between items-center gap-12      py-10'>
                    {/* Left Side */}
                    <div className='w-11/12 max-w-[450px]'>
                        <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>
                            {title}
                        </h1>

                        <p className='text-[1.125rem] leading[1.625rem] mt-4'>
                            <span className='text-richblack-100'>{desc1}</span>
                            <br/>
                            <span className='text-blue-100 italic'>{desc2}</span>
                        </p>

                        {
                            formtype === "signup" ?
                            <SignUpForm/> :
                            <LogInForm/>
                        }

                    
                    </div>

                    {/* Right Side */}
                    <div className='w-11/12 max-w-[450px] relative'>
                        <img
                            src={frameImage}
                            alt="Pattern"
                            width={558}
                            height={504}
                            loading="lazy"
                        />

                        <img 
                            src={image}
                            alt="Students"
                            width={558}
                            height={490}
                            loading="lazy"
                            className="absolute -top-4 right-4"
                        />
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Template;
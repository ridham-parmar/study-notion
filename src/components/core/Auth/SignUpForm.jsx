import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from 'react-hot-toast' ;
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignUpData } from '../../../slices/authSlice'; 
import { sendOTP } from '../../../services/operation/authAPI';
import { ACCOUNT_TYPE } from '../../../utils/constant';

const SignUpForm = () => {
    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;

    const [showCreatePassword, setCreatePassword] = useState(false) ;
    const [showConfirmPassword, setConfirmPassword] = useState(false) ;
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT) ;

    const [formData, setFormData] = useState({
        firstName : '',
        lastName : '', 
        email : '',
        createPassword : '',
        confirmPassword : '',
        phoneNumber : ''
    })

    function changeHandler(event) {
        setFormData( (prev) => {
            return {
                ...prev,
                [event.target.name] : event.target.value
            }
        })
    }

    // const { firstName, lastName, email, createPassword, confirmPassword } = formData ;

    async function submitHandler(event) {
        event.preventDefault() ;

        if(formData.createPassword !== formData.confirmPassword) {
            toast.error('Passwords Do Not Match') ;
            return 
        } 

        const signupData = {
            ...formData,
            accountType
        }

        // console.log("signupdata from form : ", signupData) ;

        // setting signUpData in slice It will be used after otp verification
        dispatch(setSignUpData(signupData)) ;

        // send otp mail to user
        await sendOTP(formData.email, navigate, dispatch) ;

    }

   
    
  return (
    <div>
        {/* student-instructor tab */}
        <div className='accounTypeBtn flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max 
        shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]'>
            <button onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}
            className={`${accountType === ACCOUNT_TYPE.STUDENT ? 
            "bg-richblack-900 text-richblack-5" : 
            "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-300`}>
                Student
            </button>

            <button onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}
            className={`${accountType === ACCOUNT_TYPE.INSTRUCTOR ? 
            "bg-richblack-900 text-richblack-5" : 
            "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-300`}>
                Instructor
            </button>
        </div>

        <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-5">
                {/* first and last name  */}
                <div className="flex flex-col justify-between gap-5 sm:flex-row gap-x-4">
                    <label className="sm:w-[50%]">
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            First Name <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name='firstName'
                            value={formData.firstName}
                            onChange={changeHandler}
                            placeholder="Enter first name"
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] 
                            shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]'
                        />
                    </label>
                    <label className="sm:w-[50%]">
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Last Name <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name='lastName'
                            value={formData.lastName}
                            onChange={changeHandler}
                            placeholder="Enter last name"
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] 
                            shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]'
                        />
                    </label>
                </div>

                {/* Email */}
                <div className="">
                    <label>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Email Address <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type="email"
                            placeholder='Enter email address'
                            onChange={changeHandler}
                            name="email"
                            value={formData.email}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]'
                        />
                    </label>
                </div>

                {/* Mobile Number */}
                <div>
                    <label>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Phone Number<sup className='text-pink-200'>*</sup>
                        </p>
                            <input
                                type='text'
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={changeHandler}
                                placeholder='12345 67890'
                                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]'
                            />
                    </label>
                </div>

                {/* Create and confirm password */}
                <div className="flex flex-col justify-between gap-5 sm:flex-row gap-x-4">
                    <label className='relative sm:w-[50%]'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Create Password <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type={showCreatePassword ? ("text") : ("password")}
                            placeholder='Enter password'
                            onChange={changeHandler}
                            name="createPassword"
                            value={formData.createPassword}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]'
                        />

                        <span className='absolute right-3 top-[38px] cursor-pointer'
                        onClick={() => {setCreatePassword((prev) => !prev)}}>
                            {showCreatePassword ? 
                            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 
                            (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                    </label>

                    <label className='relative sm:w-[50%]'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Confirm Password <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? ("text") : ("password")}
                            placeholder='Enter password'
                            onChange={changeHandler}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]'
                        />

                        <span className='absolute right-3 top-[38px] cursor-pointer' 
                        onClick={() => {setConfirmPassword((prev) => !prev)}}>
                            {showConfirmPassword ?
                            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 
                            (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                    </label>
                </div>

                <button className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-4'>
                    Create Account
                </button>
            </div>
        </form>
    </div>
  )
}

export default SignUpForm
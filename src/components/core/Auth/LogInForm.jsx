import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom' ;
import { login } from '../../../services/operation/authAPI'

const LogInForm = () => {
    
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;

    const [showPassword, setShowPassword] = useState(false) ;
    
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    function changeHandler(event) {
        setFormData( (prev) => {
            return {
                ...prev,
                [event.target.name] : event.target.value
            }
        })
    }

    const { email, password } = formData ;

    async function submitHandler(event) {
        event.preventDefault();
       await login(email, password, navigate, dispatch) ;
    }

    // console.log(formData) ;

  return (
    <form onSubmit={submitHandler}
    className='flex flex-col w-full gap-y-4 mt-6'>
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

        <label className='relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password <sup className='text-pink-200'>*</sup>
            </p>
            <input
                required
                type={showPassword ? ("text") : ("password")}
                placeholder='Enter password'
                onChange={changeHandler}
                name="password"
                value={formData.password}
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]'
               
            />

            <span className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => {setShowPassword((prev) => !prev)}}>
                {showPassword ? 
                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 
                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>

            <NavLink to="/forgot-password">
                <p className="max-w-max ml-auto text-xs mt-1 text-blue-100">Forgot Password</p>
            </NavLink>
        </label>

        <button type='submit' className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Sign in
        </button>
    </form>
  )
}

export default LogInForm
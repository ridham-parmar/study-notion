import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const UpdatePassword = () => {
    const { loading } = useSelector( (state) => state.auth ) ;

    const [ showNewPassword, setNewPassword ] = useState(false) ;

  return (
    <div className="bg-richblack-900 min-h-[calc(100dvh-3.55rem)] flex items-center justify-center">
        <div>
            <div>
                <h2 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>
                    Choose new password
                </h2>
                <p className='text-[1.125rem] leading[1.625rem] text-richblack-100'>
                    Almost done. Enter your new password and you are all set.
                </p>
            </div>

            <form>
                <label>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        New Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        placeholder='Enter Password'
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] 
                        shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]'
                    />
                    <span
                        onClick={() => {setNewPassword((prev) => !prev)}}>
                            {showNewPassword ? 
                            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 
                            (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                </label>
            </form>
        </div>
    </div>
  )
}

export default UpdatePassword
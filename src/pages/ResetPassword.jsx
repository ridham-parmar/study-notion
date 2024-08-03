import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeftLong } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { sendResetPasswordToken } from '../services/operation/authAPI';

const ResetPassword = () => {
    const [ sentMail, setSentMail] = useState(false) ;
    const [ mail, setMail ] = useState('') ;

    const { loading } = useSelector( (state) => state.auth ) ;
    const dispatch = useDispatch() ;

    async function handleChange(event) {
        event.preventDefault() ;

        await sendResetPasswordToken(mail, dispatch, setSentMail) ;
    }

  return (
    <div className="bg-richblack-900 min-h-[calc(100dvh-3.55rem)] flex items-center justify-center">
        {
            loading ? 
            (
                <div className="spinner"></div>
            ) :
            (
                <div className="w-[508px] p-8 flex flex-col gap-9">
                    <div className="flex flex-col gap-3">
                        <h2 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>
                            {
                                sentMail ? 
                                ("Check email") : 
                                ("Reset your password")
                            }
                        </h2>

                        <p className='text-[1.125rem] leading[1.625rem] text-richblack-100'>
                            {
                                sentMail ?
                                (`We have sent the reset email to your account ${mail}`) : 
                                ('Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery')
                            }
                        </p>
                    </div>

                    {
                        sentMail ? 
                        (
                            <button onClick={() => sendResetPasswordToken(mail, dispatch, setSentMail)}
                             type='submit' 
                            className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                               Resend email
                            </button>
                        ) : 
                        (
                            <form onSubmit={handleChange}
                            className="flex flex-col gap-7">
                                <div className="">
                                    <label>
                                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                                            Email Address <sup className='text-pink-200'>*</sup>
                                        </p>
                                        <input
                                            onChange={(event) => setMail(event.target.value)}
                                            required
                                            value={mail}
                                            type="email"
                                            placeholder='Enter email address'
                                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]'
                                        />
                                    </label>
                                </div>

                                <button
                                type='submit' 
                                className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]'>
                                   Reset password
                                </button>
                            </form>
                        )
                    }

                    <NavLink to='/login'>
                        <div className="flex gap-4 text-richblack-5 items-center cursor-pointer">
                            <FaArrowLeftLong className="w-[18px] h-[18px]"/>
                            <p className="text-base font-medium font-inter not-italic">
                                Back to login
                            </p>
                        </div>
                    </NavLink>
                </div>
            )
        }
    </div>
  )
}

export default ResetPassword
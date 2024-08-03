import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import OtpInput from 'react-otp-input';
import { FaArrowLeftLong } from 'react-icons/fa6'
import { NavLink, useNavigate } from 'react-router-dom';
import { RxCountdownTimer } from 'react-icons/rx'
import { signup } from '../services/operation/authAPI';
import { setLoading } from '../slices/authSlice';
import { sendOTP } from '../services/operation/authAPI';

const VerifyEmail = () => {
    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;
    const { loading, signUpdata } = useSelector( (state) => state.auth ) ;
    const [otp, setOtp] = useState('') ;

    // console.log("singupdata : ", signUpdata) ;
    const { firstName, lastName, email, createPassword, confirmPassword, accountType, phoneNumber } = signUpdata ;

    async function handleOnSubmit(event) {
        event.preventDefault() ;
        // console.log("in verify email page") ;
        
        await signup(firstName, lastName, email, accountType, createPassword, confirmPassword, phoneNumber, otp, navigate, setLoading, dispatch) ;

    }

  return (
    <div className="bg-richblack-900 min-h-[calc(100dvh-3.55rem)] flex items-center justify-center">
        {
            loading 
            ? (
                <div className="spinner"></div>
            ) 
            : (
                <div className="p-8 max-w-[500px] flex flex-col gap-6">
                    <div className='flex flex-col gap-3'>
                        <h2 className="font-inter text-3xl font-semibold leading-[38px] not-italic text-richblack-5">
                            Verify email
                        </h2>
                        <p className="text-lg font-inter text-richblack-100 leading-[26px] font-normal not-italic">
                            A verification code has been sent to you. Enter the code below
                        </p>
                    </div>
                    <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
                        <OtpInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input 
                                {...props} 
                                placeholder="-"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                            />}
                            containerStyle={{justifyContent: 'space-evenly'}}
                        />
                        
                        <button type="submit" className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 hover:scale-95 transition-all duration-200">
                            Verify Email
                        </button>
                    </form>
                    <div className="flex items-center justify-between">
                        <NavLink to='/signup'>
                            <div className="flex gap-4 text-richblack-5 items-center cursor-pointer">
                                <FaArrowLeftLong className="w-[18px] h-[18px]"/>
                                <p className="text-base font-medium font-inter not-italic">
                                    Back to login
                                </p>
                            </div>
                        </NavLink>

                        <div onClick={() => sendOTP(email, navigate, dispatch)} 
                        className="flex gap-4 text-blue-100 items-center cursor-pointer">
                            <RxCountdownTimer className="w-[18px] h-[18px]"/>
                            <p className="text-base font-medium font-inter not-italic">
                                Resend it
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail


import { setLoading, setToken } from "../../slices/authSlice";
import { apiconnector } from "../apiconnector";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast";
import { setUser } from "../../slices/userSlice";


// SEND OTP FUNCTION
export const sendOTP = async(email, navigate, dispatch) => {
    let verificationToast ;
    try {
        dispatch(setLoading(true)) ;
        verificationToast = toast.loading("Sending OTP for Email Verification") ;
        
        const response = await apiconnector("POST", endpoints.SEND_OTP, {email}) ;

        console.log("sendotp response : ", response) ;

        // error message
        if(!response?.data?.success) {
            throw new Error(response.data.message)
        }

        toast.dismiss(verificationToast) ;
        toast.success("OTP Sent Successfully") ;
        navigate("/verify-email") ;
    } catch (error) {
        console.log("error from authAPI sendotp : ", error) ;
        toast.dismiss(verificationToast) ;
        toast.error(error.response.data.message) ;
    }
    dispatch(setLoading(false)) ;
   
}

// SIGNUP FUNCTION
export const signup = async(firstName, lastName, email, accountType, createPassword, confirmPassword, phoneNumber, otp, navigate, setLoading, dispatch) => {
    // console.log("in authapi") ;
    dispatch(setLoading(true)) ;

    try {
        const response = await apiconnector("POST", endpoints.SIGNUP, {
                                                                        firstName,
                                                                        lastName,
                                                                        email,
                                                                        accountType,
                                                                        createPassword,
                                                                        confirmPassword,
                                                                        phoneNumber,
                                                                        otp
                                                                    } );
     console.log("signup response : ", response ) ;

      // error message
     if(!response?.data?.success) {
        throw new Error(response.data.message)
     }

     toast.success("Signup Successful") ;
     navigate('/login') ;
    } catch (error) {
        console.log("error from authAPI signup : ", error) ;
        toast.error(error.response.data.message) ;
    }

    dispatch(setLoading(false)) ;
}

// LOGIN FUNCTION 
export const login = async(email, password, navigate, dispatch) => {
    let verificationToast ;
    try {
        dispatch(setLoading(true)) ;
        verificationToast = toast.loading("Please wait while login") ;

        const response = await apiconnector("POST", endpoints.LOGIN, { email, password }) ;

        console.log("login response : ", response) ;

         // error message
        if(!response?.data?.success) {
            throw new Error(response.data.message)
        }

        toast.dismiss(verificationToast) ;
        toast.success('Login Successful') ;

        dispatch(setToken(response.data.token)) ;
        dispatch(setUser(response.data.user)) ;
        console.log("printing user : ", response.data.user) ;
        sessionStorage.setItem("token", JSON.stringify(response.data.token)) ;

        navigate('/') ;
      
    } catch (error) {
        console.log("error from authAPI login : ", error) ;
        toast.dismiss(verificationToast) ;
        toast.error(error.response.data.message) ;
    }
    dispatch(setLoading(false)) ;
}

// sendResetPasswordToken 
export const sendResetPasswordToken = async(email, dispatch, setSentMail) => {
    let tokenToast ;
    try {
        dispatch(setLoading(true)) ;
        tokenToast = toast.loading("Sending reset password link") ;
        
        const response = await apiconnector("POST", endpoints.RESET_PASSWORD_TOKEN, { email }) ;

        console.log("reset password token response : ", response) ;

        toast.dismiss(tokenToast) ;
        toast.success(response.data.message) ;

    } catch (error) {
        console.log("error from authAPI reset pass token : ", error) ;
        toast.error(error.response.data.message) ;
    }
    dispatch(setLoading(false)) ;
    setSentMail(true) ;
}
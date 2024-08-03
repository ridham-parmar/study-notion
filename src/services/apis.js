const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SEND_OTP : BASE_URL + '/auth/sendotp',
    SIGNUP : BASE_URL + '/auth/signup',
    LOGIN : BASE_URL + '/auth/login',
    RESET_PASSWORD_TOKEN : BASE_URL + '/profile/reset-password-token'
}

// CATEGORIES ENDPOINTS
export const categories = {
    CATEGORIES_API : BASE_URL + '/course/getAllCategory'
}
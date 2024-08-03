import axios from 'axios'

 const apiInstance = axios.create({}) ;

export const apiconnector = (method, url, bodyData, headers, params) => {
    // console.log("bodydata : ", bodyData)
    return apiInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null
    })
}
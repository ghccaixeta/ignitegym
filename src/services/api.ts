import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.3.61:3333'
})

api.interceptors.response.use((response) => {
    console.log("RESPONSE = ", response)
    return response
}, (error) => {
    console.log("RESPONSE ERROR = ", error)
    return Promise.reject(error)
})

export { api }
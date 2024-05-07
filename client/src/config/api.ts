import axios, { AxiosError, AxiosResponse } from 'axios'
import style_loader from "../components/loading/loader.module.css"
import toast from '../helper/toast'


const devPorts = '3000'
let baseURL = ''
let baseIMG = ''
let baseICON = ''
let baseSong = ''
if (devPorts === window.location.port) {
    baseURL = `${window.location.origin.replace(devPorts, '8000')}/api/`
    baseIMG = `${window.location.origin.replace(devPorts, '8000')}/`
    baseSong = `${window.location.origin.replace(devPorts, '8000')}/uploads/song`
    baseICON = `${window.location.origin.replace(devPorts, '3000')}/`
}
else {
    baseURL = `${window.location.origin}/api/`
    baseIMG = `${window.location.origin}/`
}
const ignoreLoaders = [
    '/user/'
]
function getToken() {
    const token = localStorage.getItem('token') || '' as string
    if (token) return JSON.parse(token)
    return false
}
function getTokenHeader() {
    return `Bearer ${getToken()}`
}
const request = axios.create({
    baseURL: baseURL
})
request.interceptors.request.use((config: any) => {
    if (config.method === 'post' && !ignoreLoaders.includes(config.url || '')) {
        const loader = document.querySelector(`.${style_loader['loader']}`)
        loader?.classList.add(`${style_loader['loading']}`)
    }

    if (getToken()) {
        config.headers.Authorization = getTokenHeader()
    }
    config.headers['Content-Type'] = 'multipart/form-data'
    return config
})

request.interceptors.response.use(
    function (response: any) {
        if (response.data) {
            if (response.data.msg && response.data.success === true && response.headers['content-type'] === 'application/json') {
                const loader = document.querySelector(`.${style_loader['loader']}`)
                if (loader) loader?.classList.remove(`${style_loader['loading']}`)
                if (!response.request.responseURL.includes('getuser') && !ignoreLoaders.includes(response.config.url)) {
                    toast.success(response.data.msg)
                }
                return response
            } else if (response.data.msg && response.data.success === false && response.headers['content-type'] === 'application/json') {
                const loader = document.querySelector(`.${style_loader['loader']}`)
                if (loader) loader?.classList.remove(`${style_loader['loading']}`)
                if (!response.request.responseURL.includes('getuser') && !ignoreLoaders.includes(response.config.url)) {
                    toast.error(response.data.msg)
                }
            } else {
                return response
            }
        }
    },
    function (error: AxiosError) {
        const loader = document.querySelector(`.${style_loader["loader"]}`)
        if (loader) loader?.classList.remove(style_loader['loading'])
        if (error.message === 'Network Error') {
            toast.error(error.message)
            return Promise.reject(error)
        }
        const response = error.response as AxiosResponse
        if (response.data) {
            if (response.data.message && response.headers['content-type'] === 'application/json' && !response.request.responseURL.includes('getuser')) {
                toast.error(response.data.message)
            }
        }
        if (response.data.msg && response.data.success === 'fail' && response.headers['content-type'] === 'application/json') {
            toast.error(response.data.msg)
        }
        return Promise.reject(error)
    }
);
export {
    baseIMG,
    baseICON,
    baseURL,
    baseSong,
    getToken,
    getTokenHeader,
}
export default request

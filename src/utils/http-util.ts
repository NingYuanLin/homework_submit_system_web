import axios from 'axios'

/**
 * @author 真心
 * @date 2021/2/2 21:03
 * @email qgzhenxin@qq.com
 * @description axios 封装
 */

// 创建axios服务
const service = axios.create({
    timeout: 1000 * 300, // 超时 300s
    withCredentials: false // 跨域携带cookie
})

// 获取当前协议 如 `http:`
let protocol: string = window.location.protocol
// 获取当前页面地址，如localhost:8080
let hostname: string = window.location.hostname
let backEndBasicUrl = protocol + '//' + hostname + ':3600/'
console.log(backEndBasicUrl)


class HttpUtil {
    /**
     * 发送Get请求
     * @param url 链接
     * @param params 参数
     * @param headers
     * @param onUploadProgress
     * @return 数据
     */
    static async get(url: string, params: any = {}, headers: any = {}) {
        url = backEndBasicUrl + url;
        params.t = Date.now()
        try {
            const data = await service.get(url, {
                params: params,
                headers,
            })
            return data.data
        } catch (e: any) {
            const error = e.response
            if (error) {
                return error.data
            }
            return e.message
        }
    }

    /**
     * 发送POST请求
     * @param url 链接
     * @param params 参数
     * @param headers
     * @param onUploadProgress
     * @return 数据
     */
    static async post(url: string, params: any = {}, headers: any = {}) {
        url = backEndBasicUrl + url;
        params.t = Date.now()
        try {
            const data: any = await service.post(url, params, {
                headers,
            },)
            console.log(data)
            return data.data
        } catch (e: any) {
            console.log(e)
            const error = e.response
            if (error) {
                return error.data
            }
            return e.message
        }
    }


    /**
     * 发送POST请求
     * TODO: 这个函数怎么和post函数写成一个啊日
     * @param url 链接
     * @param params 参数
     * @param headers
     * @param onUploadProgress
     * @return 数据
     */
    static async postWithOnUploadProgress(url: string, onUploadProgress: (progressEvent: any) => void, params: any = {}, headers: any = {}) {
        url = backEndBasicUrl + url;
        params.t = Date.now()
        try {
            const data = await service.post(url, params, {
                headers,
                onUploadProgress
            })
            console.log(data)
            return data.data
        } catch (e: any) {
            console.log(e)
            const error = e.response
            if (error) {
                return error.data
            }
            return e.message
        }
    }


}

export default HttpUtil

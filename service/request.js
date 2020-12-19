/**
 * @Description: request demo for uniapp
 * @Author: losting
 * @Date: 2020-12-12 17:16:54
 * @LastEditors: losting
 * @LastEditTime: 2020-12-14 21:20:11
 */

const REQUEST_URL = 'http://192.168.42.59:3000/'
// const REQUEST_URL = 'http://bangumi.losting.net/'
const token = uni.getStorageSync('token')


const request = async (methods, url, data = {}, hasToken) => {

    // uni.showLoading({
    //     title: 'Loading...';
    //     mask: true
    // })

    const [err, res] = await uni.request({
        header: {
            Accept: 'application/json',
            'content-type': 'application/json',
            // 'content-type': 'application/x-www-form-urlencoded',
            token: hasToken && token
        },
        timeout: 8000,
        method: methods,
        url:
            // #ifdef H5
            `/${url}`,
            // #endif

            // #ifndef H5
            `${REQUEST_URL}${url}`,
            // #endif
        data: data
    })

    if(err) {
        // #ifdef APP-PLUS
        plus.nativeUI.toast(err.errMsg || err)
        // #endif

        // #ifndef APP-PLUS
        uni.showToast({
            title: err.errMsg || err,
            icon: 'none'
        })
        // #endif
        return
    }

    try {
        const statusCode = res.statusCode
        if (statusCode !== 200) {
            switch(statusCode) {
                case 500:
                    throw new Error('服务器错误！')
                    break
                case 404:
                    throw new Error('请求地址不存在！')
                    break
                case 403:
                    throw new Error('没有权限！')
                    break
                case 401:
                    throw new Error('未登录！')
                    break
                default:
                    throw new Error('未知错误！')
            }
        } else {
            const resCode = res.data.code // 返回状态码
            const resMsg = res.data.msg   // 返回提示信息
            if (resCode !== 200) {
                throw new Error(resMsg)
            } else {
                return res.data.data
            }
        }
    } catch (err) {
        // #ifdef APP-PLUS
        plus.nativeUI.toast(err.message || err)
        // #endif

        // #ifndef APP-PLUS
        uni.showToast({
            title: err.message || err,
            icon: 'none'
        })
        // #endif
    } finally {
        // uni.hideLoading()
    }
}

export default request

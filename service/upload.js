const showErr = (msg,mask) => {
    uni.showToast({
        title: msg,
        icon: 'none',
        mask: mask && true,
        duration: 1500
    })
}

const baseURL = 'https://www.wpexr.com/api/'
const token = uni.getStorageSync('token')

const config = {
    header: {
        'Accept': 'application/json',
        // 'content-type': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        'token': token
    },
    timeout: 8000
}
/**
 * @param {string}  = [methods] 请求方式
 * @param {string}  = [url]  请求地址
 */
const upload = async function(filePath, name) {
    uni.showLoading({
        title: '上传中...',
        mask: true
    })

    let [err, res] = await uni.uploadFile({
        ...config,
        url:
            // #ifdef H5
            '/' + url,
            // #endif

            // #ifndef H5
            baseURL + url,
            // #endif

        filePath: filePath,
        name: name,
        formData: fromData || null
    })

    if(err) {
        showErr(err.message)
        return false
    }

    try {
        const statusCode = res.statusCode
        if(statusCode !== 200) {
            if(statusCode === 500) {
                throw new Error('服务器错误！')
            }else if(statusCode === 404) {
                throw new Error('请求地址不存在！')
            } else if(statusCode === 403) {
                throw new Error('没有权限！')
            } else {
                throw new Error('未知错误！')
            }
        } else {
            const resData = JSON.parse(res.data)   // 返回数据
            if(resData.err !== 0) {
                throw new Error(resData.msg)
            } else {
                return resData
            }
        }
    }
    catch(err) {
        showErr(err.message || '未知错误！')
    }
    finally {
        uni.hideLoading()
    }
}

export default upload

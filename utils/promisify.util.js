/**
 * 将callback形式的API转换成支持Promise的形式
 */
export function promisify(api) => {
    return (options, ...params) => {
        return new Promise((resolve, reject) => {
            const extras = {
                success: resolve,
                fail: reject
            }
            api({ ...options, ...extras }, ...params)
        })
    }
}
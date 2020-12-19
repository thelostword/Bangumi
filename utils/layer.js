module.exports = {
    msg(msg,mask) {
        // #ifdef APP-PLUS
        plus.nativeUI.toast(msg)
        // #endif
        
        // #ifndef APP-PLUS
        uni.showToast({
            title: msg,
            icon: 'none',
            mask: mask && true,
            duration: 1500
        })
        // #endif
    },
    err(msg) {
        uni.showModal({
            title: '提示',
            content: msg,
            showCancel: false
        })
    },
    modal(title,msg,next) {
        uni.showModal({
            title: title,
            content: msg,
            success: (res) => {
                if(res.confirm) {
                    typeof(next) == 'function' && next()
                }
            }
        })
    }
}

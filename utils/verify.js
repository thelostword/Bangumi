/**
 * 验证类
 */
module.exports = {
    // 是否为空
    isEmpty(str) {
        return str.trim() == ''
    },

    // 验证phone
    isPhone(str) {
        const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
        return reg.test(str)
    },

    // 验证Email地址
    isEmail(str) {
        const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        return reg.test(str)
    },

    /**
     * 验证密码设置
     * 0 密码不合法
     * 1 密码强度 弱
     * 2 密码强度 中
     * 3 密码强度 强
     */
    isPassWord(str) {
        let lv1 = /^\d{6,16}$|^[a-zA-Z]{6,16}$/
        lv2 = /^(?!\d+$)(?![a-zA-Z]+$)\w{6,16}$/
        lv3 = /[\w^%&',;=?$\x22]{6,16}/
        if (lv1.test(str)) {
            return 1
        } else if (lv2.test(str)) {
            return 2
        } else if (lv3.test(str)) {
            return 3
        } else {
            return 0
        }
    },

    // 验证18位身份证号码
    isIDCard(str) {
        const reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
        return reg.test(str)
    },

    // 验证中文姓名
    isName_cn(str) {
        const reg = /^[\u4e00-\u9fa5]{2,4}$/
        return reg.test(str)
    }
}

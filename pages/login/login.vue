<template>
    <view class="login">
        <image :src="logo" mode=""></image>
        <input type="text" v-model="email" placeholder="邮箱" />
        <input type="password" v-model="password" placeholder="密码" @focus="handleFocus" @blur="handleBlur" />
        <view class="login-captcha" v-if="captchaStatus">
            <input type="text" v-model="captcha" placeholder="验证码" />
            <image :src="captcha_img" mode="heightFix" @click="changeCaptcha"></image>
        </view>
        <button class="login-submit" @click="handleLogin" :loading="isLogin" :disabled="isLogin">
            登 录
        </button>
    </view>
</template>

<script>
    import logo1 from '../../static/logo1.png'
    import logo2 from '../../static/logo2.png'
    import { isEmail } from '../../utils/verify.js'
    import { login,captcha } from '../../service/api.js'
    export default {
        data() {
            return {
                email: '',
                password: '',
                captcha: '',
                cookie: '',
                formhash: '',
                captcha_img: '',
                captchaStatus: false,
                logo: logo1,
                isLogin: false
            }
        },
        computed: {
            listenInput() {
                const { email, password } = this
                return { email, password }
            }
        },
        watch: {
            listenInput() {
                if(this.captchaStatus) {
                    return
                }
                if(this.email && this.password) {
                    this.getCaptcha()
                    this.captchaStatus = true
                }
            }
        },
        methods: {
            async getCaptcha() {
                let res = await captcha()
                this.cookie = res.cookie
                this.formhash = res.formhash
                let arrayBuffer = new Uint8Array(res.captcha.data)
                this.captcha_img = 'data:image/png;base64,' + uni.arrayBufferToBase64(arrayBuffer)
            },
            // 登录
            handleLogin() {
                if(!isEmail(this.email)) {
                    this.$layer.msg('请输入正确的邮箱！')
                    return
                }
                if(!this.password) {
                    this.$layer.msg('请输入密码！')
                    return
                }
                if(!this.captcha) {
                    this.$layer.msg('请输入登录验证码！')
                    return
                }
                this.doLogin()
            },
            // 登录请求
            async doLogin() {
                if(this.isLogin) {
                    return
                }
                this.isLogin = true
                let res = await login({
                    email: this.email,
                    password: this.password,
                    captcha: this.captcha,
                    cookie: this.cookie,
                    formhash: this.formhash
                })
                if(res && res.includes('chii_auth=')) {
                    uni.setStorageSync('token', res)
                    this.$layer.msg('登录成功!')
                    setTimeout(() => {
                        uni.navigateBack()
                    }, 1000)
                } else {
                    this.$layer.msg('登录出错!')
                }
                this.isLogin = false
            },
            // 密码输入框获得焦点
            handleFocus() {
                this.logo = logo2
            },
            // 密码输入框失去焦点
            handleBlur() {
                this.logo = logo1
            },
            // 更换验证码图片
            changeCaptcha() {
                this.getCaptcha()
            }
        }
    }
</script>

<style lang="scss" scoped>
.login {
    width: 100vw;
    height: 80vh;
    padding: 80rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    >* {
        margin-bottom: 20rpx;
    }
    >image {
        width: 144rpx;
        height: 144rpx;
        margin-bottom: 100rpx;
    }
    >input {
        width: 100%;
    }
    input {
        height: 80rpx;
        line-height: 80rpx;
        box-sizing: border-box;
        background-color: rgba($color: #000000, $alpha: .1);
        padding: 0 30rpx;
        border-radius: 5rpx;
        font-size: 30rpx;
        color: $color-3;
    }
    &-captcha {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        >image {
            height: 80rpx;
            margin-left: 30rpx;
        }
        >input {
            flex: 1;
            min-width: 336rpx;
        }
    }
    &-submit {
        height: 80rpx;
        width: 100%;
        margin-top: 50rpx;
        line-height: 80rpx;
        color: $color-white;
        text-align: center;
        font-size: 30rpx;
        background-color: $color-theme;
        border-radius: 5rpx;
    }
}
</style>

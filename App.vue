<script>
    import {
        update
    } from './service/api.js'
    export default {
        onLaunch: function() {
            // #ifdef APP-PLUS
            this.autoUpdate()
            // #endif
        },
        onShow: function() {},
        onHide: function() {},
        methods: {
            // 自动更新
            autoUpdate() {
                const _this = this
                plus.runtime.getProperty(plus.runtime.appid, async widgetInfo => {
                    let res = await update(widgetInfo)
                    if(!res.update || !res.url) {
                        this.$layer.msg('已是最新版本！')
                        return
                    }
                    uni.showModal({
                        title: '更新提醒',
                        content: res.note,
                        confirmText: '立即更新',
                        success: result => {
                            if (result.confirm) {
                                uni.downloadFile({
                                    url: res.url,
                                    success: downloadResult => {
                                        if (downloadResult.statusCode === 200) {
                                            plus.runtime.install(downloadResult.tempFilePath, {
                                                force: false
                                            }, () => {
                                                plus.runtime.restart()
                                            }, err => {
                                                uni.showModal({
                                                    title: '提示',
                                                    content: err || '更新失败',
                                                    showCancel: false
                                                })
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "./common/iconfont.css";

    view {
        box-sizing: border-box;
    }

    @import "./common/head-tab.scss";
    /*每个页面公共css */
</style>

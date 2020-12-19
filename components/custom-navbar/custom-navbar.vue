<template>
    <view class="navbar">
        <view class="navbar-custom">
            <!-- 系统状态栏 -->
            <view class="navbar-statusbar" :style="{height:statusBarHeight+'px'}"></view>
            <!-- 自定义导航栏 -->
            <view class="navbar-wrap" :style="{height:navBarHeight+'px', width:navBarWidth+'px'}">
                <view class="navbar-wrap-left">
                    <Icon name="menu" size="52" @click.native="openSide"/>
                    <text class="navbar-text">主页</text>
                </view>
                <view class="navbar-wrap-right">
                   <menu-btn position="center" type="icon" :list="menuList">
                        <Icon name="tongzhi" size="42"/>
                    </menu-btn>
                    <Icon name="sousuo" size="42" @click.native="goSearch"/>
                </view>
            </view>
        </view>
        <!-- 占位标签 -->
        <view :style="{height:(statusBarHeight+navBarHeight)+'px'}"></view>
        <sidebar></sidebar>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                statusBarHeight: 20,
                navBarHeight: 50,
                navBarWidth: '',
                menuList: [{
                    type: 0,
                    name: '收件箱'
                },{
                    type: 1,
                    name: '电波提醒'
                }]
            }
        },
        created() {
            this.setCustom()
        },
        methods: {
            // 自定义导航栏设置
            setCustom() {
                const _this = this
                uni.getSystemInfo({
                    success: e => {
                        // #ifndef MP
                        _this.statusBarHeight = e.statusBarHeight
                        // #endif
                        // #ifdef MP-WEIXIN
                        _this.statusBarHeight = e.statusBarHeight
                        const custom = wx.getMenuButtonBoundingClientRect()
                        _this.navBarHeight = custom.bottom + custom.top - e.statusBarHeight*2
                        _this.navBarWidth = custom.left
                        // #endif
                        // #ifdef MP-ALIPAY
                        _this.statusBarHeight = e.statusBarHeight
                        _this.navBarHeight = e.titleBarHeight;
                        // #endif
                    }
                })
            },
            // 打开/关闭侧边栏
            openSide() {
                this.$store.commit('setSideBarStatus', true)
            },
            // 跳转到搜索页面
            goSearch() {
                uni.navigateTo({
                    url: "/pages/search/search"
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.navbar {
    &-custom {
        position: fixed;
        top: 0;
        left: 0;
        z-index: $tab-index;
        background-color: $color-theme;
    }
    &-statusbar {
        width: 100vw;
        background-color: $color-theme;
    }
    &-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100vw;
        padding: 0 30rpx;
        background-color: $color-theme;
        color: $color-white;
        >view {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        &-left {
            >text {
                &:last-child {
                    margin-left: 20rpx;
                }
            }
        }
        &-right {
            >*{
                &:not(:last-child) {
                    margin-right: 50rpx;
                }
            }
        }
    }
    &-text {
        font-weight: bold;
        font-size: 38rpx;
    }
}
</style>

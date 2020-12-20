<template>
    <view class="sidebar"
        @touchstart="handletouchstart"
        @touchend="handletouchend"
        :style="{visibility: showSideBar ? 'visible' : 'hidden'}"
    >
        <view class="sidebar-mask"
            @click="closeSide"
            :style="{backgroundColor: showSideBar ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,0)'}"
        ></view>
        <view class="sidebar-wrap"
            :style="{transform: showSideBar ? 'translateX(75vw)' : 'translateX(0)'}"
        >
            <view class="sidebar-user">
                <image :src="userInfo && userInfo.avatar" mode="widthFix"></image>
                <view>
                    <text>{{ userInfo && userInfo.nick_name }}</text>
                    <text>@{{ userInfo && userInfo.name }}</text>
                </view>
                <text>{{ userInfo && userInfo.sign }}</text>
            </view>
            <view class="sidebar-menu">
                <view class="sidebar-menu-item"
                    v-for="(item,index) in menuList"
                    :key="index"
                    @click="toPage(item.link)"
                    :class="item.link === 'timeline' && 'active'"
                >
                    <Icon :name="item.icon" size="44"/>
                    <text>{{ item.name }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import { menuList } from './config.js'
    export default {
        data() {
            return {
                startX: 0,
                menuList: menuList
            }
        },
        computed: {
            showSideBar() {
                return this.$store.state.sideBarStatus
            },
            userInfo() {
                return this.$store.state.userInfo
            }
        },
        methods: {
            // 关闭侧边导航
            closeSide() {
                this.$store.commit('setSideBarStatus', false)
            },
            handletouchstart(e) {
                this.startX = e.changedTouches[0].pageX
            },
            handletouchend(e) {
                let endX = e.changedTouches[0].pageX
                if((this.startX - endX) > 70) {
                    this.closeSide()
                }
            },
            // 跳转页面
            toPage(url) {
                this.closeSide()
                if(url === 'timeline') {
                    return
                }
                uni.navigateTo({
                    url: `/pages/${url}/${url}`
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: $side-bar;
        &-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($color: #000000, $alpha: .5);
            transition: all .25s;
        }
        &-wrap {
            position: absolute;
            top: 0;
            left: -76vw;
            width: 76vw;
            height: 100vh;
            padding-left: 1vw;
            background-color: $color-white;
            transition: all .25s;
        }
        &-user {
            width: 100%;
            height: 25vh;
            background-color: $color-theme;
            padding: 40rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            >image {
                width: 150rpx;
                height: 150rpx;
                border-radius: 50%;
            }
            >view {
                margin-top: 10rpx;
                color: $color-white;
                font-size: 36rpx;
                font-weight: 400;
                >text {
                    &:last-child {
                        font-size: 28rpx;
                        color: rgba($color: $color-white, $alpha: .8);
                        margin-left: 10rpx;
                    }
                }
            }
            >text {
                color: $color-white;
                margin-top: 15rpx;
                font-size: 26rpx;
                @include single-text();
            }
        }
        &-menu {
            width: 100%;
            height: 75vh;
            padding: 20rpx 0;
            &-item {
                display: flex;
                align-items: center;
                padding: 30rpx 40rpx;
                color: $color-7;
                >text:last-child {
                    margin-left: 60rpx;
                    font-size: 32rpx;
                    font-weight: bold;
                }
                &.active {
                    background-color: rgba($color: #000000, $alpha: .1);
                    color: $color-theme;
                }
            }
        }
    }
</style>

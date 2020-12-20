<template>
    <view>
        <custom-navbar></custom-navbar>
        <view v-if="isLogin" class="head-tab">
            <view class="head-tab__container">
                <view class="head-tab__wrap">
                    <view class="head-tab__btn">
                        <menu-btn :list="menuList" @click="getCurMenuIndex"></menu-btn>
                    </view>
                    <view class="head-tab__menu">
                        <scroll-tabbar :listIndex="curTabIndex" :list="navTab" @click="getCurIndex"/>
                    </view>
                </view>
            </view>
        </view>
        <view class="collect" v-if="isLogin"
            @touchstart="handletouchstart"
            @touchend="handletouchend"
        >
            <view class="collet-list" v-if="collectionData && collectionData.length">
                <view class="collect-item" v-for="(item,index) in collectionData" :key="index">
                    <view class="collect-item__cover">
                        <image :src="item.cover" mode="widthFix"></image>
                    </view>
                    <view class="collect-item-inner">
                        <view class="collect-item-inner__title">
                            <text>{{ item.name_cn }}</text>
                            <text>{{ item.name }}</text>
                        </view>
                        <view class="collect-item-inner__info" v-if="item.sub_info">
                            {{ item.sub_info }}
                        </view>
                       <!-- <view class="collect-item-inner__tag" v-if="item.tag">
                            {{ item.tag }}
                        </view>
                        <score size="20" v-if="item.score" :score="item.score"/>
                        <view class="collect-item-inner__comment" v-if="item.comment">
                            {{ item.comment }}
                        </view> -->
                        <view class="collect-item-inner__date">
                            {{ item.date }}
                        </view>
                    </view>
                </view>
            </view>
            <nodata v-else></nodata>
        </view>
        <nologin v-else></nologin>
    </view>
</template>

<script>
    import { menuList, navTab } from './config.js'
    import { collection, user } from '../../service/api.js'
    export default {
        data() {
            return {
                isLogin: false,
                menuList: menuList,
                navTab: navTab,
                curTabIndex: 0,
                curType: 'anime',
                userName: '',
                innerType: 'do',
                collectionData: [],
                lastData: [],
                isLoading: false,
                curPage: 1,
                startX: 0
            }
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo
            }
        },
        onLoad() {
            // uni.startPullDownRefresh()
        },
        onShow() {
            if(!this.isLogin) {
                uni.startPullDownRefresh()
            }
        },
        watch: {
            curTabIndex() {
                this.curType = navTab[this.curTabIndex].type
                uni.startPullDownRefresh()
            }
        },
        methods: {
            // 获取用户信息
            async getUserInfo() {
                let res = await user()
                if(res) {
                    this.$store.commit('setUserInfo', res)
                } else {
                    this.$layer.msg('用户信息获取失败，请重试')
                }
            },
            // 获取收藏数据
            async initData() {
                if(this.isLoading) {
                    return
                }
                this.isLoading = true
                let res = await collection({
                    type: this.curType,
                    name: this.userInfo.name,
                    page: this.curPage,
                    event: this.innerType
                })
                this.collectionData = this.collectionData.concat(res)
                this.lastData = res
                this.isLoading = false
            },
            // 获取当前tab索引
            getCurIndex(e) {
                if(this.isLoading) {
                    return
                }
                this.curTabIndex = e.index
            },
            // menu菜单点击事件
            async getCurMenuIndex(e) {
                if(this.innerType === e.type) {
                    return
                }
                if(this.isLoading) {
                    return
                }
                this.innerType = e.type
            },
            handletouchstart(e) {
                this.startX = e.changedTouches[0].pageX
            },
            handletouchend(e) {
                if(this.isLoading) {
                    return
                }
                let endX = e.changedTouches[0].pageX
                if((this.startX - endX) > 120) {
                    // console.log('向左滑动')
                    if(this.curTabIndex<this.navTab.length-1) {
                        this.curTabIndex++
                    }
                } else if((this.startX - endX) < -120) {
                    // console.log('向右滑动')
                    if(this.curTabIndex > 0) {
                        this.curTabIndex--
                    }
                }
            },
            // 加载更多（下一页）
            async loadMore() {
                if(this.isLoading) {
                    return
                }
                if(this.lastData.length === 0) {
                    this.$layer.msg('没有更多内容了！')
                    return
                }
                uni.showLoading({
                    title: 'Loading...',
                    mask: true
                })
                this.curPage ++
                await this.initData()
                uni.hideLoading()
            }
        },
        // 下拉刷新事件
        async onPullDownRefresh() {
            if(this.isLoading) {
                return
            }
            if(!this.isLogin) {
                if(!uni.getStorageSync('token')) {
                    uni.stopPullDownRefresh()
                    return
                }
                this.isLogin = true
                await this.getUserInfo()
            }
            this.curPage = 1
            this.collectionData = []
            await this.initData()
            setTimeout(() => {
                uni.stopPullDownRefresh()
            }, 500)
        },
        // 页面触底事件
        onReachBottom() {
            this.loadMore()
        }
    }
</script>

<style lang="scss" scoped>
@import "./collection.scss";
</style>

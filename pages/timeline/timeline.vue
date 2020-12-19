<template>
    <view>
        <custom-navbar><Icon name="tongzhi" size="42"/></custom-navbar>
        <view class="head-tab">
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

        <view class="timeline"
            @touchstart="handletouchstart"
            @touchend="handletouchend"
        >
            <view class="timeline-list" v-for="(item,index) in timeLineData" :key="index">
                <view class="timeline-date">{{ item.date }}</view>
                <view class="timeline-item"  v-for="(jtem,jndex) in item.info" :key="jndex">
                    <view class="timeline-item-avatar">
                        <image v-if="innerType !== 2" :src="jtem.user_avatar | addUrl"></image>
                    </view>
                    <view class="timeline-item-info">
                        <view class="timeline-item-info__list">
                            <view class="timeline-item-info__link">{{ jtem.user_nickname }}</view>
                            <text>{{ jtem.status }}</text>
                            <view class="timeline-item-info__link" v-for="(ktem,kndex) in jtem.eps" :key="kndex">
                                {{ ktem.name }}
                            </view>
                            <text>{{ jtem.status_tip }}</text>
                        </view>
                        <view class="timeline-item-info__sub" v-if="jtem.info_sub">{{ jtem.info_sub }}</view>
                        <view class="timeline-item-info__sub" v-if="jtem.say">{{ jtem.say }}</view>
                        <view class="timeline-item-info__sub collect" v-if="jtem.collect_info">{{ jtem.collect_info }}</view>
                        <view class="timeline-item-info__imgs" v-if="jtem.imgs.length">
                            <block v-for="(ktem,kndex) in jtem.imgs" :key="kndex">
                                <image :src="ktem.url" mode="heightFix"></image>
                            </block>
                        </view>
                        <score size="20" v-if="jtem.score" :score="jtem.score"/>
                        <view class="timeline-item-info__time">{{ jtem.time }}</view>
                    </view>
                    <view class="timeline-item-img" v-if="jtem.img">
                        <image :src="jtem.img" mode="heightFix"></image>
                    </view>
                </view>
            </view>
            <nodata v-if="!timeLineData || (timeLineData && !timeLineData.length)"></nodata>
        </view>
    </view>
</template>

<script>
    import { timeline,login } from '../../service/api.js'
    import { menuList,navTab } from './config.js'
    export default {
        data() {
            return {
                timeLineData: [],
                lastData: [], // 更具内容条数判断是否还有下一页
                curTabIndex: 0,
                curType: '',
                innerType: 0,
                userName: '',
                curPage: 1,
                isLoading: false,
                startX: 0,
                menuList: menuList,
                navTab: navTab,
                isLogin: false
            }
        },
        onShow() {
            if(uni.getStorageSync('token')) {
                this.isLogin = true
                this.userName = uni.getStorageSync('_userInfo').user_name
            }
        },
        onLoad() {
            uni.startPullDownRefresh()
        },
        watch: {
            async curTabIndex() {
                this.curType = this.navTab[this.curTabIndex].type
                uni.startPullDownRefresh()
            }
        },
        methods: {
            // 获取时间胶囊数据
            async initData() {
                if(this.isLoading) {
                    return
                }
                this.isLoading = true
                let res = await timeline(this.innerType !== 0 ? true : false, {
                    type: this.curType,
                    page: this.curPage,
                    user_name: this.userName,
                    self: this.innerType === 2
                })
                this.timeLineData = this.timeLineData.concat(res.list)
                this.lastData = res.list
                // if(!uni.getStorageSync('_userInfo') && res.userInfo.user_name) {
                //     let userInfo = {}
                //     userInfo.user_name = res.userInfo.user_name.match(/\/(\w*)$/)[1]
                //     userInfo.user_avatar = res.userInfo.user_avatar
                //     uni.setStorageSync('_userInfo', userInfo)
                // }
                this.isLoading = false
            },
            // 获取当前时间胶囊索引
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
                if(e.type!==0 && !this.isLogin) {
                    this.$layer.msg('请先登录！')
                    return
                }
                if(this.isLoading) {
                    return
                }
                if(e.type===2 && !this.isLogin) {
                    return
                }
                this.innerType = e.type
                uni.startPullDownRefresh()
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
                    if(this.curTabIndex>0) {
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

        // 页面刷新
        async onPullDownRefresh() {
            if(this.isLoading) {
                return
            }
            this.curPage = 1
            this.timeLineData = []
            await this.initData()
            setTimeout(() => {
                uni.stopPullDownRefresh()
            }, 500)
        },

        // 页面触底事件
        onReachBottom() {
            if(this.innerType === 0) {
                this.$layer.msg('没有更多内容了！')
                return
            }
            this.loadMore()
        }
    }
</script>

<style lang="scss" scoped>
@import "./timeline.scss";
</style>

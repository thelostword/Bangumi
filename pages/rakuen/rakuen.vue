<template>
    <view>
        <custom-navbar></custom-navbar>
        <view class="head-tab">
            <view class="head-tab__container">
                <view class="head-tab__wrap">
                    <scroll-tabbar :listIndex="curTabIndex" :list="navTab" @click="getCurIndex"/>
                </view>
            </view>
        </view>
        <view class="rakuen"
            @touchstart="handletouchstart"
            @touchend="handletouchend"
        >
            <view class="rakuen-list">
                <view class="rakuen-item" v-for="(item,index) in rakuenData" :key="index">
                    <view class="rakuen-item-avatar">
                        <image :src="item.avatar | addUrl"></image>
                    </view>
                    <view class="rakuen-item-inner">
                        <view class="rakuen-item-inner__title">
                            <text>{{ item.title }}</text>
                            <text>{{ item.reply }}</text>
                        </view>
                        <view class="rakuen-item-inner__from">
                            <text v-if="item.from">{{ item.from }}</text>
                            <text>{{ item.time }}</text>
                        </view>
                    </view>
                </view>
            </view>
            <nodata v-if="!rakuenData || (rakuenData && !rakuenData.length)"></nodata>
        </view>
    </view>
</template>

<script>
    import { rakuen } from '../../service/api.js'
    export default {
        data() {
            return {
                curTabIndex: 0,
                startX: 0,
                curType: '',
                rakuenData: [],
                isLoading: false,
                navTab: [{
                    name: '全部',
                    type: ''
                },{
                    name: '小组',
                    type: 'group'
                },{
                    name: '条目',
                    type: 'subject'
                },{
                    name: '章节',
                    type: 'ep'
                },{
                    name: '人物',
                    type: 'mono'
                }]
            }
        },
        onLoad() {
            uni.startPullDownRefresh()
        },
        watch: {
            async curTabIndex() {
                this.curType = this.navTab[this.curTabIndex].type
                this.rakuenData = []
                uni.startPullDownRefresh()
            }
        },
        methods: {
            // 获取超展开数据
            async initData() {
                if(this.isLoading) {
                    return
                }
                this.isLoading = true
                this.rakuenData = await rakuen({
                    type: this.curType
                })
                this.isLoading = false
            },
            // 获取当前tab索引
            getCurIndex(e) {
                if(this.isLoading) {
                    return
                }
                this.curTabIndex = e.index
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
            }
        },
        // 下拉刷新事件
        async onPullDownRefresh() {
            if(this.isLoading) {
                return
            }
            await this.initData()
            setTimeout(() => {
                uni.stopPullDownRefresh()
            }, 500)
        },
        // 页面触底事件
        onReachBottom() {
            this.$layer.msg('没有更多内容了！')
        }
    }
</script>

<style lang="scss" scoped>
@import "./rakuen.scss";
</style>

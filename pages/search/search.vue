<template>
    <view class="search">
        <view class="search-head">
            <view class="search-head__wrap">
                <menu-btn type="icon" :list="menuList" @click="getCurMenuIndex"></menu-btn>
                <input type="text"
                    placeholder="搜索..."
                    confirm-type="search"
                    @confirm="goSearchRes"
                />
            </view>
        </view>
        <view class="search-history">
            <view class="search-history-head">
                <view class="search-history-head__wrap">
                    <text>搜索历史</text>
                    <text @click="clearHistory">清空搜索记录</text>
                </view>
            </view>
            <view class="search-history-list" v-if="searchHistory.length">
                <view class="search-history-item"
                    v-for="(item,index) in searchHistory"
                    :key="index"
                    @click="goSearchPage(item)"
                >
                    <view>{{ item }}</view>
                    <Icon name="close" size="36" @click.native.stop="removeHistory(index)"/>
                </view>
            </view>
            <nodata v-else>没有搜索记录</nodata>
        </view>

    </view>
</template>

<script>
    import { menuList } from './config.js'
    export default {
        data() {
            return {
                menuList: menuList,
                searchType: 'all',
                searchHistory: []
            }
        },
        onShow() {
            let history = uni.getStorageSync('searchHistory')
            if(history) {
                this.searchHistory = history
            }
        },
        methods: {
            // 键盘点击完成事件
            goSearchRes(e) {
                this.searchHistory.unshift(e.detail.value)
                uni.setStorageSync('searchHistory', this.searchHistory)
                uni.navigateTo({
                    url: `/pages/search_result/search_result?type=${this.searchType}&val=${e.detail.value}`
                })
            },
            goSearchPage(val) {
                uni.navigateTo({
                    url: `/pages/search_result/search_result?type=${this.searchType}&val=${val}`
                })
            },
            // 删除指定记录
            removeHistory(i) {
                this.searchHistory.splice(i, 1)
                uni.setStorageSync('searchHistory', this.searchHistory)
            },
            // 清空历史记录
            clearHistory() {
                if(!this.searchHistory.length) {
                    this.$layer.msg('没有可清理的数据！')
                    return
                }
                uni.showModal({
                    title: '提示',
                    content: '确认清空历史记录吗？',
                    success: res => {
                        if(res.confirm) {
                            this.searchHistory = []
                            uni.setStorageSync('searchHistory', this.searchHistory)
                        }
                    }
                })
            },
            // menu菜单点击事件
            getCurMenuIndex(e) {
                this.searchType = e.type
            }
        }
    }
</script>

<style lang="scss" scoped>
.search {
    &-head {
        position: fixed;
        padding: 20rpx 30rpx;
        width: 100%;
        z-index: $back-top;
        background-color: $color-white;
        &__wrap {
            display: flex;
            align-items: center;
            width: 100%;
            height: 90rpx;
            padding: 10rpx 40rpx;
            border-radius: 90rpx;
            color: $color-theme;
            background-color: rgba($color: #000000, $alpha: .07);
            >input{
                flex: 1;
                margin-left: 40rpx;
                font-size: 30rpx;
                color: $color-7;
            }
        }
    }
    &-history {
        padding-top: 130rpx;
        &-head {
            position: fixed;
            width: 100%;
            padding: 0 30rpx;
            z-index: $tab-index;
            background-color: $color-white;
            &__wrap {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 26rpx;
                height: 60rpx;
                line-height: 60rpx;
                color: $color-7;
            }
        }
        &-list {
            padding: 90rpx 30rpx 30rpx;
        }
        &-nodata {
            padding: 200rpx 30rpx 30rpx;
            font-size: 24rpx;
            color: $color-7;
            text-align: center;
        }
        &-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20rpx;
            font-size: 28rpx;
            color: $color-7;
            >view {
                color: $color-3;
            }
        }
    }
}
</style>

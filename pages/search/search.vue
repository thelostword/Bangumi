<template>
    <view class="search">
        <view class="search-head">
            <view class="search-head__wrap">
                <menu-btn type="icon" :list="menuList"></menu-btn>
                <input type="text" value="" placeholder="搜索..." confirm-type="search" />
            </view>
        </view>
        <view class="search-history">
            <view class="search-history-head">
                <view class="search-history-head__wrap">
                    <text>搜索历史</text>
                    <text>清空搜索记录</text>
                </view>
            </view>
            <view class="search-history-list" v-if="false">
                <view class="search-history-item">
                    <view>十二国记</view>
                    <Icon name="close" size="36"/>
                </view>
            </view>
            <nodata>没有搜索记录</nodata>
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                menuList: [{
                    name: '条目',
                    type: ''
                },{
                    name: '动画',
                    type: 'say'
                },{
                    name: '书籍',
                    type: 'say'
                },{
                    name: '游戏',
                    type: 'say'
                },{
                    name: '音乐',
                    type: 'say'
                },{
                    name: '三次元',
                    type: 'say'
                },{
                    name: '人物',
                    type: 'say'
                },{
                    name: '虚构角色',
                    type: 'say'
                },{
                    name: '现实人物',
                    type: 'say'
                }]
            };
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

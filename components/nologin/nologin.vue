<template>
    <view class="nologin">
        <view class="nologin-wrap">
            <navigator open-type="navigate" url="/pages/login/login">登 录</navigator>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            };
        }
    }
</script>

<style lang="scss" scoped>
.nologin {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    &-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        >navigator {
            width: 200rpx;
            height: 70rpx;
            border-radius: 70rpx;
            background-color: $color-theme;
            text-align: center;
            line-height: 70rpx;
            font-size: 30rpx;
            color: $color-white;
            box-shadow: 2rpx 0 10rpx rgba($color: #000000, $alpha: .1);
        }
    }
}
</style>

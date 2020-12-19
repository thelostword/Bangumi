<template>
    <view class="nodata">
        <view class="nodata-wrap">
            <image src="../../static/img/nodata02.png" mode="widthFix"></image>
            <text>
                <slot></slot>
            </text>
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
    .nodata {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        &-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            >image {
                width: 400rpx;
            }
            >text {
                font-size: 28rpx;
                color: $color-7;
            }
        }
    }
</style>

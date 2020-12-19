<template>
    <view class="score-star">
        <text
            class="iconfont icon-shoucang"
            :class="'icon-type'+type"
            :style="{fontSize: size+'rpx',lineHeight: size+'rpx'}"
        ></text>
    </view>
</template>

<script>
    export default {
        props: {
            type: {
                type: [Number, String],
                default: 0
            },
            size: {
                type: [Number, String],
                default: 40
            }
        }
    }
</script>

<style lang="scss" scoped>
    .score-star {
        .icon-shoucang {
            position: relative;
            display: inline-block;
            color: rgba($color: #000000, $alpha: .1);
            overflow: hidden;
        }

        .icon-type0 {
            color: rgba($color: #000000, $alpha: .1);
        }

        .icon-type1 {
            color: #feba5d;
        }

        .icon-type2::after {
            position: absolute;
            left: 0;
            top: 0;
            color: #feba5d;
            display: block;
            width: 50%;
            content: "\e642";
            overflow: hidden;
        }
    }
</style>

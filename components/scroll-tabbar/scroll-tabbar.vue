<template>
    <view class="scroll-tabbar">
        <scroll-view scroll-x="true" class="scroll-tabbar-wrap">
            <view class="scroll-tabbar-item"
                :class="index===listIndex && 'active'" v-for="(item,index) in list"
                :key="index"
                @click="handelClick(index,item)"
            >
                {{ item.name }}
            </view>
        </scroll-view>
    </view>
</template>

<script>
    export default {
        props: {
            list: Array,
            listIndex: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                
            };
        },
        computed: {
            curIndex() {
                return this.listIndex
            }
        },
        methods: {
            // tab点击事件
            handelClick(index,item) {
                let data = {
                    ...item,
                    index: index
                }
                this.$emit('click',data)
            }
        }
    }
</script>

<style lang="scss" scoped>
.scroll-tabbar {
    width: 100%;
    &-wrap {
        width: 100%;
        white-space: nowrap;
    }
    &-item {
        display: inline-block;
        padding: 10rpx 30rpx;
        color: $color-7;
        font-size: 30rpx;
        &.active {
            color: $color-theme;
        }
    }
}
</style>

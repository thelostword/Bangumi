<template>
    <text :class="'iconfont icon-'+name" :style="'font-size:'+size+'rpx;'"></text>
</template>

<script>
    export default {
        props: {
            name: String,
            size: {
                type: [Number, String],
                default: 42
            }
        }
    }
</script>

<style lang="scss" scoped>
    .iconfont {
        color: inherit;
    }
</style>

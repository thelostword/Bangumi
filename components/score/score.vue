<template>
    <view class="score">
        <score-star :size="size" :type="score==0?0:(score==1?2:1)"></score-star>
        <score-star :size="size" :type="score<=2?0:(score==3?2:1)"></score-star>
        <score-star :size="size" :type="score<=4?0:(score==5?2:1)"></score-star>
        <score-star :size="size" :type="score<=6?0:(score==7?2:1)"></score-star>
        <score-star :size="size" :type="score<=8?0:(score==9?2:1)"></score-star>
    </view>
</template>

<script>
    export default {
        props: {
            score: {
                type: [Number, String],
                default: 0
            },
            size: {
                type: [Number, String],
                default: 40
            }
        },
        data() {
            return {

            };
        }
    }
</script>

<style lang="scss" scoped>
.score {
    display: flex;
    align-items: center;
}
</style>

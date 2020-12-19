<template>
    <view class="menu-btn">
        <view class="menu-btn__btn" @click="toggleMenu" :class="type==='text' && 'menu-btn__btn-text'">
            <slot>{{ curName }}</slot>
        </view>
        <view class="menu-btn__menu" v-if="menuStatus" :style="position==='left' ? 'left:0' : (position==='right' ? 'left:auto;right:0' : 'left:50%;transform: translateX(-50%);')">
            <view class="menu-btn__menu-item" v-for="(item,index) in list" :key="index" :class="curIndex===index && 'active'"
                @click="handelClick(index,item)">
                {{ item.name }}
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            list: Array,
            type: {
                type: String,
                default: 'text' //icon
            },
            position: {
                type: String,
                default: 'left' //right
            }
        },
        data() {
            return {
                curIndex: 0,
                curName: '' || this.list[0].name,
                menuStatus: false
            }
        },
        methods: {
            toggleMenu() {
                this.menuStatus = !this.menuStatus
            },
            handelClick(index, item) {
                this.curIndex = index
                this.curName = item.name
                let data = {
                    ...item,
                    index: index
                }
                this.toggleMenu()
                this.$emit('click', data)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu-btn {
        position: relative;
        font-size: 30rpx;

        &__btn {
            display: inline-block;

            &-text {
                color: $color-7;
                padding: 15rpx 20rpx;
                line-height: 30rpx;
                border-radius: 60rpx;
                white-space: nowrap;
                background-color: rgba($color: #000000, $alpha: .1);
            }
        }

        &__menu {
            position: absolute;
            top: 70rpx;
            width: 250rpx;
            background-color: $color-white;
            padding: 20rpx 40rpx;
            box-shadow: 0 0 40rpx 20rpx rgba($color: #000000, $alpha: .1);
            z-index: $back-top;

            &-item {
                color: $color-3;
                padding: 20rpx 0;
                font-size: 32rpx;

                &.active {
                    color: $color-theme;
                }
            }
        }
    }
</style>

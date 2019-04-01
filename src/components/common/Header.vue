<template>
    <van-nav-bar
            fixed
    >
        <div slot="title">
            <slot name="title"></slot>
        </div>
        <div slot="right">
            <slot name="right"></slot>
        </div>

    </van-nav-bar>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .van-nav-bar {
        background-color: #FFC0CB;
    }

    .van-nav-bar__title {
        color: #fffbff;
    }
</style>
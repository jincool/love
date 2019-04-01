<template>
    <van-nav-bar
            title=""
            fixed
    >
        <div slot="title">
            <slot name="title"></slot>
        </div>
        <slot name="edit"></slot>
    </van-nav-bar>
</template>

<script>
    export default {
        name: "header"
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
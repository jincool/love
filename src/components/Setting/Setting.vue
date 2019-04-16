<template>
   <div>
      <van-button @click="logOut" type="warning">退出</van-button>
   </div>
</template>

<script>
    export default {
        name: "Setting",
        methods:{
            logOut() {
                localStorage.removeItem('token');
                this.$store.commit('logout');
                // 移除之前在axios头部设置的token,现在将无法执行需要token的事务
                delete this.$axios.defaults.headers.common['Authorization'];
                this.$router.push('/login');
            }
        }

    }
</script>

<style scoped>

</style>
<template>
  <div id="app">
    <router-view/>
    <van-tabbar v-model="active">
      <van-tabbar-item @click="changeHash" icon="home-o" >我们</van-tabbar-item>
      <van-tabbar-item @click="changeHash" icon="friends-o" dot>计划</van-tabbar-item>
      <van-tabbar-item @click="changeHash" icon="shopping-cart-o" info="5">动态</van-tabbar-item>
      <van-tabbar-item @click="changeHash" icon="search" info="20">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
    export default {
        name: "App",
        data (){

            return{
                msg:'欢迎来到vue!',
                cool:'cool',
                active:0
            }
        },
        methods:{
            changeHash:function () {
                this.$nextTick(function () {
                    var routerName={'0':'Home','1':'Plan','2':'Dynamic','3':'Setting'}[this.active];
                    this.$router.push({
                        name:routerName
                    })
                    console.log(routerName)
                })

            }
        },
        watch:{
            // selected(newv){
            //     this.$router.push({
            //         name:newv
            //     })
            // }
        }
    }
</script>

<style>
#app {

}
</style>

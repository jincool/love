<template>
  <div id="app">
    <router-view class="my-content"/>
    <van-tabbar v-model="active" active-color="#FFC0CB">
      <van-tabbar-item @click="changeHash" icon="home-o" >纪念日</van-tabbar-item>
      <van-tabbar-item @click="changeHash" icon="notes-o" dot>计划</van-tabbar-item>
      <van-tabbar-item @click="changeHash" icon="friends-o" info="2">动态</van-tabbar-item>
      <van-tabbar-item @click="changeHash" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
    export default {
        name: "App",
        data (){
            return{
                active:0
            }
        },
        methods:{
            changeHash:function () {
                this.$nextTick(function () {
                    let routerName={'0':'Home','1':'Plan','2':'Dynamic','3':'Setting'}[this.active];
                    this.$router.push({
                        name:routerName
                    });
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
  .my-content{
    margin-top: 46px;
  }
</style>

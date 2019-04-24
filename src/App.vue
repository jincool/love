<template>
  <div id="app">

    <keep-alive>
    <router-view v-if="$route.meta.keepAlive" class="my-content"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="my-content"/>
    <van-tabbar fixed v-model="active" active-color="#FFC0CB"  v-show="this.$store.getters.isLoggedIn" >
      <van-tabbar-item @click="changeHash" icon="home-o" >纪念日</van-tabbar-item>
      <van-tabbar-item @click="changeHash" icon="notes-o" :dot="this.$store.getters.planDot">计划</van-tabbar-item>
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
                active:0,
                timer: null
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

            },
            //计划更新状态
            planStatus:function () {
                this.$store.dispatch('getPlanDot')
                    .then(() => {

                    })
                    .catch((error) => {
                        this.$toast('意外错误')
                        console.log(error.response);
                    });
            },
            //开启定时器
            startPlan:function () {
                if (this.timer){
                    clearInterval(this.timer)
                }else {
                    this.timer=setInterval(()=>{
                        this.planStatus();
                    },60000)
                }
            }

        },
        created(){
         this.startPlan(); //开启定时器
        },
        destroyed(){
            clearInterval(this.timer);
            this.timer=null;
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
    margin-bottom: 46px;
  }
</style>

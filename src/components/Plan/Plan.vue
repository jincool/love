<template>
   <div>
      <van-row>
         <van-col span="24">
            <my-header>
               <div slot="title">{{title}}</div>
               <div slot="right">
                  <van-icon name="weapp-nav" color="#ffffff" @click="addInfo" />
               </div>
            </my-header>
         </van-col>
      </van-row>
      <br>
      <!--下啦刷新-->
      <van-pull-refresh  v-model="isLoading" @refresh="onRefresh" >
         <van-list
                 v-model="loading"
                 :finished="finished"
                 finished-text="没有更多了"
                 :offset="30"
                 @load="onLoad"
                 ref="check"
         >

         <van-row class="plan_panel" v-for="(info,index) in mainInfo" :key="index" >
            <van-col span="4">
               <van-card
                       :thumb="imageURL"
               />
            </van-col>
            <van-col span="16" offset="1">
               <van-panel title="" desc="" >

                  <div slot="header">
                     <van-cell value="" :class="contentClass(info.sex)">
                        <div slot="">
                           <van-icon name="notes-o" color="#007efe" />
                           {{info.content}}
                        </div>
                     </van-cell>
                  </div>
                  <div>
                     <van-cell value="" :class="detailClass(info.sex)">
                        <div slot="">
                           <van-icon name="underway-o" color="#ff905d" />
                           {{info.date_info}}
                        </div>
                        <div slot="">
                           <van-icon name="location-o" color="#02cb64" />
                           {{info.address}}
                        </div>
                        <van-row type="flex" justify="center">
                           <van-button round plain hairline size="mini" type="danger">取消</van-button>
                        </van-row>

                     </van-cell>
                  </div>
               </van-panel>
            </van-col>
            <br>
         </van-row>



         </van-list>
         <!--<p>刷新次数: {{ count }}</p>-->
      </van-pull-refresh>


   </div>



</template>

<script>
    export default {
        name: "Plan",
        data(){
            return{
                title:'计划',
                mainInfo:[],
                count: 0,
                isLoading: false,
                imageURL:require('@/assets/img/logo.png'),
                page:1,
                loading: false,//启停加载
                finished: false,//启停结束加载
            }
        },

        methods: {
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                    this.count++;
                }, 500);
            },
            contentClass(sex){
               let contentClass = {'1':'plan_content','0':'plan_content_women'}[sex]
                return contentClass;
            },
            detailClass(sex){
                let detailClass = {'1':'plan_detail','0':'plan_detail_women'}[sex]
                return detailClass;

            },
            addInfo(){

            },
            planInfo(page){
                this.$axios.post('index/Plan/planInfo',{'page':page})
                    .then(res=>{
                     this.mainInfo=res.data;
                        this.page ++;
                    //console.log(res.data)
                   //  this.mainInfo.concat(res.data)
                   // console.log(this.mainInfo);
                })
            },
            // 上拉加载
            onLoad(){
                // setTimeout(() => {
                this.$axios.post('index/Plan/planInfo',{'page':this.page})
                    .then(res=>{
                        // this.mainInfo=res.data;
                        if (res.data.length === 0) {
                            this.finished = true;
                            this.$toast('有底线啦');
                            this.loading = false;
                            return false
                        }
                        // console.log(this.$refs.check)
                        this.mainInfo=this.mainInfo.concat(res.data)
                        this.loading = false;
                        this.page ++;
                         // console.log(this.mainInfo);
                    })

                // }, 500);
            }

        },
        created(){
            // this.planInfo(this.page);
        }


    }
</script>

<style scoped>
   .van-card {
      background-color: #fafafa00;
   }
   /*头像框*/
   .van-card__thumb {
      width: 36px;
      height: 36px;
      border-radius: 5px;
   }
   .van-card__content {
      height: 30px;}
   .van-card__thumb img {
      border-radius: 15px;
   }

   .plan_panel{
      margin-bottom: 10px;
   }
   /*计划内容*/
   .plan_content {
      background-color: #ddecff;
      border-radius: 10px;
   }
   .plan_content_women {
      background-color: #ffbac8;
      border-radius: 10px;
   }
   /*计划详细*/
   .plan_detail {
      background-color: #ddecff;
      border-radius: 10px;
      font-size: small;
   }
   .plan_detail_women {
      background-color: #ffbac8;
      border-radius: 10px;
      font-size: small;
   }
</style>
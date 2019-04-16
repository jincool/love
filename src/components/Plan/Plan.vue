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
                           {{info.dateInfo}}
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
                mainInfo:[
                    {'content':'计划去青岛玩耍',dateInfo:'2019-05-01',address:'青岛市','sex':1},
                    {'content':'计划去西安玩耍',dateInfo:'2019-06-01',address:'青岛市','sex':0},
                    {'content':'计划去北京玩耍',dateInfo:'2019-07-01',address:'青岛市','sex':1},
                ],
                content:'计划去青岛玩耍',//计划内容
                dateInfo:'2019-05-01',//计划时间
                address:'青岛市',//计划地点
                count: 0,
                isLoading: false,
                imageURL:require('@/assets/img/logo.png')
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

            }
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
<template>
   <div>
      <van-row>
         <van-col span="24">
      <van-nav-bar
              title="活动计划"

              @click-right=""
      >
         <van-icon name="weapp-nav" color="#ffffff" slot="right"/>
      </van-nav-bar>
         </van-col>
      </van-row>
      <!--下啦刷新-->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
         <van-row>
            <van-col span="4">
               <van-card
                       :thumb="imageURL"
               />
            </van-col>
            <van-col span="20">
               <van-panel title="" desc="描述信1息">
                  <div>内fff容</div>
                  <div slot="header">
                     <van-button size="small" type="danger">按钮</van-button>
                  </div>
               </van-panel>
            </van-col>
         </van-row>
         <p>刷新次数: {{ count }}</p>
      </van-pull-refresh>


   </div>



</template>

<script>
    export default {
        name: "Plan",
        data(){
            return{
                count: 0,
                isLoading: false,
                imageURL:'http://img.52z.com/upload/news/image/20180213/20180213062641_35687.jpg',
            }
        },

        methods: {
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                    this.count++;
                }, 500);
            }
        }

    }
</script>

<style scoped>
   .van-card {
      background-color: #fafafa00;
   }
   .van-card__thumb {
      width: 30px;
      height: 30px;}
   .van-card__content {
      height: 30px;}
   .van-card__thumb img {
      border-radius: 15px;
   }
</style>
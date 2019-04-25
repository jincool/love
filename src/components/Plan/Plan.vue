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
      <van-pull-refresh class="" v-model="isLoading" @refresh="onRefresh" >
         <van-list
                 v-model="loading"
                 :finished="finished"
                 finished-text=""
                 :offset="30"
                 :immediate-check=true
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
                           <van-button @click="cancel(info.id)" round plain hairline size="mini" type="danger">取消</van-button>
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



      <!--添加计划模态框板块-->
      <van-popup v-model="show" overlay-class="cool" position="right" :overlay="true">
         <van-nav-bar
                 title="发起计划"
                 left-text="返回"
                 right-text="保存"
                 left-arrow
                 @click-left="addInfo"
                 @click-right="save"
         />
         <!--发起计划内容板块-->
         <van-cell-group>
            <van-field
                    v-model="message"
                    type="textarea"
                    placeholder="我想和你有一次更加亲密的约会计划"
                    rows="5"
                    autosize
                    clearable
            />
         </van-cell-group>
         <!--选择出行日期  -->
         <van-cell-group>
            <van-cell @click.native="selectDateShow" icon="underway-o" title="日期" value-class="love_data_color"
                      is-link value="">
               <template slot="">
                  {{date}}
               </template>
            </van-cell>
            <van-field
                    v-model="address"
                    clearable
                    label="地点"
                    left-icon="location-o"
                    placeholder=""
            />
         </van-cell-group>

         <!--添加纪念日模态框板块end-->
      </van-popup>

      <!--日期选择模态框-->
      <van-popup v-model="dateShow" position="bottom" :overlay="false">
         <van-datetime-picker
                 v-model="currentDate"
                 type="date"
                 @confirm="confirm"
                 @change="change"
                 @cancel="dateCancel"
         />
      </van-popup>


   </div>



</template>

<script>
    export default {
        name: "Plan",
        data(){
            return{
                title:'计划',
                show:false,//默认关闭发起计划模态框
                mainInfo:[],//计划主要信息列表
                isLoading: false,
                imageURL:require('@/assets/img/logo.png'),//头像
                page:1,//默认起始页
                loading: false,//启停加载
                finished: false,//启停结束加载
                message: '',//发起计划内容
                currentDate: new Date(),//日期选择,
                address:'',
                dateShow: false, //纪念日模态框
                date:''
            }
        },

        methods: {
            // 发起模态框开启/关闭
            addInfo() {
                this.show = !this.show;
            },
            //日期选择模态框开启
            selectDateShow() {
                this.dateShow = !this.dateShow
            },
            // 保存发起计划数据
            save(){},
            // 日期选择确认按钮，关闭当前模态框
            confirm() {
                this.selectDateShow()
            },
            // 日期选择更改
            change(e) {
                let dateArr = e.getValues()
                this.date = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2]
            },
            // 日期选择取消按钮，关闭当前模态框
            dateCancel() {
                this.selectDateShow()
            },
            selectDate() {
                return this.date = this.$moment().format('YYYY-MM-DD');
            },
            //下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.mainInfo=[];
                    console.log(this.mainInfo)
                    this.page=1;
                    this.finished = false
                    this.onLoad();
                    this.$toast('刷新成功');
                    this.isLoading = false;
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
                            //this.$toast('有底线啦');
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
            },
            //取消计划
            cancel(id){
                this.$toast(id);
                this.onRefresh()
            },
            //判断是否有更新状态
            hasUpdate(){
               if (this.$store.getters.planDot) {
                   // 存在更新，页面刷新
                   this. onRefresh();
                   this.$store.commit('watchPlan');
               }
            }

        },
        created(){
            this.selectDate()// 加载当前日期
        },
        activated: function () {
            this.hasUpdate(); //判断是否有更新状态
        },


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
   /*模态框*/
   .van-popup--right {
      height: 100%;
      width: 100%;
   }

</style>

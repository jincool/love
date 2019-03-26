<template>
    <div>

        <van-row>
            <van-col span="24">
                <van-nav-bar
                        title="APP名字"
                        fixed
                        @click-right="addInfo"
                >
                    <van-icon name="weapp-nav" color="#ffffff" slot="right"/>
                </van-nav-bar>
                <!--相恋天数板块-->
                <div class="lvoe_date_div">
                    <span>相恋{{lvoe_date}}天</span>
                </div>
                <a href="#" class="thumbnail">
                    <img @click="updateImg" class="" src="../../assets/img/bg_home1.jpeg"
                         alt="通用的占位符缩略图" style="height:250px">
                </a>

            </van-col>
            <!--纪念日列表-->
            <van-col span="24">
                <van-cell title="相恋日" value-class="love_data_color" value="335天" label="2018-03-03"/>
                <van-cell title="相识日" value-class="love_data_color" value="3135天" label="2008-03-03"/>
                <van-cell title="第一次约会" value-class="love_data_color" value="32天" label="20019-03-03"/>
                <van-cell title="第一次旅游" value-class="love_data_color" value="32天" label="20019-04-04"/>

            </van-col>

        </van-row>

        <!--添加背景模态框部分-->
        <van-popup v-model="bgShow" position="top">
            <div>
                <van-panel title="选择更改背景图" desc="" status="">
                    <div>
                        <croppa
                                v-model="croppa"
                                :width="378"
                                :height="250"
                                :placeholder="'选择图片'"
                                :placeholder-font-size="16"
                                :accept="'image/*'"
                                prevent-white-space
                                :initial-image=dataUrl
                                @init=""
                        ></croppa>


                    </div>
                    <div slot="footer">
                        <van-row>
                            <van-col span="4">
                                <van-button @click="cancelUpdateImg" size="small" type="danger">取消</van-button>
                            </van-col>
                            <van-col span="4" offset="16">
                                <van-button size="small">确定</van-button>
                            </van-col>
                        </van-row>


                    </div>
                </van-panel>


            </div>
        </van-popup>

       <!--添加纪念日模态框板块-->
        <van-popup v-model="show" overlay-class="cool" position="right" :overlay="true">
            
        </van-popup>

    </div>

</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                bgShow: false, //背景模态框
                show: false, //纪念日模态框
                croppa: {},  //裁剪的数据
                dataUrl: '',
                lvoe_date: '345' //恋爱天数
            }
        },
        methods: {
            //显示更新照片模态框
            updateImg() {
                this.bgShow = true;
            },
            cancelUpdateImg() {
                this.bgShow = false
            },
            addInfo() {
                // 纪念日模态框开启
                this.show =true;
            }

        }
        // created () {
        //     this.$axios.post('')
        //         .then(res=>{
        //
        //         })
        //         .catch(err=>{
        //
        //         })
        // }


    }
</script>

<style scoped>
    .thumbnail > img {
        display: block;
        max-width: 100%;
        height: auto
    }

    img {
        vertical-align: middle
    }

    .thumbnail {
        display: block;
        margin-bottom: 20px;
        background-color: #fff;
        -webkit-transition: border .2s ease-in-out;
        -o-transition: border .2s ease-in-out;
        transition: border .2s ease-in-out
    }

    .thumbnail a > img,
    .thumbnail > img {
        margin-right: auto;
        margin-left: auto
    }

    .van-nav-bar {
        background-color: #FFC0CB;
    }

    .van-nav-bar__title {
        color: #fffbff;
    }

    .love_data_color {
        color: #72d3e6;

    }

    .lvoe_date_div {
        font-size: 1.5em;
        top: 200px;
        left: 210px;
        color: #fffbff;
        position: absolute;
        z-index: 10;
    }
    .cool{
        background-color: aqua;
    }
</style>
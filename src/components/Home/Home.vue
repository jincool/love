<template>
    <div>
        <van-row>
            <van-col span="24">
                <my-header>
                    <div slot="title">{{title}}</div>
                    <div slot="right">
                        <van-icon name="weapp-nav" color="#ffffff" @click="addInfo"/>
                    </div>
                </my-header>
                <van-icon name="weapp-nav" color="#ffffff" slot="right"/>
                <!--相恋天数板块-->
                <div class="lvoe_date_div">
                    <span>相恋{{lvoe_date}}天</span>
                </div>
                <a href="#" class="thumbnail">
                    <img @click="updateImg" class="" src="../../assets/img/bg_home1.jpeg"
                         alt="图" style="height:250px">
                </a>

            </van-col>
            <!--纪念日列表 -->
            <van-col span="24">
                <van-cell v-for="record in records" title="" value-class="love_data_color" value="" label="2018-03-03"
                          :key="record.id">
                    <template slot="title">
                        {{record.title}}
                    </template>
                    <template slot="">
                        {{record.datetime | agoDate }}
                    </template>
                    <template slot="label">
                        {{record.datetime}}
                    </template>
                </van-cell>
            </van-col>

        </van-row>

        <!--添加背景模态框部分-->
        <van-popup v-model="bgShow" position="top">
            <div>
                <van-panel title="选择更改背景图" desc="" status="">
                    <div>
                        <van-row type="flex" justify="center">
                            <croppa
                                    v-model="croppa"
                                    :width="350"
                                    :height="230"
                                    :placeholder="'选择图片'"
                                    :placeholder-font-size="16"
                                    :accept="'image/*'"
                                    prevent-white-space

                            ></croppa>
                        </van-row>

                    </div>
                    <div slot="footer">
                        <van-row>
                            <van-col span="4">
                                <van-button @click="updateImg" size="small" type="danger">取消</van-button>
                            </van-col>
                            <van-col span="4" offset="16">
                                <van-button @click="uploadCroppedImage" size="small">确定</van-button>
                            </van-col>
                        </van-row>


                    </div>
                </van-panel>


            </div>
        </van-popup>

        <!--添加纪念日模态框板块-->
        <van-popup v-model="show" overlay-class="cool" position="right" :overlay="true">
            <van-nav-bar
                    title="添加纪念日"
                    left-text="返回"
                    right-text="保存"
                    left-arrow
                    @click-left="addInfo"
                    @click-right="save"
            />
            <!--纪念日内容板块-->
            <van-cell-group>
                <van-field
                        v-model="message"
                        type="textarea"
                        placeholder="这是我和你的什么纪念日呢？"
                        rows="5"
                        autosize
                        clearable
                />
            </van-cell-group>
            <!--选择纪念日日期  -->
            <van-cell-group>
                <van-cell @click.native="selectDateShow" icon="underway-o" title="日期" value-class="love_data_color"
                          is-link value="">
                    <template slot="">
                        {{date}}
                    </template>
                </van-cell>
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
                    @cancel="cancel"
            />
        </van-popup>

    </div>

</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                title: '纪念日',
                records: [{'id': 1, 'title': '相恋日', 'datetime': '2019-03-03'},
                    {'id': 2, 'title': '相识日', 'datetime': '2009-09-01'},
                    {'id': 3, 'title': '第一次约会', 'datetime': '2019-02-13'},
                    {'id': 2, 'title': '相识日', 'datetime': '2009-09-01'},
                    {'id': 3, 'title': '第一次约会', 'datetime': '2019-02-13'},
                    {'id': 2, 'title': '相识日', 'datetime': '2009-09-01'},
                    {'id': 3, 'title': '第一次约会', 'datetime': '2019-02-13'},
                    {'id': 2, 'title': '相识日', 'datetime': '2009-09-01'},
                    {'id': 3, 'title': '第一次约会', 'datetime': '2019-02-13'},
                    {'id': 2, 'title': '相识日', 'datetime': '2009-09-01'},
                    {'id': 3, 'title': '第一次约会', 'datetime': '2019-02-13'},
                    {'id': 4, 'title': '第一次旅游', 'datetime': '2019-04-03'}],
                bgShow: false, //背景模态框
                show: false, //纪念日模态框
                dateShow: false, //日期选择框
                croppa: {},  //裁剪的数据
                dataUrl: '',
                lvoe_date: '345', //恋爱天数
                message: '',
                currentDate: new Date(),//日期选择,
                date: ''
            }
        },
        methods: {
            //显示/关闭更新照片模态框
            updateImg() {
                this.bgShow = !this.bgShow;
            },
            // 纪念日模态框开启/关闭
            addInfo() {
                this.show = !this.show;
            },
            //日期选择模态框开启
            selectDateShow() {
                this.dateShow = !this.dateShow
            },
            save() {
                this.$toast('保存')
                this.show = false;
            },
            selectDate() {
                return this.date = this.$moment().format('YYYY-MM-DD');
            },
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
            cancel() {
                this.selectDateShow()
            },
            //裁剪图片上传至服务器
            uploadCroppedImage() {
                let that = this;
                this.croppa.generateBlob(
                    (blob) => {
                        // 编写代码上传裁剪的图像文件
                        // this.croppa.generateDataUrl() base64
                        console.log(blob);
                        var formdata = new FormData();
                        let config = {
                            formpost: "formpost",
                            headers: {
                                'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
                            }
                        };
                        formdata.append("file", blob,'image.jpeg'); //封装到formdata中
                        that.$axios.post('index/Home/upLoadImg', formdata,config).then(res => {
                            console.log(res);
                            let data = res.data;
                            console.log(data);

                        });
                    },
                    "image/jpeg",
                    0.8
                ); // 80%压缩文件
            }


        },
        created() {
            this.selectDate()//加载当前日期
            // this.$axios.post('')
            //     .then(res=>{
            //
            //     })
            //     .catch(err=>{
            //
            //     })
        }


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

    .love_data_color {
        color: #72d3e6;

    }

    .lvoe_date_div {
        font-size: 1.5em;
        top: 240px;
        left: 210px;
        color: #fffbff;
        position: absolute;
        z-index: 0;
    }

    .cool {
        background-color: aqua;
    }

    .van-popup--right {
        height: 100%;
        width: 100%;
    }
</style>

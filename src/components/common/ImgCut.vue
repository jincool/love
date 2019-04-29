<template>
    <div>
        <div id="croppa">
            <van-row type="flex" justify="center">
                <!--<van-col span="20">-->
                <croppa
                        v-model="croppa"
                        :width="250"
                        :height="250"
                        :placeholder-font-size="16"
                        :accept="'image/*'"
                        prevent-white-space
                        @init="onInit"
                        class="croppa"
                ></croppa>
                <!--</van-col>-->

            </van-row>

        </div>
        <van-col span="4" offset="16">
            <van-button @click="upLoad" size="small">确定</van-button>
        </van-col>
    </div>

</template>

<script>
    export default {
        name: "ImgCut",
        data() {
            return {
                croppa: {},
                dataUrl: ''
            }
        },
        methods: {
            upLoad() {
                this.croppa.generateBlob(blob => {
                    console.log(this.croppa.generateBlob)
                    var formData = new FormData()
                    var self = this
                    formData.append('file', blob, 'png');
                    let config = {
                        headers: {'Content-Type': false}
                    };
                    this.$axios.post('index/Home/upLoadImg', formData,config).then(res => {
                        self.progressVal = 100
                        self.showProgress = false
                        self.showCroppa = false
                        self.dataUrl = res.data.url
                    })
                }, 'image/png', 0.1)
            },
            //头像选取
            onInit() {
                this.croppa.addClipPlugin(function (ctx, x, y, w, h) {
                    ctx.beginPath()
                    ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
                    ctx.closePath()
                })
            }
        }
    }
</script>

<style scoped>
#croppa{
    margin: 0 auto;
    background-color: #fa4e43;
}
</style>
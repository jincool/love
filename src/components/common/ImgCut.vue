<template>
    <croppa
            v-model="croppa"
            :width="350"
            :height="250"
            :placeholder="'选择图片'"
            :placeholder-font-size="16"
            :accept="'image/*'"
            prevent-white-space
            :initial-image=dataUrl
            @init=""
    ></croppa>
</template>

<script>
    export default {
        name: "ImgCut",
        data(){
            return {
                croppa:{},
                dataUrl:''
            }
        },
        methods:{
            upLoad () {
                this.croppa.generateBlob(blob => {
                    // var formData = new FormData()
                    // var self = this
                    // formData.append('file', blob, 'png')
                    // this.axios({
                    //     url: api.upload,
                    //     method: 'post',
                    //     data: formData
                    // }).then(res => {
                    //     self.progressVal = 100
                    //     self.showProgress = false
                    //     self.showCroppa = false
                    //     self.dataUrl = res.data.url
                    // })
                }, 'image/png', 0.1)
            },
            //头像选取
            onInit () {
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

</style>
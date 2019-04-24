<template>
    <div>
        <my-header>
            <div slot="title">{{title}}</div>
        </my-header>
        <!--登录-->
        <van-cell-group>
            <van-field
                    v-model="username"
                    required
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名"
                    @click-right-icon=""
            />

            <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
            />
        </van-cell-group>
        <van-button @click="login" round block plain hairline type="info">登录</van-button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                title: '用户登录',
                username: '',
                password: '',
            }
        },
        methods: {
            // login(){
            //     let params={'username':this.username,'password':this.password}
            //     console.log(params)
            //     this.$axios.post('index/Login/loginCheck',params)
            //         .then(res=>{
            //         this.$toast(res.data.message)
            //          //    console.log(res.data)
            //         })
            //         .catch(err=>{
            //
            //         })
            // }
            login() {
                let params = {
                    'username': this.username,
                    'password': this.password
                };
                this.$store.dispatch('Login', params)
                    .then(() => {
                        this.$toast(this.$store.state.login.message);
                        this.$router.push({path: '/'});
                    })
                    .catch((error) => {
                        this.$toast('意外错误')
                        console.log(error.response);
                    });
            },
        },
        created() {

        }
    }
</script>

<style scoped>

</style>
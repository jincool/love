import axios from 'axios';

const status = {
    state: {
        timer: null,//定时器启停
        planInfo: '',
        planDot: false,//计划状态
    },
    mutations: {

        auth_success(state, token, user) {
            // state.status = 'success';
            // state.token = token;
            // state.user = user;
        },
        watchPlan(state){
            state.planDot=false;
        },
        timer(state, planInfo) {
            if (state.planDot) {return false}
            if (state.planInfo == planInfo) {
                state.planDot = false
            } else {
                state.planInfo = planInfo;
                state.planDot = true
            }
        },
    },
    actions: {
        getPlanDot({commit}) {
            return new Promise((resolve, reject) => {
                // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
                axios.post('index/status/planStatus')
                    .then(resp => {
                        const planDot = resp.data;
                        commit('timer', planDot)
                    })
                    .catch(err => {
                        commit('auth_error')
                        reject(err)
                    })
            })
        }
    },
    getters: {
        planDot: state => state.planDot,
    }
};
export default status;
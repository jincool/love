import axios from 'axios';

const login = {
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        message: '',
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading';
        },
        auth_success(state, token, user) {
            state.status = 'success';
            state.token = token;
            state.user = user;
        },
        auth_message(state, message) {
            state.message = message;
        },
        auth_error(state) {
            state.status = 'error';
        },
        logout(state) {
            state.status = '';
            state.token = '';
            state.message = '';
        },
    },
    actions: {
        Login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
                axios.post('index/Login/loginCheck', user)
                    .then(resp => {
                        switch (resp.data.status) {
                            case 1:
                                const token = resp.data.user.uid
                                const user = resp.data.user
                                localStorage.setItem('token', token)
                                // 每次请求接口时，需要在headers添加对应的Token验证
                                axios.defaults.headers.common['Authorization'] = token
                                // 更新token
                                commit('auth_success', token, user)
                                commit('auth_message', resp.data.message)
                                resolve(resp)
                                break;
                            default:
                                const MESSAGE = resp.data.message;
                                commit('auth_message', resp.data.message)
                                resolve(resp)
                        }
                        // console.log(resp.data.message)


                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        // LogOut({ commit, state }) {
        //     return new Promise((resolve, reject) => {
        //         axios.get('Logout')
        //             .then(response => {
        //                 //removeIsLogin()
        //                 localStorage.removeItem('token');
        //                 // 移除之前在axios头部设置的token,现在将无法执行需要token的事务
        //
        //                 delete axios.defaults.headers.common['Authorization'];
        //                 resolve(response)
        //             })
        //             .catch(error => {
        //                 reject(error)
        //             })
        //     })
        // }
    },
    getters: {
        // !!将state.token强制转换为布尔值，若state.token存在且不为空(已登录)则返回true，反之返回false
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    }
};
export default login;
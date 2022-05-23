import {
    Store,
    createStore
} from 'vuex'
import axios from 'axios';
const store = new Store({
    state: {
        projects: {},
        tasks:{},
        user: {},
        loginError: false,
        subscribeError: false,
        subscribeSuccess: false,
    },
    actions: {
        tryLogin({
            commit
        }, user) {
            commit('setLoginError', false);
            axios.post('http://localhost:3008/user/login', {
                    email: user.email,
                    password: user.password
                })
                .then(res => {
                    commit('setUser', { ...user,
                        ...res.data
                    })
                })
                .catch(err => {
                    commit('setUser', {});
                    commit('setLoginError', true);
                })
        },
        createProject({
            commit
        },data) {
            data.socket.emit('addProject', data.projectName )
        },
        createTask({
            commit
        },data) {
            data.socket.emit('addTask', { name:data.taskName, project_id: data.projectId} )
        },
        trySubscribe({
            commit
        }, user) {
            commit('setSubscribeError', false);
            if(user.password != user.confirm_password) {
                commit('setSubscribeError', true);
                return
            }
            axios.post('http://localhost:3008/user/subscribe', {
                    name: user.name,
                    email: user.email,
                    password: user.password
                })
                .then(res => {
                    commit('setUser', {});
                    commit('setSubscribeSuccess', true);
                })
                .catch(err => {
                    commit('setUser', {});
                    commit('setSubscribeError', true);
                })
        },
        SOCKET_loginError({
            commit
        }, user) {
            commit('setUser', {});
            commit('setLoginError', true);
        },
        SOCKET_login({
            commit
        }, user) {
            commit('setUser', user);
        },
    },
    mutations: {
        SOCKET_projectLoad(state, projects) {
            projects.map(project=>{  state.projects[project._id]=project })
        },
        SOCKET_projectAdded(state, project) {
            state.projects[project._id]=project
            // console.log(state.projects);
        },
        SOCKET_taskLoad(state, tasks) {
            tasks.map(task=>{  state.tasks[task._id]=task })
        },
        SOCKET_taskAdded(state, task) {
            state.tasks[task._id]=task
            // console.log(state.projects);
        },
        setLoginError(state, iserror=false) {
            state.loginError = iserror;
        },
         setSubscribeError(state, iserror=false) {
            state.subscribeError = iserror;
        },
         setSubscribeSuccess(state, iserror=false) {
            state.subscribeSuccess = iserror;
        },
        setUser(state, user) {
            state.user = {
                email: user.email,
                token: user.token
            }
        },
    }
})

export default store;
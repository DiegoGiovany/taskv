import {
    Store,
    createStore
} from 'vuex'
import VuexPersistence from 'vuex-persist'

import axios from 'axios';

const vuexLocal = new VuexPersistence({
    key: 'App',
    storage: window.localStorage
  });
const store = new Store({
    state: {
        projects: {},
        tasks:{},
        user: {},
        loginError: false,
        subscribeError: false,
        subscribeSuccess: false,
    },
    plugins: [ vuexLocal.plugin ],
    actions: {
        tryLogout({
            commit
        }) {
                    commit('setUser', {});
                    commit('setLoginError', false);
        },
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
        SOCKET_deleteTask(state, taskid) {

            delete state.tasks[taskid]
        },
        SOCKET_deleteProject(state, projectId) {
            delete state.projects[projectId]
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
                name: user.name,
                email: user.email,
                token: user.token
            }
        },
        setTaskStatus(state, data) {
            if(data.status == 'Done') { state.tasks[data.id].done_at = new Date().toISOString(); }
            else { state.tasks[data.id].done_at = undefined }
            state.tasks[data.id].status = data.status
        },
    }
})

export default store;
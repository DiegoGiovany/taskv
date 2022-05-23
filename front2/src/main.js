import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import store from "./store";
import router from "./router";
import VueSocketIO from 'vue-3-socket.io'


const myApp=createApp(App)
myApp.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3008',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    options: { path: "/socket.io/" }
}))
myApp.use(router).use(store).mount('#app')


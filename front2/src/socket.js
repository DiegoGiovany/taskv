import VueSocketIO from 'vue-3-socket.io'
import store from "./store";

 
const socket = new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3007',
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    },
    options: { path: "/" } //Optional options
  })


export default { socket, store };
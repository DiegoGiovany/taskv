import {
    createWebHistory,
    createRouter
} from "vue-router";

import PageNotFound from './pages/error.vue'
import Login from './pages/login.vue'
import Subscribe from './pages/subscribe.vue'
import Projects from './pages/projects.vue'
import Tasks from './pages/tasks.vue'

const routes = [{
        path: '/login',
        component: Login
    },
    {
        path: '/subscribe',
        component: Subscribe
    },
      {
        path: '/tasks/:project_id',
        component: Tasks,
        props: true
    },
    {
        path: '/projects',
        component: Projects
    },
    {
        path: '/:pathMatch(.*)*',
        component: PageNotFound,
        props: {
            code: 404,
            message: 'Página Não Encontrada'
        }
    },
]

const history = createWebHistory();

const router = createRouter({
    history,
    routes
});
export default router;
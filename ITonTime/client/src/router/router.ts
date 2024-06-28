import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';
import Tasks from '../views/Tasks.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
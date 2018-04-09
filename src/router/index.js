import Vue from 'vue';
import Router from 'vue-router';
import New from '@/components/New';
import Modules from '@/components/Modules';
import Module from '@/components/Module';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/modules',
      name: 'Modules',
      component: Modules
    },
    {
      path: '/module/:id',
      name: 'Module',
      component: Module,
      props: true
    },
    {
      path: '/new',
      name: 'New',
      component: New
    }
  ]
});

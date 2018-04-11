import Vue from 'vue';
import Router from 'vue-router';
import New from '@/components/New';
import Modules from '@/components/Modules';
import Module from '@/components/Module';
import Auth from '@/components/Auth';
import AuthSuccess from '@/components/AuthSuccess';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/modules',
      name: 'Modules',
      component: Modules
    },
    {
      path: '/modules/:id',
      name: 'Module',
      component: Module,
      props: true
    },
    {
      path: '/module/:id',
      redirect: '/modules/:id',
      props: true
    },
    {
      path: '/new',
      name: 'New',
      component: New
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/auth/success',
      name: 'AuthSuccess',
      component: AuthSuccess
    }
  ]
});

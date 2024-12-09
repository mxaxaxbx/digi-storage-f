import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  // auth routes
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/auth/index.vue'),
    children: [
      {
        path: 'confirmsession',
        name: 'confirmsession',
        component: () => import('../views/auth/confirmsession.vue'),
        meta: {
          title: 'Verificando sesión',
        },
      },
    ],
  },
  // app routes
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/app/index.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'app-home',
        // component: () => import('../views/app/home.vue'),
        meta: {
          title: 'Inicio',
        },
        redirect: { name: 'app-courses' },
      },
      {
        path: 'teachers',
        name: 'app-teachers',
        component: () => import('../views/app/teachers/index.vue'),
        children: [
          {
            path: '',
            name: 'app-teachers-list',
            component: () => import('../views/app/teachers/list.vue'),
            meta: {
              title: 'Docentes',
            },
          },
          {
            path: 'find',
            name: 'app-teachers-find',
            component: () => import('../views/app/teachers/find.vue'),
            meta: {
              title: 'Buscar docente',
            },
          },
          {
            path: 'new',
            name: 'app-teachers-new',
            component: () => import('../views/app/teachers/new.vue'),
            meta: {
              title: 'Nuevo docente',
            },
          },
          {
            path: ':id',
            name: 'app-teachers-detail',
            component: () => import('../views/app/teachers/detail.vue'),
            meta: {
              title: 'Detalle de docente',
            },
          },
        ],
        meta: {
          title: 'Docentes',
          requiresAuth: true,
        },
      },
      {
        path: 'courses',
        name: 'app-courses',
        component: () => import('../views/app/courses/index.vue'),
        meta: {
          title: 'Cursos',
          requiresAuth: true,
        },
        children: [
          {
            path: '',
            name: 'app-courses-list',
            component: () => import('../views/app/courses/list.vue'),
            meta: {
              title: 'Cursos',
            },
          },
          {
            path: 'add',
            name: 'app-courses-add',
            component: () => import('../views/app/courses/add.vue'),
            meta: {
              title: 'Agregar curso',
            },
          },
          {
            path: ':id',
            name: 'app-courses-detail',
            component: () => import('../views/app/courses/detail.vue'),
            meta: {
              title: 'Detalle de curso',
            },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Set title
  if (to.meta.title) {
    document.title = `${to.meta.title} - digi-edu`;
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token')) {
      const { VUE_APP_DIGI_USERS_F } = process.env;
      window.location.href = `${VUE_APP_DIGI_USERS_F}/auth/login?app=edu`;
    } else {
      next();
    }
  }
  next();
});

export default router;

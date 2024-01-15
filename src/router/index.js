import { createRouter, createWebHistory } from "vue-router";
//import HomeView from "../views/HomeView.vue";
import LoginView from "../views/Auth/LoginView.vue";
import ClientsView from "../views/ClientsView.vue";
import ProgramsView from "../views/ProgramsView.vue";
import AcademyView from "../views/AcademyView.vue";
import VideosView from "../views/Academy/VideosView.vue";
import SerialsView from "../views/Academy/SerialsView.vue";
import TrainersView from "../views/Academy/TrainersView.vue";
import AcademyClientView from "../views/Academy/ClientsView.vue";
import OutilsView from "../views/OutilsView.vue";
import ProfilTalent from "../views/Outils/ProfilTalent.vue";
import DecouverteView from "../views/Outils/DecouverteView.vue";
import BrefView from "../views/Outils/BrefView.vue";

import store from '../store/index.js';

const routes = [

  {
    path : '/',
    name : 'login',
    component : LoginView,
    meta : {
      layout : "Auth",
      
    }
  },
  {
    path: "/clients",
    name: "clients",
    component: ClientsView,
    meta : {
      requiredAuth : true,
      pageTitle : 'Clients'
    }
  },
  {
    path:"/talents",
    name:"talents",
    component: ProfilTalent,
    meta : {
      requiredAuth : true
    }
  },
  
  {
    path: "/programs",
    name: "programs",
    component: ProgramsView,
    meta : {
      requiredAuth : true
    }
  },
  {
    path: "/academy",
    name: "academy",
    component: AcademyView,
    children : [
      {
        path : 'videos',
        component : VideosView
      },
      {
        path : 'serials',
        component : SerialsView
      },
      {
        path : 'trainers',
        component : TrainersView
      },
      {
        path : 'clients',
        component : AcademyClientView
      }
    ],
    meta : {
      requiredAuth : true
    }
  },
  {
    path: "/outils",
    name: "outils",
    component: OutilsView,
    meta : {
      requiredAuth : true
    },

    children :[
      {
          path:"talents",
          name: "talents",
          component: ProfilTalent,
    },

    {
      path:"decouverte",
      name:"decouverte",
      component: DecouverteView,
    },
    {
      path:"bref",
      name:"bref",
      component: BrefView,
    },
    ]

  
  },
  
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

/*function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}*/

//routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next)=> {
  const loggedUser = store.getters.isAuthenticated;
  const user = store.getters.getCurrentUser;
  const require = to.matched.some(record => record.meta.requiredAuth)
  if (require && !loggedUser) {
    next({ name : 'login'})
  } else if(to.name == 'login' && loggedUser && user) {
    next({ name : 'clients'})
  } else next()
})

/*router.afterEach((to, from)=> {

})*/
export default router;

import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios';

import work from '../pages/workcontactletter/index'
//责任人确认页
import personliableConfirm from '../pages/workcontactletter/personliableConfirm'
import printDetail from '../pages/workcontactletter/printDetail'


import home from '../pages/home/index'
import projectPrint from '../pages/project_print/index'
import printPdf from '../pages/project_print/pdfIndex'

Vue.use(Router);

function checkLogin(next) {
  const token = sessionStorage.getItem('token');
  if (token) {
    next();
  } else {
    axios({
      url: '/hbzyPortal/user/get/detail',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
    }).then(res => {
      let user = res.data.resultData;
      if (user) {
        sessionStorage.setItem("userCode", user.empcode);
        sessionStorage.setItem("userName", user.pname);
        sessionStorage.setItem('token', user.empcode);
        sessionStorage.setItem('deptCode', user.organId);
        sessionStorage.setItem('deptName', user.organalias);
        next();
      } else {
        next('/');
      }
    }).catch(err => {

    })
  }
}

const defaultRouter = [{
    path: '/',
    name: 'Home',
    component: work,
    beforeEnter: (to, from, next) => {
      const isNormal = sessionStorage.getItem('isNormal');
      /** 如果为正式环境和生产环境时 需执行用户信息接口 */
      if (isNormal && isNormal === 'true' && process.env.NODE_ENV !== 'development') {
        checkLogin(next)
      } else {
        next();
      }
    },
  },
  {
    //责任人确认页
    path: '/personliableConfirm',
    name: 'personliableConfirm',
    component: personliableConfirm,
  }, 
  
  {
    path: '/printDetail',
    name: 'printDetail',
    component: printDetail,
  },  {
    path: '/printPdf',
    name: 'printPdf',
    component: projectPrint,
  },
  {
    path: '/projectPrint',
    name: 'projectPrint',
    component: printPdf,
  },
];

const wxRouter = [{
    path: '/printPdf',
    name: 'printPdf',
    component: projectPrint,
  },
  {
    path: '/projectPrint',
    name: 'projectPrint',
    component: printPdf,
  },
];

let routeArr = defaultRouter;
let wxNormal = sessionStorage.getItem('wxNormal');

/** 路由赋值 */
if (wxNormal && wxNormal === 'true') {
  routeArr = wxRouter;
} else if (wxNormal === 'false') {
  routeArr = defaultRouter
}

export default new Router({
  linkActiveClass: 'active',
  routes: routeArr
})

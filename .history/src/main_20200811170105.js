// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/** TODO IE兼容性 */
import 'babel-polyfill';
import promise from 'es6-promise'

promise.polyfill();

import Vue from 'vue'
import App from './App'


import globalVariable from "./assets/js/globalVariable";

Vue.prototype.GLOBAL = globalVariable;

Vue.prototype.isNormal = sessionStorage.getItem('isNormal');
Vue.prototype.wxNormal = sessionStorage.getItem('wxNormal');

import router from './router/index'

import './assets/fonts/iconfont.css'

/** TODO 公共js */
import app from './assets/js/app.js'

Vue.use(app);


import requestService from "./assets/js/requestService";

Vue.use(requestService);


/** TODO ElementUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

/** TODO 右键点击事件 */
import EVueContextmenu from 'e-vue-contextmenu'

Vue.use(EVueContextmenu);

import htmlToPdf from '@/components/utils/htmlToPdf'

Vue.use(htmlToPdf);

import windowPrint from '@/components/utils/windowPrint'

Vue.use(windowPrint);

/** TODO 公共css */
import '@/assets/css/common.css'

/** TODO 导入axios */
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  config => {
    config.url = encodeURI(config.url);
    // console.log(config)
    //对响应数据做些事
    if (!config.data.success) {
      return Promise.resolve(config);
    }
    return config;
  },
  error => {
    console.log('网络异常');
    return Promise.reject(error.response.data);

  });

/** TODO 日期格式转换 过滤器 */
Vue.filter('filterDateFormat', function (dataStr, pattern = '') {
  if (dataStr === '' || dataStr === null) {
    return '';
  }
  const dt = new Date(dataStr);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1).toString().padStart(2, '0');
  const d = dt.getDate().toString().padStart(2, '0');
  if (pattern.toLowerCase() === '.') {
    return `${y}.${m}.${d}`
  } else if (pattern.toLowerCase() === 'yyyy-mm-dd') {
    return `${y}-${m}-${d}`
  } else if (pattern.toLowerCase() === 'yyyy-mm') {
    return `${y}-${m}`
  } else if (pattern.toLowerCase() === 'yyyy/mm/dd') {
    return `${y}/${m}/${d}`
  } else if (pattern.toLowerCase() === 'yyyy/mm') {
    return `${y}/${m}`
  } else if (pattern.toLowerCase() === 'yyyy年mm月dd日') {
    return `${y}年${m}月${d}日`
  } else if (pattern.toLowerCase() === 'yyyy年mm月') {
    return `${y}年${m}月`
  } else {
    const hh = dt.getHours().toString().padStart(2, '0');
    const mm = dt.getMinutes().toString().padStart(2, '0');
    const ss = dt.getSeconds().toString().padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: {App},
  template: '<App/>',
  data() {
    return {}
  },
  mounted() {
    if (this.GLOBAL.isNormal === 'false') {
      if (this.$route.query.userName) {
        sessionStorage.setItem('userName', this.$route.query.userName);
        this.GLOBAL.userName = sessionStorage.getItem('userName');
      }
      if (this.$route.query.userCode) {
        sessionStorage.setItem('userCode', this.$route.query.userCode);
        this.GLOBAL.userCode = sessionStorage.getItem('userCode');
      }
    }

  },
  methods: {}
});


export default {
  install: function (Vue) {

    /** TODO 非dsm */
    Vue.prototype.requestDrmService = function (obj, that) {
      let timestamp = new Date().getTime();
      if (!obj.methods) {
        obj.methods = 'post' //默认
      }

      if (!obj.headerType) {
        obj.headerType = 'application/json;charset=utf-8' //默认
      }
      if (obj.serviceRoot.indexOf('?') > -1) {
        obj.serviceRoot = obj.serviceRoot + '&t=' + timestamp
      } else {
        obj.serviceRoot = obj.serviceRoot + '?t=' + timestamp
      }

      if (sessionStorage.getItem('userCode')) {
        obj.params.user_code = this.GLOBAL.userCode;
      }

      let baseUrl = '';

      if (process.env.NODE_ENV === 'development') {//开发环境
        if (this.isNormal === 'true') {//正式环境
          //baseUrl = '/api'
          //baseUrl = '/mock/52/kjy-work-letter'
          //baseUrl = '/wxdsm/services'
           baseUrl = 'https://weixintest.hbtobacco.cn'
          
        } else if (this.isNormal === 'false') {//测试环境
          baseUrl = '/bpi'
        }
      } else {//生产环境
        baseUrl = ''
      }
console.log("url:-------"+baseUrl + that.GLOBAL.serviceDsmPort + '/' + obj.serviceRoot);
var urlx="https://weixintest.hbtobacco.cn/wxdsm/services/admin/prodsm/WorkLetter/WorkLetterDeptTree";
return new Promise((resolve, reject) => {
        that.$axios({
          
          url: baseUrl + that.GLOBAL.serviceDsmPort + '/' + obj.serviceRoot,
          method: obj.methods,
          headers: {
            'Content-Type': obj.headerType
            // ,
            // 'Access-Control-Allow-Origin': '*'
          },
          data: obj.params
        }).then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err.data);
        })
      });
    };

    /** TODO 附件 - 上传文件 */
    Vue.prototype.uploadFile = function (obj, formData, that) {

      return new Promise((resolve, reject) => {

        let baseUrl = '';
        if (process.env.NODE_ENV === 'development') {//开发环境
          if (this.isNormal === 'true') {//正式环境
            baseUrl = '/api/'
          } else if (this.isNormal === 'false') {//测试环境
            baseUrl = '/bpi/'
          }
        } else {//生产环境
          baseUrl = this.GLOBAL.httpUrl
        }

        that.$axios.post(baseUrl + obj.serviceRoot, formData, {
          'Content-Type': 'multipart/form-data'
        }).then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err.data);
        })
      })
    };

    /** TODO 附件 - 删除文件 */
    Vue.prototype.requestFileDelete = function (obj, that) {
      let timestamp = new Date().getTime();

      if (!obj.methods) {
        obj.methods = 'post' //默认
      }
      if (!obj.headerType) {
        obj.headerType = 'application/json;charset=utf-8' //默认
      }
      if (obj.serviceRoot.indexOf('?') > -1) {
        obj.serviceRoot = obj.serviceRoot + '&t=' + timestamp
      } else {
        obj.serviceRoot = obj.serviceRoot + '?t=' + timestamp
      }

      let baseUrl = '';
      if (process.env.NODE_ENV === 'development') {//开发环境
        if (this.isNormal === 'true') {//正式环境
          baseUrl = '/api/'
        } else if (this.isNormal === 'false') {//测试环境
          baseUrl = '/bpi/'
        }
      } else {//生产环境
        baseUrl = this.GLOBAL.httpUrl
      }

      obj.serviceRoot = baseUrl + obj.serviceRoot;

      obj.params.user_code = this.GLOBAL.userCode;

      return new Promise((resolve, reject) => {
        that.$axios({
          url: obj.serviceRoot,
          method: obj.methods,
          headers: {
            'Content-Type': obj.headerType,
            'Access-Control-Allow-Origin': '*'
          },
          data: obj.params //真实入参
        }).then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err.data);
        })
      });
    };

    /** TODO 数据字典接口 */
    Vue.prototype.getSysDictList = function (_type, that, _state) {
      let serviceRoot = 'datadict/dictSearch';
      let baseUrl = '';
      if (process.env.NODE_ENV === 'development') {//开发环境
        if (this.isNormal === 'true') {//正式环境
          baseUrl = '/api'
        } else if (this.isNormal === 'false') {//测试环境
          baseUrl = '/bpi'
        }
      } else {//生产环境
        baseUrl = ''
      }

      let params = {category_code: _type};

      params.user_code = this.GLOBAL.userCode;

      return new Promise((resolve, reject) => {
        that.$axios({
          url: baseUrl + that.GLOBAL.serviceDsmPort + '/' + serviceRoot,
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          },
          data: params //真实入参
        }).then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err.data);
        })
      });
    };

    /**     ****************************************************************************************************     */

  }
}

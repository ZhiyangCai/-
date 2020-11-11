<!-- 用户确认单(code=14)  打印单 edit by xuyy -->
<template>
  <div id="user_sign_form">
    <div class="project_form1">
      <table style="width: 100%;">
        <tr>
          <td>
            <div class="project_title1" v-html="projectTitle"></div>
          </td>
          <td class="qrcode_td">
            <qrcode></qrcode>
          </td>
        </tr>

      </table>
      <table cellpadding="0" cellspacing="0" style="width: 100%;">
        <tr>
          <td colspan="2" class="td_text">
            <div><span class="text_bold">项目名称：</span><span>{{project_name}}</span></div>
          </td>
          <td colspan="2" class="td_text" style="text-align: right;">
            <div><span class="text_bold">项目编号：</span><span>{{project_code}}</span></div>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="td_text text_bold" style="text-align: center;border: 1px solid;border-bottom-width: 0">
              {{list_sub_title}}功能清单
            </div>
          </td>
        </tr>
      </table>

      <table class="tree_table_p" cellpadding="0" cellspacing="0" style="width: 100%;">
        <tr>
          <td colspan="4">
            <table class="tree_table" cellpadding="0" cellspacing="0" style="width: 100%;border: 1px solid;">
              <tr style="text-align: center;">
                <th style="width:100px;">
                  <div>序号</div>
                </th>
                <th style="min-width:80px;">
                  <div>一级菜单</div>
                </th>
                <th v-if="showLevel2" style="min-width:80px;">
                  <div>二级菜单</div>
                </th>
                <th v-if="showLevel3" style="min-width:80px;">
                  <div>三级菜单</div>
                </th>
                <th v-if="sign_type==='1'" style="min-width:100px;">
                  <div>用户确认签字</div>
                </th>
              </tr>

              <tr v-for="(tree,i) in treeData">
                <td>
                  <div>{{i+1}}</div>
                </td>
                <td v-if="tree.rowspan" :rowspan="tree.rowspan">
                  <div>{{tree.func_name}}</div>
                </td>
                <td v-if="showLevel2" v-show="tree.rowspan1" :rowspan="tree.rowspan1">
                  <div>{{tree.func_name_level1}}</div>
                </td>
                <td v-if="showLevel3">{{tree.func_name_level2}}</td>
                <td v-if="sign_type==='1'">
                  <div>
                      <span v-for="(user,ii) in tree.users">
                        <span>{{user.user_name}}</span>
                        <span v-if="ii!==tree.users.length-1">；</span>
                      </span>
                  </div>
                </td>
              </tr>

              <tr v-if="treeData.length===0||treeData.length===1">
                <td></td>
                <td>&nbsp;</td>
                <td v-if="showLevel2"></td>
                <td v-if="showLevel3"></td>
                <td v-if="sign_type==='1'"></td>
              </tr>
              <tr v-if="treeData.length===1">
                <td></td>
                <td>&nbsp;</td>
                <td v-if="showLevel2"></td>
                <td v-if="showLevel3"></td>
                <td v-if="sign_type==='1'"></td>
              </tr>
              <tr v-if="treeData.length===2">
                <td></td>
                <td>&nbsp;</td>
                <td v-if="showLevel2"></td>
                <td v-if="showLevel3"></td>
                <td v-if="sign_type==='1'"></td>
              </tr>

            </table>
          </td>
        </tr>
        <tr class="last_tr" v-if="sign_type==='2'">
          <th class="td_label" style="width: 110px;">用户确认签字</th>
          <td colspan="3" class="td_text">
            <div style="min-height: 40px;">
                <span v-for="(user,i) in func_user_list">
                  <span>{{user.user_name}}</span>
                  <span v-if="i!==func_user_list.length-1">；</span>
                </span>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import qrcode from '@/components/qrcode/index'

  export default {
    name: "user_sign_form",
    props: ['projectId', 'code'],
    components: {
      qrcode
    },
    data() {
      return {
        /** 表单抬头 */
        projectTitle: '',//表单抬头head
        sub_title: '',//表单类型拼接
        project_title: '用户确认单',//表单类型
        projectCode: '',//表单编码
        print: false,//是否打印单页面
        bill_type: '',//评测阶段

        list_sub_title: '',//table 抬头
        project_name: '',//项目名称
        project_code: '',//项目编号

        /** 功能清单 */
        sign_type: '',//签字模版 sign_type=1 分功能签字 sign_type=2 汇总签字
        func_user_list: [],//汇总签字 用户确认签字
        treeData: [],//功能清单数组 将树状转成table
        treeDataTotal: [],//功能清单数组 将树状转成平级汇总
        showLevel2: false,//treeData 是否有二级菜单
        showLevel3: false,//treeData 是否有三级菜单

      }
    },
    mounted() {
      if (this.$route.name === 'projectPrint') {
        this.print = true
      } else {
        this.print = false
      }
      this.getFormData();
    },
    methods: {
      /** 根据表单id 获取表单信息 */
      getFormData() {
        this.project_title = this.$parent.getProjectTitle(this.code).title;
        // this.projectTitle = this.$parent.projectTitle + this.sub_title + this.project_title;

        this.$parent.loadingFun();
        let obj = {};
        obj.params = {id: this.projectId};
        obj.serviceRoot = 'project/userConfirmedSignQuery';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          this.$parent.loadingCloseFun();
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;
            this.project_name = result_data.project_name;
            this.project_code = result_data.project_code;
            this.supplier = result_data.supplier;
            this.project_manager = result_data.project_manager_name;
            this.project_start_date = this.appDateFormat(result_data.project_start_date, 'yyyy年mm月dd日');
            this.project_end_date = this.appDateFormat(result_data.project_end_date, 'yyyy年mm月dd日');
            this.sys_type = result_data.sys_type;
            this.biz_user = result_data.confirm_users.filter(item => item.user_type === '2');
            this.msg_user = result_data.confirm_users.filter(item => item.user_type === '1');

            this.contract_id = result_data.contract_id;
            this.contract_name = result_data.contract_name;
            this.contract_code = result_data.contract_code;
            this.multi_contract = result_data.multi_contract;

            this.sign_type = result_data.sign_type;

            if (result_data.sign_type === '2') {
              this.func_user_list = result_data.confirm_users.filter(item => item.user_type === '4').filter(item => item.sign === 'Y');
            }

            this.bill_type = result_data.sign_stage;
            if (this.bill_type === 'XQ') {
              this.sub_title = '需求';
              this.list_sub_title = '需求';
            } else if (this.bill_type === 'SJ') {
              this.sub_title = '设计';
              this.list_sub_title = '设计';
            } else if (this.bill_type === 'SX') {
              this.sub_title = '上线';
              this.list_sub_title = '上线';
            } else if (this.bill_type === 'YS') {
              this.sub_title = '验收';
              this.list_sub_title = '系统';
            }

            this.projectTitle = this.$parent.projectTitle + this.sub_title + this.project_title;
            this.transformTree(result_data.func_list);

          }
        }).catch(err => {
          console.log(err);
        })
      },
      /** 功能清单数组 将树状转成平级汇总 */
      getTreeDataMenu(data) {
        let result = [];
        result = result.concat(data);
        data.map(el => {
          if (el.func_list) {
            result = result.concat(el.func_list);
            el.func_list.map(ele => {
              if (ele.func_list) {
                result = result.concat(ele.func_list)
              }
            })
          }
        });
        return result;
      },
      /** 树状转成table 并且合并单元格 */
      transformTree(data) {
        this.treeDataTotal = this.getTreeDataMenu(data);
        let treeLevel1 = this.treeDataTotal.filter(item => item.level === 1);
        let treeLevel2 = this.treeDataTotal.filter(item => item.level === 2);
        let treeLevel3 = this.treeDataTotal.filter(item => item.level === 3);

        if (treeLevel2.length === 0) {//只有一级菜单
          this.showLevel2 = false;
          this.showLevel3 = false;
        }
        if (treeLevel2.length > 0 && treeLevel3.length === 0) {//有一级菜单和二级菜单但是没有三级功能
          this.showLevel2 = true;
          this.showLevel3 = false;

        }

        if (treeLevel3.length > 0) {//三级都有
          this.showLevel2 = true;
          this.showLevel3 = true;
        }
        data.map((el, iii) => {
          let params_level = {
            func_name: el.func_name,
            func_name_level1: '',
            func_name_level2: '',
            pid: el.id,
            level: 1
          };

          if (this.sign_type === '1') {
            params_level.users = el.users.filter(item => item.sign === 'Y')
          }
          if (el.func_list && el.func_list.length > 0) {
            el.func_list.map((ele, i) => {
              let params_level2 = {
                func_name: el.func_name,
                func_name_level1: ele.func_name,
                func_name_level2: '',
                level: 2
              };

              if (this.sign_type === '1') {
                let users = [];
                users = users.concat(el.users).concat(ele.users).concat(ele.func_list && ele.func_list.length > 0 ? ele.func_list[0].users : []);
                let res = new Map();
                users = users.filter((arr) => !res.has(arr.user_id) && res.set(arr.user_id, 1));
                params_level2.users = users.filter(item => item.sign === 'Y');
              }
              if (i === 0) {
                if (treeLevel2.length > 0 && treeLevel3.length === 0) {//有一级菜单和二级菜单但是没有三级功能
                  params_level.func_name_level1 = ele.func_name;
                  params_level.id = ele.id;
                  if (this.sign_type === '1') {
                    let users = [];
                    users = users.concat(el.users).concat(ele.users);
                    let res = new Map();
                    users = users.filter((arr) => !res.has(arr.user_id) && res.set(arr.user_id, 1));
                    params_level.users = users.filter(item => item.sign === 'Y');
                  }
                  this.treeData.push(params_level)
                }
                if (treeLevel3.length > 0) {//三级都有
                  params_level.func_name_level1 = ele.func_name;
                  params_level.func_name_level2 = ele.func_list && ele.func_list.length > 0 ? ele.func_list[0].func_name : '';
                  params_level.id = ele.id;
                  if (this.sign_type === '1') {
                    let users = [];
                    users = users.concat(el.users).concat(ele.users).concat(ele.func_list && ele.func_list.length > 0 ? ele.func_list[0].users : []);
                    let res = new Map();
                    users = users.filter((arr) => !res.has(arr.user_id) && res.set(arr.user_id, 1));
                    params_level.users = users.filter(item => item.sign === 'Y');
                  }
                  this.treeData.push(params_level);
                }
              } else {
                params_level2.id = ele.id;
                params_level2.func_name_level2 = ele.func_list && ele.func_list.length > 0 ? ele.func_list[0].func_name : '';
                params_level2.pid = el.id;
                this.treeData.push(params_level2)
              }
              if (ele.func_list && ele.func_list.length > 0) {
                ele.func_list.map((elee, ii) => {
                  let params_level3 = {
                    func_name: el.func_name,
                    func_name_level1: ele.func_name,
                    func_name_level2: elee.func_name,
                    id: ele.id,
                    level: 3
                  };
                  if (this.sign_type === '1') {
                    let users = [];
                    users = users.concat(el.users).concat(ele.users && ele.users.length > 0 ? ele.users : []).concat(elee.users && elee.users.length > 0 ? elee.users : []);
                    let res = new Map();
                    users = users.filter((arr) => !res.has(arr.user_id) && res.set(arr.user_id, 1));
                    params_level3.users = users.filter(item => item.sign === 'Y');
                  }
                  if (ii === 0) {
                  } else {
                    params_level3.pid = el.id;
                    this.treeData.push(params_level3)
                  }
                })
              }
            })
          } else {
            this.treeData.push(params_level)
          }

        });

        let tree_id = '';
        let tree_pid = '';
        this.treeData.map(el => {
          if (el.pid) {
            if (tree_pid !== el.pid) {
              el.rowspan = this.treeData.filter(item => item.pid === el.pid).length;
              tree_pid = el.pid
            }
          }

          if (el.id) {
            if (tree_id !== el.id) {
              el.rowspan1 = this.treeData.filter(item => item.id === el.id).length;
              tree_id = el.id;
            }
          } else {
            el.rowspan1 = 1;
          }

        });

      }
    }
  }
</script>

<style scoped>
  .tree_table tr th {
    padding: 5px;
    border-left: 1px solid;
    font-size: 14px;
  }

  .tree_table tr th:first-child {
    border-left-width: 0;
  }

  .tree_table tr td {
    padding: 5px;
    border: 1px solid !important;
    border-bottom-width: 0 !important;
    border-right-width: 0 !important;
    font-size: 14px;
  }

  .tree_table tr td:first-child {
    text-align: center;
    border-left-width: 0 !important;
  }

  .last_tr th {
    border: 1px solid;
    border-top-width: 0;
    border-right-width: 0;
  }

  .last_tr td {
    border: 1px solid;
    border-top-width: 0;
  }

  .tree_table_p tr td, th {
    font-size: 14px;
  }

  .tree_table_p tr td, th div, span {
    font-size: 14px;
  }
</style>

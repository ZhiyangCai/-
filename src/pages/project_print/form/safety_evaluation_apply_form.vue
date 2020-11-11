<!-- 信息安全评测申请单(code=9) 打印单 edit by xuyy -->
<template>
  <div id="safety_evaluation_apply_form">
    <div class="project_form1">
      <table style="width: 100%;">
        <tr>
          <td>
            <div class="project_title1">{{projectTitle}}{{project_title}}</div>
          </td>
          <td class="qrcode_td">
            <qrcode></qrcode>
          </td>
        </tr>
      </table>
      <div class="form_table">
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td class="td_label">项目名称</td>
            <td>
              <div class="td_text">{{project_name}}</div>
            </td>
            <td class="td_label">项目编号</td>
            <td>
              <div class="td_text">{{project_code}}</div>
            </td>
          </tr>

          <tr>
            <td class="td_label">合同名称</td>
            <td>
              <div class="td_text">{{contract_name}}</div>
            </td>
            <td class="td_label">合同编号</td>
            <td>
              <div class="td_text" style="min-width: 110px;">{{contract_code}}</div>
            </td>
          </tr>

          <tr>
            <td class="td_label">申请单位/部门</td>
            <td colspan="3">
              <div class="td_text">{{apply_dept}}</div>
            </td>
          </tr>

          <tr>
            <td class="td_label">实施单位</td>
            <td colspan="3">
              <div class="td_text">{{supplier_name}}</div>
            </td>
          </tr>

          <tr>
            <td class="td_label">系统名称</td>
            <td colspan="3">
              <div class="td_text">{{system_name}}</div>
            </td>
          </tr>
          <tr>
            <td class="td_label">测评类型</td>
            <td colspan="3">
              <div class="td_text">{{evaluation_names}}</div>
            </td>
          </tr>
          <tr>
            <td class="td_label">测评阶段</td>
            <td>
              <div class="td_text">{{bill_type}}</div>
            </td>
            <td class="td_label">等级保护级别</td>
            <td>
              <div class="td_text">{{safe_level}}</div>
            </td>
          </tr>

          <tr>
            <td class="td_label">申请时间</td>
            <td>
              <div class="td_text">{{apply_date|filterDateFormat('yyyy年mm月dd日')}}</div>
            </td>
            <td class="td_label">计划完成时间</td>
            <td>
              <div class="td_text">{{plan_date|filterDateFormat('yyyy年mm月dd日')}}</div>
            </td>
          </tr>

          <tr>
            <td class="td_label" style="width:110px;">供应商项目经理</td>
            <td>
              <div class="td_text">{{link_user}}</div>
            </td>
            <td class="td_label">联系电话</td>
            <td>
              <div class="td_text">{{link_phone}}</div>
            </td>
          </tr>

          <tr>
            <td class="td_label">系统访问url/客户端/APP下载地址</td>
            <td colspan="3">
              <div class="td_text">
                <table class="form_sub_table1" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width:150px;vertical-align: top;">系统内网地址：</td>
                    <td>
                      <div class="td_text" style="padding-top: 0;" v-html="in_net">}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top;padding-top:5px;">系统外网地址：</td>
                    <td>
                      <div class="td_text" v-html="out_net"></div>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top;padding-top:5px;">系统服务器IP：</td>
                    <td>
                      <div class="td_text" v-html="server_ip"></div>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top;padding-top:5px;">客户端/APP下载地址：</td>
                    <td>
                      <div class="td_text" v-html="app_download"></div>
                    </td>
                  </tr>
                </table>

              </div>
            </td>
          </tr>

          <tr>
            <td class="td_label" style="width:25px;">业务经办人</td>
            <td>
              <div class="td_text">{{biz_user}}</div>
            </td>
            <td class="td_label" style="width:25px;">信息经办人</td>
            <td>
              <div class="td_text">{{msg_user}}</div>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <div class="td_text">
                <div class="text_bold">网络安全管理员处理情况：</div>
                <div style="min-height: 120px;" v-html="web_user"></div>
                <el-row>
                  <el-col class="text_bold" style="width: 140px;">部门负责人（签名）：</el-col>
                  <el-col style="width: calc(100% - 140px)">
                    <el-row>
                      <el-col :span="12" v-for="(user,i) in web_user_ids" :key="'web_user'+i">
                        <el-row>
                          <el-col :span="9"><span>{{user.user_name}}</span></el-col>
                          <el-col :span="12"><span>{{user.sign_date|filterDateFormat('.')}}</span></el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </td>
          </tr>

        </table>

      </div>
    </div>
  </div>
</template>

<script>
  import qrcode from '@/components/qrcode/index'//二维码生成组件

  export default {
    name: "safety_evaluation_apply_form",
    props: ['projectId', 'code'],
    components: {
      qrcode
    },
    data() {
      return {
        /** 表单抬头 */
        projectTitle: '',//表单抬头head
        projectCode: '',//表单编码
        project_title: '信息安全评测申请单',//表单类型
        print: false,//是否打印单页面

        /** 项目基本信息 */
        project_name: '',//项目名称
        project_code: '',//项目编号
        contract_code: '',//合同编号
        contract_name: '',//合同名称
        multi_contract: 'N',//是否多合同

        apply_dept: '',//申请单位/部门
        supplier_name: '',//实施单位
        system_name: '',//系统名称
        evaluation_names: '',//测评类型
        bill_type: '',//测评阶段
        safe_level: '',//等级保护级别
        apply_date: '',//申请时间
        plan_date: '',//计划完成时间
        link_user: '',//供应商项目经理
        link_phone: '',//联系电话

        in_net: '',//系统内网地址
        out_net: '',//系统外网地址
        server_ip: '',//系统服务器IP
        app_download: '',//客户端/APP下载地址

        biz_user: '',//业务经办人
        msg_user: [],//信息经办人
        indp_user: '',//信息化部门 暂无
        indp_user_ids: [],//信息化部门列表 暂无
        apps_user: '',//应用系统主管部门 暂无
        apps_user_ids: [],//应用系统主管部门列表 暂无
        web_user: '',//网络安全管理员
        web_user_ids: [],//网络安全管理员列表
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
        this.projectTitle = this.$parent.projectTitle;
        this.projectCode = this.$parent.getProjectCode(this.code).label;
        this.project_title = this.$parent.getProjectTitle(this.code).title;

        this.$parent.loadingFun();
        let obj = {};
        obj.params = {id: this.projectId};
        obj.serviceRoot = 'project/querySafeApplyById';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          this.$parent.loadingCloseFun();
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;
            this.project_name = result_data.project_name;
            this.project_code = result_data.project_code;
            this.sys_name = result_data.sys_name;
            this.safe_level = result_data.safe_level;
            this.bill_type = result_data.stage_name;

            this.contract_name = result_data.contract_name;
            this.contract_code = result_data.contract_code;

            this.supplier_name = result_data.supplier_name;

            this.apply_dept = result_data.apply_unit_dept_name;

            this.system_name = result_data.system_name;

            this.evaluation_names = result_data.evaluation_names;

            this.apply_date = result_data.apply_date;
            this.plan_date = result_data.plan_date;
            this.link_user = result_data.link_user;
            this.link_phone = result_data.link_phone;

            this.in_net = result_data.in_net1;
            this.out_net = result_data.out_net1;
            this.app_download = result_data.app_download1;
            this.server_ip = result_data.server_ip1;

            this.biz_user = '';
            this.msg_user = '';
            this.indp_user_ids = [];
            this.apps_user_ids = [];
            this.web_user_ids = [];
            this.indp_user = '';
            this.apps_user = '';
            this.web_user = '';
            result_data.confirm_users.map(el => {
              el.message = el.message || '';
              if (el.user_type === 'biz') {
                this.biz_user += el.user_name + '；'
              } else if (el.user_type === 'info') {
                this.msg_user += el.user_name + '；'
              } else if (el.user_type === 'indp') {//信息化部门
                if (el.sign === 'Y') {
                  if (el.message !== '') {
                    this.indp_user += el.message + '；';
                  }
                  this.indp_user_ids.push(el);
                }

              } else if (el.user_type === 'apps') {//应用系统主管部门
                if (el.sign === 'Y') {
                  if (el.message !== '') {
                    this.apps_user += el.message + '；';
                  }
                  this.apps_user_ids.push(el);
                }

              } else if (el.user_type === 'web') {//网络安全管理员
                if (el.sign === 'Y') {
                  if (el.message !== '') {
                    this.web_user += el.message + '；';
                  }
                  this.web_user_ids.push(el);
                }

              }
            });

            if (this.indp_user.length > 0) {
              this.indp_user = this.indp_user.substring(0, this.indp_user.length - 1);
            }

            if (this.apps_user.length > 0) {
              this.apps_user = this.apps_user.substring(0, this.apps_user.length - 1);
            }

            if (this.web_user.length > 0) {
              this.web_user = this.web_user.substring(0, this.web_user.length - 1);
            }

            if (this.biz_user.length > 0) {
              this.biz_user = this.biz_user.substring(0, this.biz_user.length - 1)
            }

            if (this.msg_user.length > 0) {
              this.msg_user = this.msg_user.substring(0, this.msg_user.length - 1)
            }

          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>

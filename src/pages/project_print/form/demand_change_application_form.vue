<template>
  <div id="demand_change_application_form">
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
      <div class="project_code1" style="text-align: right;">{{projectCode}}</div>
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
              <div class="td_text" :style="{'min-width':print?'110px':'140px'}">{{contract_code}}</div>
            </td>
          </tr>
          <tr>
            <td class="td_label">系统名称</td>
            <td>
              <div class="td_text">{{sys_name}}</div>
            </td>
            <td class="td_label">提出时间</td>
            <td>
              <div class="td_text">{{req_date|filterDateFormat('yyyy年mm月dd日')}}</div>
            </td>
          </tr>
          <tr>
            <td class="td_label">需求变更描述</td>
            <td colspan="3">
              <div class="td_text" style="min-height: 200px;" v-html="content"></div>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <div class="td_text">
                <div class="text_bold">业务部门确认意见：</div>
                <div class="td_text" style="min-height: 80px;padding: 5px 5px 5px 25px;"
                     v-html="biz_about_dept_name_msg"></div>
              </div>

              <el-row style="line-height: 20px;padding-bottom: 10px;">
                <el-col style="width: 170px;padding-left: 5px;"><span class="text_bold">部门负责人（签名）：</span></el-col>
                <el-col style="width: calc(100% - 170px);padding-right: 50px;">
                  <el-row>
                    <el-col :span="12" v-for="(user,i) in biz_about_dept_name_ids" :key="'exec_name_'+i"
                            v-if="user.sign==='Y'">
                      <el-row>
                        <el-col :span="9"><span>{{user.user_name}}</span></el-col>
                        <el-col :span="12"><span>{{user.sign_date|filterDateFormat('.')}}</span></el-col>
                      </el-row>
                    </el-col>
                  </el-row>

                </el-col>
              </el-row>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <div class="td_text">
                <div class="text_bold">供应商确认意见：</div>
                <div class="td_text" style="min-height: 80px;padding: 5px 5px 5px 25px;"
                     v-html="provider_name_msg"></div>
              </div>

              <el-row style="line-height: 20px;padding-bottom: 10px;">
                <el-col style="width: 170px;padding-left: 5px;"><span class="text_bold">部门负责人（签名）：</span></el-col>
                <el-col style="width: calc(100% - 170px);padding-right: 50px;">
                  <el-row>
                    <el-col :span="12" v-for="(user,i) in provider_name_ids" :key="'exec_name_'+i"
                            v-if="user.sign==='Y'">
                      <el-row>
                        <el-col :span="9"><span>{{user.user_name}}</span></el-col>
                        <el-col :span="12"><span>{{user.sign_date|filterDateFormat('.')}}</span></el-col>
                      </el-row>
                    </el-col>
                  </el-row>

                </el-col>
              </el-row>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <div class="td_text">
                <div class="text_bold">项目执行部门确认意见：</div>
                <div class="td_text" style="min-height: 80px;padding: 5px 5px 5px 25px;"
                     v-html="project_execute_dept_name_msg"></div>
              </div>

              <el-row style="line-height: 20px;padding-bottom: 10px;">
                <el-col style="width: 170px;padding-left: 5px;"><span class="text_bold">部门负责人（签名）：</span></el-col>
                <el-col style="width: calc(100% - 170px);padding-right: 50px;">
                  <el-row>
                    <el-col :span="12" v-for="(user,i) in project_execute_dept_name_ids" :key="'exec_name_'+i"
                            v-if="user.sign==='Y'">
                      <el-row>
                        <el-col :span="9"><span>{{user.user_name}}</span></el-col>
                        <el-col :span="12"><span>{{user.sign_date|filterDateFormat('.')}}</span></el-col>
                      </el-row>
                    </el-col>
                  </el-row>

                </el-col>
              </el-row>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import qrcode from '@/components/qrcode/index'

  export default {
    name: "demand_change_application_form",
    props: ['projectId', 'code'],
    components: {
      qrcode
    },
    data() {
      return {
        projectTitle: '',
        projectCode: '',
        project_title: '需求变更申请单',
        project_name: '',
        project_code: '',
        contract_id: '',
        contract_code: '',
        contract_name: '',
        multi_contract: 'N',
        sys_name: '',
        req_date: '',
        content: '',
        project_execute_dept_name_msg: '',
        project_execute_dept_name_ids: [],
        biz_about_dept_name_msg: '',
        biz_about_dept_name_ids: [],
        provider_name_msg: '',
        provider_name_ids: [],
        print: false
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
        obj.serviceRoot = 'project/queryRequirementChangeById';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          this.$parent.loadingCloseFun();
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;
            this.project_name = result_data.project_name;
            this.project_code = result_data.project_code;
            this.sys_name = result_data.sys_name;
            this.req_date = result_data.req_date;
            this.content = result_data.content1;

            this.contract_id = result_data.contract_id;
            this.contract_name = result_data.contract_name;
            this.contract_code = result_data.contract_code;
            this.multi_contract = result_data.multi_contract;

            this.project_execute_dept_name_ids = [];
            this.project_execute_dept_name_msg = '';

            result_data.project_execute_dept_name.map(el => {
              el.user_name = el.dept_user_name;
              el.dept_type = el.type;
              el.msg = el.msg || '';
              if (el.msg !== '') {
                this.project_execute_dept_name_msg += el.msg + '<br>'
              }
              this.project_execute_dept_name_ids.push(el);
            });

            if (this.project_execute_dept_name_msg.length > 4) {
              this.project_execute_dept_name_msg = this.project_execute_dept_name_msg.substring(0, this.project_execute_dept_name_msg.length - 4)
            }

            this.biz_about_dept_name_ids = [];
            this.biz_about_dept_name_msg = '';
            result_data.biz_about_dept_name.map(el => {
              el.user_name = el.dept_user_name;
              el.dept_type = el.type;
              el.msg = el.msg || '';
              if (el.msg !== '') {
                this.biz_about_dept_name_msg += el.msg + '<br>'
              }
              this.biz_about_dept_name_ids.push(el)
            });

            if (this.biz_about_dept_name_msg.length > 4) {
              this.biz_about_dept_name_msg = this.biz_about_dept_name_msg.substring(0, this.biz_about_dept_name_msg.length - 4)
            }

            this.provider_name_ids = [];
            this.provider_name_msg = '';
            result_data.provider_name.map(el => {
              el.user_name = el.dept_user_name;
              el.dept_type = el.type;
              el.msg = el.msg || '';
              el.sign = 'Y';
              if (el.msg !== '') {
                this.provider_name_msg += el.msg + '<br>'
              }
              this.provider_name_ids.push(el)
            });

            if (this.provider_name_msg.length > 4) {
              this.provider_name_msg = this.provider_name_msg.substring(0, this.provider_name_msg.length - 4)
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

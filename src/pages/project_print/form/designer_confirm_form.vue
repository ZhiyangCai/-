<!-- 需求分析报告确认单(code=1),设计报告确认单(code=3) edit by xuyy -->
<template>
  <div id="designer_confirm_form">
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

      <!--      <div class="project_title1">{{projectTitle}}{{project_title}}</div>-->
      <div class="project_code1" style="text-align: right;">{{projectCode}}</div>
      <div class="form_table">
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td class="td_label1">项目名称</td>
            <td>
              <div class="td_text">{{project_name}}</div>
            </td>
            <td class="td_label1">项目编号</td>
            <td>
              <div class="td_text">{{project_code}}</div>
            </td>
          </tr>
          <tr>
            <td class="td_label1">合同名称</td>
            <td>
              <div class="td_text">{{contract_name}}</div>
            </td>
            <td class="td_label1">合同编号</td>
            <td>
              <div class="td_text" :style="{'min-width':print?'110px':'140px'}">{{contract_code}}</div>
            </td>
          </tr>
          <tr v-if="code==='3'">
            <td colspan="4">
              <div>
                <div class="text_title">项目执行部门确认意见:</div>
                <div class="td_text" style="padding: 0 5px 5px 30px;min-height: 80px;"
                     v-html="project_execute_dept_desc"></div>
              </div>
              <el-row style="line-height: 20px;padding-bottom: 10px;">
                <el-col style="width: 170px;padding-left: 30px;"><span class="text_bold">部门负责人（签名）：</span></el-col>
                <el-col style="width: calc(100% - 170px);padding-right: 50px;">
                  <el-row>
                    <el-col :span="12" v-for="(user,i) in project_execute_dept_name" :key="'exec_name_'+i"
                            v-if="user.sign==='Y'">
                      <el-row>
                        <el-col :span="9"><span>{{user.dept_user_name}}</span></el-col>
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
              <div>
                <div class="text_title">项目业务主管部门确认意见:</div>
                <div class="td_text" style="padding: 0 5px 5px 30px;min-height: 80px;"
                     v-html="biz_comp_dept_desc"></div>
              </div>
              <el-row style="line-height: 20px;padding-bottom: 10px;">
                <el-col style="width: 170px;padding-left: 30px;"><span class="text_bold">部门负责人（签名）：</span></el-col>
                <el-col style="width: calc(100% - 170px);padding-right: 50px;">
                  <el-row>
                    <el-col :span="12" v-for="(user,i) in biz_comp_dept_name" :key="'comp_name_'+i"
                            v-if="user.sign==='Y'">
                      <el-row>
                        <el-col :span="9"><span>{{user.dept_user_name}}</span></el-col>
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
              <div class="text_title">相关业务部门确认意见:</div>
              <table class="form_sub_table" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <th>
                    <div class="text_bold" style="min-width: 60px;">部门</div>
                  </th>
                  <th>
                    <div class="text_bold" style="min-width: 80px;">部门负责人(签名）</div>
                  </th>
                  <th>
                    <div class="text_bold" style="min-width: 200px;">意见</div>
                  </th>
                </tr>
                <tr v-for="(user,i) in biz_about_dept_name" :key="'biz_about_'+i">
                  <td>
                    <div style="word-break: break-word;">{{user.dept_name|deptName}}</div>
                  </td>
                  <td>
                    <div style="word-break: break-word;">{{user.dept_user_name}}</div>
                  </td>
                  <td>
                    <div style="word-break: break-word;">{{user.msg}}</div>
                  </td>
                </tr>
                <tr v-if="biz_about_dept_name.length===0">
                  <td>&nbsp;</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-if="biz_about_dept_name.length===0||biz_about_dept_name.length===1">
                  <td>&nbsp;</td>
                  <td></td>
                  <td></td>
                </tr>

              </table>
            </td>
          </tr>
          <tr v-if="code==='1'">
            <td colspan="4">
              <div>
                <div class="text_title">项目执行部门确认意见:</div>
                <div class="td_text" style="padding: 0 5px 5px 30px;min-height: 80px;"
                     v-html="project_execute_dept_desc"></div>
              </div>
              <el-row style="line-height: 20px;padding-bottom: 10px;">
                <el-col style="width: 170px;padding-left: 30px;"><span class="text_bold">部门负责人（签名）：</span></el-col>
                <el-col style="width: calc(100% - 170px);padding-right: 50px;">
                  <el-row>
                    <el-col :span="12" v-for="(user,i) in project_execute_dept_name" :key="'exec_name_'+i"
                            v-if="user.sign==='Y'">
                      <el-row>
                        <el-col :span="9"><span>{{user.dept_user_name}}</span></el-col>
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
              <div>
                <div class="text_title">供应商确认意见:</div>
                <div class="td_text" style="padding: 0 5px 5px 30px;min-height: 80px;"
                     v-html="provider_name_desc"></div>
              </div>

              <el-row style="line-height: 20px;padding-bottom: 10px;">
                <el-col style="width: 170px;padding-left: 30px;"><span class="text_bold">项目经理（签名）：</span></el-col>
                <el-col style="width: calc(100% - 170px);padding-right: 50px;">
                  <el-row>
                    <el-col :span="12" v-for="(user,i) in provider_name" :key="'comp_name_'+i"
                            v-if="user.sign==='Y'">
                      <el-row>
                        <el-col :span="9"><span>{{user.dept_user_name}}</span></el-col>
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
  import qrcode from '@/components/qrcode/index'//二维码生成组件

  export default {
    name: "designer_confirm_form",
    props: ['projectId', 'code'],
    components: {
      qrcode
    },
    data() {
      return {
        /** 表单抬头 */
        projectTitle: '',//表单抬头head
        projectCode: '',//表单编码
        project_title: '设计报告确认单',//表单类型
        print: false,//是否打印单页面

        /** 项目基本信息 */
        project_name: '',//项目名称
        project_code: '',//项目编号
        contract_code: '',//合同编号
        contract_name: '',//合同名称
        multi_contract: 'N',//是否多合同

        biz_about_dept_name: [],//相关业务部门确认
        biz_comp_dept_name: [],//项目业务主管部门确认
        biz_comp_dept_desc: '',//项目业务主管部门确认意见
        project_execute_dept_name: [],//项目执行部门确认
        project_execute_dept_desc: '',//项目执行部门确认意见
        provider_name: [],//供应商确认
        provider_name_desc: '',//供应商确认意见
      }
    },
    filters: {
      /** 相关业务部门确认 部门过滤 */
      deptName(val) {
        let str_arr = val.split('/');
        return str_arr[0]
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
        if (this.code === '1') {
          obj.serviceRoot = 'project/requireReportQuery';
        } else if (this.code === '3') {
          obj.serviceRoot = 'project/designReportByIdQuery';
        }

        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          this.$parent.loadingCloseFun();
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;
            this.project_name = result_data.project_name;
            this.project_code = result_data.project_code;
            this.biz_about_dept_name = result_data.biz_about_dept_name;
            this.project_execute_dept_name = result_data.project_execute_dept_name;
            this.biz_comp_dept_name = result_data.biz_comp_dept_name;
            this.provider_name = result_data.provider_name;

            this.contract_name = result_data.contract_name;
            this.contract_code = result_data.contract_code;
            this.multi_contract = result_data.multi_contract;

            this.biz_comp_dept_desc = '';
            this.biz_comp_dept_name.map(el => {
              if (el.sign === 'Y') {
                if (el.msg != null) {
                  if (el.msg !== '') {
                    this.biz_comp_dept_desc += el.msg + '<br>'
                  }
                }
              }
            });

            if (this.biz_comp_dept_desc.length > 4) {
              this.biz_comp_dept_desc = this.biz_comp_dept_desc.substring(0, this.biz_comp_dept_desc.length - 4);
            }

            this.project_execute_dept_desc = '';
            this.project_execute_dept_name.map(el => {
              if (el.sign === 'Y') {
                if (el.msg != null) {
                  if (el.msg !== '') {
                    this.project_execute_dept_desc += el.msg + '<br>'
                  }
                }
              }
            });

            if (this.project_execute_dept_desc.length > 4) {
              this.project_execute_dept_desc = this.project_execute_dept_desc.substring(0, this.project_execute_dept_desc.length - 4);
            }

            this.provider_name_desc = '';
            this.provider_name.map(el => {
              if (el.sign === 'Y') {
                if (el.msg != null) {
                  if (el.msg !== '') {
                    this.provider_name_desc += el.msg + '<br>'
                  }
                }
              }
            });

            if (this.provider_name_desc.length > 4) {
              this.provider_name_desc = this.provider_name_desc.substring(0, this.provider_name_desc.length - 4);
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


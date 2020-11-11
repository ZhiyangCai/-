<!-- 信息安全评测确认单(code=8) 打印单 edit by xuyy -->
<template>
  <div id="safety_evaluation_form">
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
            <td colspan="3">
              <div class="td_text">{{sys_name}}</div>
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
            <td class="td_label" style="min-width: 120px;">安全等级保护级别</td>
            <td>
              <div class="td_text">{{safe_level}}</div>
            </td>
          </tr>
          <tr>
            <td class="td_label">测评人</td>
            <td>
              <div class="td_text">{{review_user}}</div>
            </td>
            <td class="td_label">测评日期</td>
            <td>
              <div class="td_text">{{review_date}}</div>
            </td>
          </tr>
          <tr>
            <td class="td_label">安全评测情况</td>
            <td colspan="3">
              <div class="td_text" style="min-height: 200px;" v-html="content"></div>
              <div class="td_text" style="min-height: 45px;padding-left: 30px;">
                <span class="text_bold">网络安全管理员（签字）：</span><span>{{safeUser}}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <div class="td_text">
                <div class="text_bold" style="padding: 0 25px;">信息中心意见：</div>
                <div class="td_text" style="min-height: 80px;padding: 5px 5px 5px 25px;" v-html="info_user_msg"></div>
              </div>

              <el-row style="line-height: 20px;padding-bottom: 10px;">
                <el-col style="width: 170px;padding-left: 30px;"><span class="text_bold">部门负责人（签名）：</span></el-col>
                <el-col style="width: calc(100% - 170px);padding-right: 50px;">
                  <el-row>
                    <el-col :span="12" v-for="(user,i) in info_user" :key="'exec_name_'+i"
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
  import qrcode from '@/components/qrcode/index'//二维码生成组件

  export default {
    name: "safety_evaluation_form",
    props: ['projectId', 'code'],
    components: {
      qrcode
    },
    data() {
      return {
        /** 表单抬头 */
        projectTitle: '',//表单抬头head
        projectCode: '',//表单编码
        project_title: '信息安全评测确认单',//表单类型
        print: false,//是否打印单页面

        /** 项目基本信息 */
        project_name: '',//项目名称
        project_code: '',//项目编号
        contract_code: '',//合同编号
        contract_name: '',//合同名称
        multi_contract: 'N',//是否多合同

        sys_name: '',//系统名称
        evaluation_names: '',//测评类型
        bill_type: '',//测评阶段
        safe_level: '',//安全等级保护级别
        review_user: '',//测评人
        review_date: '',//测评日期
        content: '',//安全评测情况
        safeUser: '',//网络安全管理员
        info_user: [],//信息中心
        info_user_msg: '',//信息中心意见
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
        obj.serviceRoot = 'project/safeByIdQuery';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          this.$parent.loadingCloseFun();
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;
            this.project_name = result_data.project_name;
            this.project_code = result_data.project_code;
            this.sys_name = result_data.sys_name;
            this.safe_level = result_data.safe_level;
            this.review_date = this.appDateFormat(result_data.review_date, 'yyyy年mm月dd日');

            this.evaluation_names = result_data.evaluation_names;
            // this.review_user = result_data.review_user;
            this.review_user = result_data.reviews;


            this.content = result_data.content1;
            this.safeUser = result_data.safeUser;

            if (result_data.bill_type === 'YS') {
              this.bill_type = '验收'
            } else if (result_data.bill_type === 'SX') {
              this.bill_type = '上线'
            } else if (result_data.bill_type === 'ZB') {
              this.bill_type = '质保期'
            }
            this.contract_name = result_data.contract_name;
            this.contract_code = result_data.contract_code;
            this.multi_contract = result_data.multi_contract;

            this.info_user_msg = '';
            this.info_user = [];

            result_data.info_user.map((el, i) => {
              if (el.sign === 'Y') {
                this.info_user.push(el);
                if (el.content != null) {
                  if (el.content !== '') {
                    this.info_user_msg += el.content + '<br>'
                  }
                }
              }
            });
            if (this.info_user_msg.length > 4) {
              this.info_user_msg = this.info_user_msg.substring(0, this.info_user_msg.length - 4);
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

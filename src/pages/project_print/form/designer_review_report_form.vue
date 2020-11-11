<!-- 需求评审报告(code=2), 设计评审报告(code=4),验收评审报告(code=7) 打印单 edit by xuyy -->
<template>
  <div id="designer_review_report_form">
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
        <table class="form_sub_table3" border="0" cellpadding="0" cellspacing="0">

          <tr>
            <td colspan="2">
              <table border="0" cellpadding="0" cellspacing="0" style="border: 0;">
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
                  <td class="td_label">实施单位</td>
                  <td>
                    <div class="td_text">{{supplier}}</div>
                  </td>
                  <td class="td_label">项目经理</td>
                  <td>
                    <div class="td_text">{{project_manager}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="td_label">项目业务经办</td>
                  <td>
                    <div class="td_text">{{biz_user_name}}</div>
                  </td>
                  <td class="td_label">项目信息经办</td>
                  <td>
                    <div class="td_text">{{msg_user_name}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="td_label">评审会议地点</td>
                  <td>
                    <div class="td_text">{{meet_address}}</div>
                  </td>
                  <td class="td_label">评审会议时间</td>
                  <td>
                    <div class="td_text">{{meet_time}}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="td_label">评委</td>
            <td>
              <div style="min-height: 40px;" class="td_text">
                <span v-for="(user,i) in judge_name">
                  <span>{{user.user_name}}</span>
                  <span v-if="!(i===judge_name.length-1)">；</span>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="td_label">评审内容</td>
            <td>
              <div style="min-height: 100px;">
                <el-row v-for="(item,i) in reviewContentList" :key="'review_'+item.id"
                        :class="{'row_border_bottom':i!==reviewContentList.length-1}">
                  <el-col class="col_checkbox_item row_border_right" style="padding: 5px;">{{item.value}}</el-col>
                  <el-col class="td_label" style="position: relative;">
                    <el-checkbox disabled></el-checkbox>
                    <span v-if="item.is_check" class="el-icon-check print_check"></span>
                  </el-col>
                </el-row>
              </div>
            </td>
          </tr>
          <tr>
            <td class="td_label">存在问题及建议改进措施</td>
            <td>
              <div style="min-height: 100px;" class="td_text" v-html="improve_content"></div>
            </td>
          </tr>
          <tr>
            <td class="td_label">评审结论</td>
            <td>
              <el-row>
                <el-col :span="12" class="row_border_right" style="padding: 5px;text-align: center;position: relative;">
                  <span style="padding-right: 5px;">同意通过评审</span>
                  <el-checkbox v-model="is_judge" label="Y" disabled>&nbsp;</el-checkbox>
                  <span class="el-icon-check print_radio"></span>
                </el-col>
                <el-col :span="12" style="padding: 5px;text-align: center;">
                  <span style="padding-right: 5px;">不同意通过评审</span>
                  <el-checkbox v-model="is_judge" label="N" disabled>&nbsp;</el-checkbox>
                </el-col>
              </el-row>
            </td>
          </tr>
          <tr>
            <td class="td_label">评委签字栏</td>
            <td>
              <div style="min-height: 40px;" class="td_text">
                <span v-for="(user,i) in judge_checked_name">
                  <span v-show="user.user_name!=null" v-if="user.user_name!=''">
                     <span>{{user.user_name}}</span>
                  <span v-if="!(i===judge_checked_name.length-1)">；</span>
                  </span>

                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="td_label">改进措施验证</td>
            <td>
              <div style="min-height: 100px;" class="td_text" v-html="check_msg"></div>
              <el-row style="line-height: 20px;padding-bottom: 10px;">
                <el-col style="width: 90px;padding-left: 30px;"><span class="text_bold">验证人：</span></el-col>
                <el-col style="width: calc(100% - 90px);padding-right: 50px;">
                  <!--                  <span v-for="(user,i) in check_user" :key="'exec_name_'+i"-->
                  <!--                        v-if="user.sign==='Y'">-->
                  <!--                    <span>{{user.user_name}}</span>-->
                  <!--                    <span v-if="i!=check_user.length-1">；</span>-->
                  <!--                  </span>-->
                  <el-row>
                    <el-col :span="12" v-for="(user,i) in check_user" :key="'exec_name_'+i"
                            v-if="user.sign==='Y'">
                      <el-row>
                        <el-col :span="9"><span>{{user.user_name}}</span></el-col>
                        <el-col :span="12"><span>{{user.check_time|filterDateFormat('.')}}</span></el-col>
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
    name: "designer_review_report_form",
    props: ['projectId', 'code'],
    components: {
      qrcode
    },
    data() {
      return {
        /** 表单抬头 */
        projectTitle: '',//表单抬头head
        projectCode: '',//表单编码
        project_title: '',//表单类型
        print: false,//是否打印单页面

        reviewContentList: [],//评审内容列表

        /** 项目基本信息 */
        project_name: '',//项目名称
        project_code: '',//项目编号
        contract_code: '',//合同编号
        contract_name: '',//合同名称
        multi_contract: 'N',//是否多合同

        supplier: '',//实施单位
        project_manager: '',//项目经理
        biz_user_name: '',//项目业务经办
        msg_user_name: '',//项目信息经办
        meet_address: '',//评审会议地点
        meet_time: '',//评审会议时间
        judge_name: [],//评委
        improve_content: '',//存在问题及建议改进措施
        improve_content_list: [],//存在问题及建议改进措施数组列表
        is_judge: 'Y',//评审结论
        judge_checked_name: [],//评委签字栏
        check_user: '',//验证人
        check_msg: '',//改进措施验证信息
      }
    },
    mounted() {
      if (this.$route.name === 'projectPrint') {
        this.print = true
      } else {
        this.print = false
      }
      if (this.code === '2') {
        // this.project_title = '需求评审报告';
        this.getDictList('REQ_REVIEW_CONTENT');
      } else if (this.code === '4') {
        // this.project_title = '设计评审报告';
        this.getDictList('DESIGN_REVIEW_CONTENT');
      } else if (this.code === '7') {
        // this.project_title = '验收评审报告';
        this.getDictList('ACCEPT_REVIEW_CONTENT');
      }

    },
    methods: {
      /** 根据表单id 获取表单信息 */
      getFormData() {
        this.$parent.loadingFun();
        let obj = {};
        obj.params = {id: this.projectId};
        if (this.code === '2') {
          obj.serviceRoot = 'project/requireReviewQuery';
        } else if (this.code === '4') {
          obj.serviceRoot = 'project/designReviewByIdQuery';
        } else if (this.code === '7') {
          obj.serviceRoot = 'project/reviewByIdQuery';
        }
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          this.$parent.loadingCloseFun();
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;
            this.project_name = result_data.project_name;
            this.project_code = result_data.project_code;
            this.supplier = result_data.supplier_name;
            this.project_manager = result_data.project_manager[0].user_name;
            this.meet_address = result_data.meet_address;
            this.meet_time = this.appDateFormat(result_data.meet_time, 'yyyy年mm月dd日');
            this.judge_name = result_data.users;
            this.judge_checked_name = [];

            this.contract_name = result_data.contract_name;
            this.contract_code = result_data.contract_code;
            this.multi_contract = result_data.multi_contract;

            this.judge_name.map(el => {
              if (el.sign === 'Y') {
                this.judge_checked_name.push(el)
              }
            });
            this.biz_user_name = '';
            result_data.biz_user.map(el => {
              this.biz_user_name += el.user_name + '；';
              // this.biz_user_name += (el.dept_name ? el.dept_name + '/' : '') + el.user_name + '；'
            });
            if (this.biz_user_name.length > 0) {
              this.biz_user_name = this.biz_user_name.substring(0, this.biz_user_name.length - 1);
            }

            this.msg_user_name = '';
            result_data.msg_user.map(el => {
              this.msg_user_name += el.user_name + '；';
              // this.msg_user_name += (el.dept_name ? el.dept_name + '/' : '') + el.user_name + '；'
            });
            if (this.msg_user_name.length > 0) {
              this.msg_user_name = this.msg_user_name.substring(0, this.msg_user_name.length - 1);
            }

            this.reviewContentList.map(el => {
              result_data.items.map(ele => {
                if (el.id === ele.content_id) {
                  el.is_check = true;
                }
              });
            });
            this.improve_content_list = [];

            result_data.improve_content.map((el, i) => {
              if (el.content_text.trim() != '') {
                this.improve_content_list.push(el)
              }
            });

            this.improve_content_list.map((el, i) => {
              this.improve_content += (i + 1) + '、' + el.content_text + '<span v-if="' + (i !== (this.improve_content_list.length - 1)) + '"><br></span>'
            });

            this.check_user = [];
            this.check_msg = '';
            if (result_data.check_users.length > 0) {
              result_data.check_users.map((el, i) => {
                if (el.sign === 'Y') {
                  this.check_user.push(el);
                  this.check_msg += el.check_msg + '<br>';
                }
              });
              if (this.check_msg.length > 4) {
                this.check_msg = this.check_msg.substring(0, this.check_msg.length - 4);
              }
            }

          }
        }).catch(err => {
          console.log(err)
        })

      },
      /** 获取评审内容列表 */
      getDictList(_type) {
        this.projectTitle = this.$parent.projectTitle;
        this.projectCode = this.$parent.getProjectCode(this.code).label;
        this.project_title = this.$parent.getProjectTitle(this.code).title;

        this.getSysDictList(_type, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            this.reviewContentList = result_data.data_list[0].category_data;
            this.getFormData();
          }
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped>

</style>

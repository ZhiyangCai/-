<template>
  <div id="project_process">
    <div class="process_main">

      <div>
        <el-row class="process_row">
          <el-col class="process_col" v-for="(process,i) in processList1" :key="'process_'+i">
            <div class="process_col_main" :class="'process_step_bg'+i">
              <span class="process_num">{{i+1}}</span><span>{{process.label}}</span>
            </div>
            <div class="process_form process_bg">
              <div v-for="(item,ii) in  process.list" style="text-align: center;">
                <div class="process_btn" @click="handleLinkToForm(item)" :class="'process_bg'+(i+1)"
                     :style="{'cursor':item.hasAuth?'pointer':'','background-color':item.hasAuth?'':'lightgrey'}">
                  {{item.label}}
                  <el-popover placement="right" title="" trigger="hover" :width="item.value==='9'?700:350">
                    <div slot="default">
                      <el-row v-if="item.value==='9'">
                        <el-col :span="12">
                          <img :src="item.img" style="width: 100%;"/>
                        </el-col>
                        <el-col :span="12">
                          <img :src="item.img1" style="width: 100%;"/>
                        </el-col>
                      </el-row>
                      <div v-else>
                        <img :src="item.img" style="width: 100%;">
                      </div>

                    </div>
                    <span slot="reference">
                      <span v-if="item.img" class="el-icon-question"
                            :style="{'cursor':item.hasAuth?'pointer':''}">
                      </span>
                    </span>
                  </el-popover>
                </div>
                <div v-if="ii!==process.list.length-1" class="process_arrow">
                  <div v-if="(i===0||i===1)||(i===2&&(ii===1||ii===2))||(i===3&&(ii===1||ii===2))"
                       class="process_arrow_icon"
                       :class="'process_arrow_bg'+i"></div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div style="padding: 30px 50px;">
        <el-row style="margin: 30px 0;">
          <el-col class="process_col_other" v-for="(process,i) in processList2" :key="'process1_'+i">

            <div class="process_bg">
              <div class="process_col_head" :class="{'process_bg6':i===0,'process_bg7':i===1}">{{process.label}}</div>
              <div class="process_form1">
                <div v-for="(item,ii) in  process.list" style="text-align: center;">
                  <div class="process_btn" :class="{'process_bg6':i===0,'process_bg7':i===1}"
                       :style="{'cursor':item.hasAuth?'pointer':'','background-color':item.hasAuth?'':'lightgrey'}"
                       @click="handleLinkToForm(item)">{{item.label}}
                  </div>
                </div>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>

      <div class="project_process_foot">
        <div>系统业务咨询、系统运维人：{{system_name}}<span style="padding-left: 10px;">联系电话：{{system_mobile}}</span></div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "project_process",
    data() {
      return {
        /** 底部系统业务咨询、系统运维人 */
        system_name: '',
        system_mobile: '',

        processList1: [//各项目阶段
          {
            label: '项目需求管理',
            list: [
              {
                label: '用户确认', name: '需求用户确认单', code: '15', value: '14', bill_type: 'XQ', hasAuth: false,
                page: 'user_sign_confirm', img: require('../../assets/imgs/operate_lead/demand_user_confirm_form.jpg')
              },
              {
                label: '需求评审', name: '需求评审报告单', code: '2', value: '2', hasAuth: false,
                page: 'requirement_review_report',
                img: require('../../assets/imgs/operate_lead/demand_review_report_form.jpg')
              },
              {
                label: '需求确认', name: '需求分析报告确认单', code: '1', value: '1', hasAuth: false,
                page: 'requirement_report_confirm',
                img: require('../../assets/imgs/operate_lead/demand_analysis_report_confirm_form.jpg')
              }
            ]
          },
          {
            label: '项目设计管理',
            list: [
              {
                label: '用户确认', name: '设计用户确认单', code: '16', value: '14', bill_type: 'SJ', hasAuth: false,
                page: 'user_sign_confirm', img: require('../../assets/imgs/operate_lead/design_user_confirm_form.jpg')
              },
              {
                label: '设计评审', name: '设计评审报告单', code: '3', value: '4', hasAuth: false,
                page: 'designer_review_report',
                img: require('../../assets/imgs/operate_lead/design_review_report_form.jpg')
              },
              {
                label: '设计确认', name: '设计报告确认单', code: '4', value: '3', hasAuth: false,
                page: 'designer_report_confirm',
                img: require('../../assets/imgs/operate_lead/design_report_confirm_form.jpg')
              }
            ]
          },
          {
            label: '项目上线管理',
            list: [
              {
                label: '安全评测', sub_name: '上线安全评测', name: '上线安全评测申请单', code: '6', value: '9', hasAuth: false,
                bill_type: 'SX', page: 'safety_evaluation_confirm',
                img: require('../../assets/imgs/operate_lead/online_safety_evalution_application_form.jpg'),
                img1: require('../../assets/imgs/operate_lead/online_safety_evalution_confirm_form.jpg'),
              },
              {
                label: '上线方案确认', name: '上线方案确认单', code: '5', value: '10', hasAuth: false,
                page: 'online_plan_confirm',
                img: require('../../assets/imgs/operate_lead/online_scheme_confirm_form.jpg'),
              },
              {
                label: '用户确认', name: '上线用户确认单', code: '17', value: '14', bill_type: 'SX', hasAuth: false,
                page: 'user_sign_confirm', img: require('../../assets/imgs/operate_lead/online_user_confirm_form.jpg')
              },
              {
                label: '上线确认', name: '上线试运行确认单', code: '7', value: '5', hasAuth: false,
                page: 'online_trial_operation_confirm',
                img: require('../../assets/imgs/operate_lead/online_trial_operate_confirm_form.jpg')
              }]
          },
          {
            label: '项目验收管理',
            list: [
              {
                label: '安全评测', sub_name: '验收安全评测', name: '验收安全评测申请单', code: '8', value: '9', bill_type: 'YS',
                hasAuth: false, page: 'safety_evaluation_confirm',
                img: require('../../assets/imgs/operate_lead/check_apply_safety_evalution_application_form.jpg'),
                img1: require('../../assets/imgs/operate_lead/check_apply_safety_evalution_confirm_form.jpg')
              },
              {
                label: '验收申请', name: '验收申请单', code: '9', value: '6', hasAuth: false,
                page: 'acceptance_application_report',
                img: require('../../assets/imgs/operate_lead/check_apply_application_form.jpg'),
              },
              {
                label: '用户确认', name: '验收用户确认单', code: '18', value: '14', bill_type: 'YS', hasAuth: false,
                page: 'user_sign_confirm',
                img: require('../../assets/imgs/operate_lead/check_apply_user_confirm_form.jpg')
              },
              {
                label: '验收评审', name: '验收评审报告', code: '10', value: '7', hasAuth: false, page: 'acceptance_review_report',
                img: require('../../assets/imgs/operate_lead/check_apply_review_report.jpg'),
              },
            ]
          },
          {
            label: '项目质保期管理',
            list: [
              {
                label: '安全评测', sub_name: '质保期安全评测', name: '质保期安全评测申请单', code: '11', value: '9', bill_type: 'ZB',
                hasAuth: false, page: 'safety_evaluation_confirm',
                img: require('../../assets/imgs/operate_lead/warranty_safety_evalution_application_form.jpg'),
                img1: require('../../assets/imgs/operate_lead/warranty_safety_evalution_confirm_form.jpg')
              },
              {
                label: '质保期验收申请', name: '质保期验收申请单', code: '12', value: '11',
                hasAuth: false, page: 'safety_acceptance_application_report',
                img: require('../../assets/imgs/operate_lead/warranty_check_apply_application_form.jpg'),
              },
            ]
          },
        ],
        processList2: [//项目特殊阶段
          {
            label: '项目需求变更',
            list: [{
              label: '需求变更申请', name: '需求变更申请单', hasAuth: false, code: '13', value: '12',
              page: 'demand_change_application_report'
            }]
          },
          {
            label: '项目集成需求',
            list: [{
              label: '集成需求申请', name: '集成需求申请单', hasAuth: false, code: '14', value: '13',
              page: 'demand_integration_application_report'
            }]
          },
        ],

        authList: [],//用户的表单权限
      }
    },
    mounted() {
      this.getAuthFormData();
      this.getFootData();
    },
    methods: {
      /** TODO 底部接口 系统业务咨询、系统运维人接口 */
      getFootData() {
        let obj = {};
        obj.params = {};
        obj.serviceRoot = 'project/querySystemOperation';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            this.system_name = result_data.system_name || '';
            this.system_mobile = result_data.system_mobile || '';
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /** TODO 获取用户表单权限 */
      getAuthFormData() {
        let obj = {};
        obj.params = {};
        obj.serviceRoot = 'project/billAuthQuery';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            this.authList = result_data.rows;
            this.authList.map(el => {
              this.processList1.map(ele => {
                ele.list.map(elee => {
                  if (el.CODE === elee.code) {
                    elee.hasAuth = true;
                  }
                })
              });

              this.processList2.map(ele => {
                ele.list.map(elee => {
                  if (el.CODE === elee.code) {
                    elee.hasAuth = true;
                    if (this.isNormal === 'true') {
                      elee.hasAuth = false;
                    }
                  }
                })
              });

            });
          }

        }).catch(err => {
          this.toolLoadClose();
          console.log(err)
        })
      },
      /** TODO 表单跳转接口 */
      handleLinkToForm(obj) {
        let tabName = this.$parent.$parent.$parent.randomString(15);
        let projectId = this.$parent.$parent.$parent.randomString();

        if (!obj.hasAuth) {
          this.$message({
            message: '暂无权限',
            type: 'warning'
          });
          return;
        }
        let params = {
          name: tabName,
          content: obj.page,
          closable: true,
          project_id: projectId,
          bill_code: obj.value,
          type: 'add'
        };

        params.title = obj.name;

        if (obj.value === '8' || obj.value === '9') {//安全评测
          params.bill_type = obj.bill_type;
          params.subId = '';
          params.title = obj.sub_name;
        } else if (obj.value === '14') {//用户确认签字
          params.bill_type = obj.bill_type;
        }

        this.$parent.$parent.$parent.tabsList.push(params);
        this.$parent.$parent.$parent.activeName = tabName;
      },
    }
  }
</script>

<style scoped>
  #project_process {
    height: calc(100% - 30px) !important;
  }

  #project_process .process_main {
    border-top: 5px solid #E4E7ED;
    padding-top: 30px;
    min-width: 1290px;
  }

  #project_process .process_row {
    padding: 0 50px;
    line-height: 55px;
  }

  #project_process .process_col {
    width: 235px;
    text-align: center;
  }

  #project_process .process_col_main {
    color: white;
  }

  #project_process .process_num {
    padding-right: 15px;
    font-size: 20px;
  }

  #project_process .process_form {
    height: 240px;
    width: 210px;
    padding: 15px 0;
    text-align: center;
  }

  #project_process .process_btn {
    position: relative;
    width: 150px;
    line-height: 30px;
    font-size: 13px;
    margin: 5px auto;
    border-radius: 4px;
    opacity: 1;
  }

  #project_process .process_btn .el-icon-question {
    position: absolute;
    right: 3px;
    top: 3px;
  }

  #project_process .process_btn:hover {
    opacity: 0.7;
  }

  #project_process .process_arrow {
    height: 25px;
  }

  #project_process .process_arrow_icon {
    width: 25px;
    height: 100%;;
    margin: 0 auto;
  }

  #project_process .process_col_other {
    width: 235px;
    padding-right: 25px;
  }

  #project_process .process_col_head {
    text-align: center;
    line-height: 40px;
    color: white;
  }

  #project_process .process_form1 {
    height: 40px;
    padding: 20px 0;
  }

  #project_process .project_process_foot {
    position: absolute;
    background: #4ca3f3;
    color: white;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    font-size: 13px;
    line-height: 30px;
  }

</style>

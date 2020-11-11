<!-- 安全评测首页 edit by xyy -->
<template>
  <div id="safety_evaluation_index">
    <div class="safety_index_header">

      <el-button type="text" size="mini" :disabled="applyDisabled" @click="handleConfirm('1')">
        <div
          :class="{'process_step_bg6':tabApply,'process_step_bg9':!tabApply&&!applyDisabled,'process_step_bg7':!tabApply&&applyDisabled}"
          style="line-height: 30px;padding: 0 30px;">安全评测申请
        </div>
      </el-button>
      <el-button type="text" size="mini" :disabled="confirmDisabledType" @click="handleConfirm('2')"
                 style="margin-left:-22px;">
        <div
          :class="{'process_step_bg0':tabConfirm&&!confirmDisabledType,'process_step_bg8':!tabConfirm&&!confirmDisabledType,'process_step_bg5':!tabConfirm&&confirmDisabledType}"
          style="line-height: 30px;padding: 0 30px;">安全评测确认
        </div>
      </el-button>
    </div>

    <div ref="safetyCompsRef" class="safety_index_comps">
      <apply_index v-if="applyShow" v-show="tabApply" :projectType="projectType" :projectTitle="projectTitle"
                   :formType="formType" :bill_type="bill_type" :applyProjectType="applyProjectType"></apply_index>

      <confirm_index v-if="confirmShow" v-show="tabConfirm" :testerList="testerList" :projectType="projectType"
                     :projectTitle="projectTitle" :projectCode="projectCode" :formType="formType"
                     :bill_type="bill_type" :confirmProjectType="confirmProjectType"></confirm_index>
    </div>

  </div>
</template>

<script>
  import apply_index from "./apply_index";
  import confirm_index from "./confirm_index";

  export default {
    name: "safety_evaluation_index",
    props: ['projectId', 'projectType', 'billCode', 'bill_type', 'testerList', 'subId'],
    data() {
      return {
        projectTitle: '',//表单名称 为子页面提供
        projectCode: '',//表单编码
        formType: '',//表单类型
        tabApply: false,//tab申请单
        tabConfirm: false,//tab确认单
        applyShow: false,//申请单显示状态 false不显示 true显示
        confirmShow: false,//确认单显示状态 false不显示 true显示
        applyDisabled: true,//申请单禁用
        confirmDisabledType: true,//确认单禁用
        applyProjectType: '',//申请单状态 read edit add
        confirmProjectType: '',//确认单状态 read edit add
      }
    },
    components: {
      apply_index, confirm_index
    },
    created() {
      this.applyProjectType = this.projectType;
      this.confirmProjectType = this.projectType;
      this.projectTitle = this.$parent.$parent.$parent.projectTitle;
      this.projectCode = this.$parent.$parent.$parent.getProjectCode(this.billCode).label;

      this.subId = this.subId || '';

      if (this.bill_type === 'YS') {
        this.formType = '验收'
      } else if (this.bill_type === 'SX') {
        this.formType = '上线'
      } else if (this.bill_type === 'ZB') {
        this.formType = '质保期'
      }

    },
    mounted() {
      this.getAuth();

    },
    methods: {
      /** 用户 安全评测菜单权限 flag=0 时没有权限 flag=1 时有权限 */
      getAuth() {
        let obj = {};
        obj.params = {};
        obj.serviceRoot = 'project/checkUserIsSafeConfirm';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            result_data.roles.map(el => {
              if (el.code === 'apply') {
                if (el.flag === 0) {
                  this.applyDisabled = true;
                  this.tabApply = false;
                  if (this.projectType === 'add') {
                    this.applyShow = false;
                  }
                } else {
                  this.applyDisabled = false;
                  this.tabApply = true;
                  this.applyShow = true;
                }
              }
              if (el.code === 'confirm') {
                if (el.flag === 0) {
                  this.confirmDisabledType = true;
                  this.tabConfirm = false;
                  if (this.projectType === 'add') {
                    this.confirmShow = false;
                  }

                } else {
                  this.confirmDisabledType = false;
                  this.tabConfirm = true;
                  this.confirmShow = true;
                }
              }
            });

            if (!this.applyDisabled && !this.confirmDisabledType) {
              this.tabApply = true;
              this.tabConfirm = false;
              this.applyShow = true;
              this.confirmShow = true;
            }

            this.authFun();

          }
        }).catch(err => {
          console.log(err)
        })
      },
      /** 菜单权限 设置 菜单中的状态 */
      authFun() {
        if (this.projectType === 'add') {
          this.applyProjectType = this.projectType;
          this.confirmProjectType = this.projectType;
        } else {
          this.tabConfirm = true;
          this.applyProjectType = this.projectType;
          this.confirmProjectType = this.projectType;

          if (this.billCode === '8') {
            this.tabApply = false;
            this.tabConfirm = true;
            this.confirmShow = true;
            this.confirmDisabledType = false;
            this.applyDisabled = false;

            if (this.subId === '') {
              this.applyDisabled = true;
              this.applyShow = false;
            } else {
              this.applyShow = true;
            }

            if (this.projectType === 'edit') {
              this.applyProjectType = 'read'
            }

          } else if (this.billCode === '9') {
            this.tabApply = true;
            this.tabConfirm = false;
            this.applyShow = true;
            this.applyDisabled = false;

            if (this.projectType === 'read') {
              if (this.subId === '') {
                this.confirmProjectType = 'add';
              } else {
                this.confirmDisabledType = false;
                this.confirmProjectType = 'read';
                this.confirmShow = true;
              }
            } else if (this.projectType === 'edit') {
              if (this.subId === '') {
                this.confirmDisabledType = true;
              } else {
                this.confirmDisabledType = false;
                this.confirmShow = true;
              }
              this.confirmProjectType = 'read';
            }
          }
        }
      },
      /** 菜单切换时方法 */
      handleConfirm(_type) {
        if (_type === '2') {//确认
          this.tabApply = false;
          this.tabConfirm = true;
        } else if (_type === '1') {//申请
          this.tabApply = true;
          this.tabConfirm = false;
        }
      },

    }
  }
</script>

<style scoped>
  #safety_evaluation_index .safety_index_header {
    padding-left: 20px;
  }

  #safety_evaluation_index .safety_index_comps {
    height: calc(100% - 46px);
    overflow: auto;
  }
</style>

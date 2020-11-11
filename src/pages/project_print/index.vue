<template>
  <div id="project_print" ref="projectPrintRef" style="-webkit-text-size-adjust: 100%!important;">
    <div ref="printContentRef" id="printContent" :class="{'print_content_item':!printBtn}">
      <component ref="printComponentRef" class="print_component" :is="page" :projectId="projectId"
                 :code="code"></component>
    </div>

    <div class="print_btn print_hide" v-if="printBtn" v-show="wxNormal==='false'">
      <el-button type="primary" @click="handlePrint" size="mini">打印</el-button>
    </div>

  </div>
</template>

<script>
  /** 兼容企业微信样式 */
  (function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
      handleFontSize();
    } else {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", handleFontSize);
        document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
      }
    }

    function handleFontSize() {
      WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});
      WeixinJSBridge.on('menu:setfont', function () {
        WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});
      });
    }
  })();

  import designer_review_report_form from "./form/designer_review_report_form";
  import designer_confirm_form from "./form/designer_confirm_form";
  import online_trial_operate_form from "./form/online_trial_operate_form";
  import acceptance_application_form from "./form/acceptance_application_form";
  import safety_evaluation_form from "./form/safety_evaluation_form";
  import safety_evaluation_apply_form from "./form/safety_evaluation_apply_form";
  import safety_acceptance_application_form from "./form/safety_acceptance_application_form";
  import demand_change_application_form from "./form/demand_change_application_form";
  import demand_integration_application_form from "./form/demand_integration_application_form";
  import user_sign_form from "./form/user_sign_form";

  export default {
    name: "project_print",
    props: ['project_code', 'project_id'],
    components: {
      designer_review_report_form, designer_confirm_form, online_trial_operate_form, acceptance_application_form,
      safety_evaluation_form, safety_evaluation_apply_form, safety_acceptance_application_form,
      demand_change_application_form, demand_integration_application_form, user_sign_form
    },
    data() {
      return {
        /** url参数 */
        code: '',//表单code
        projectId: '',//表单id

        /** 组件参数 */
        page: '',
        pageList: [
          {code: '1', page: 'designer_confirm_form'},
          {code: '2', page: 'designer_review_report_form'},
          {code: '3', page: 'designer_confirm_form'},
          {code: '4', page: 'designer_review_report_form'},
          {code: '5', page: 'online_trial_operate_form'},
          {code: '6', page: 'acceptance_application_form'},
          {code: '7', page: 'designer_review_report_form'},
          {code: '8', page: 'safety_evaluation_form'},
          {code: '9', page: 'safety_evaluation_apply_form'},
          {code: '10', page: 'online_trial_operate_form'},
          {code: '11', page: 'safety_acceptance_application_form'},
          {code: '12', page: 'demand_change_application_form'},
          {code: '13', page: 'demand_integration_application_form'},
          {code: '14', page: 'user_sign_form'}
        ],

        /** 子组件公共参数 */
        projectCodeList: [//表单编码
          {code: '1', label: 'XX3-JL2'},
          {code: '2', label: 'XX3-JL3（B）'},
          {code: '3', label: 'XX3-JL5（B）'},
          {code: '4', label: 'XX3-JL5（B）'},
          {code: '5', label: 'XX3-JL6'},
          {code: '6', label: 'XX3-JL12'},
          {code: '7', label: 'XX3-JL14'},
          {code: '8', label: 'XX3-JL9'},
          {code: '10', label: 'XX3-JL7'},
          {code: '12', label: 'XX3-JL10'},
          {code: '13', label: 'XX3-JL11'}
        ],
        projectTitleList: [//表单名
          {code: '1', title: '需求分析报告确认单'},
          {code: '2', title: '需求评审报告'},
          {code: '3', title: '设计报告确认单'},
          {code: '4', title: '设计评审报告'},
          {code: '5', title: '上线试运行确认单'},
          {code: '6', title: '验收申请单'},
          {code: '7', title: '验收评审报告'},
          {code: '8', title: '信息安全评测确认单'},
          {code: '9', title: '信息安全评测申请单'},
          {code: '10', title: '上线方案确认单'},
          {code: '11', title: '质保期验收申请单'},
          {code: '12', title: '需求变更申请单'},
          {code: '13', title: '集成需求申请单'},
          {code: '14', title: '用户确认单'},
        ],
        projectTitle: '湖北中烟信息化项目',//表单抬头

        loading: null,//加载状态

        /** 底部按钮参数 */
        printBtn: false,
        wxNormal: this.wxNormal
      }
    },
    mounted() {
      /** 如果打印页面显示打印按钮，如果不是，就是弹框 */
      this.code = this.$route.query.code;
      this.projectId = this.$route.query.projectId;
      this.printBtn = true;
      this.comPage()
    },
    methods: {
      handlePrint() {
        // window.print();
        // return false;

        if (!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
          this.remove_ie_header_and_footer();
        }

        let dom = document.querySelector('.print_component');
        this.$print(dom)
      },
      remove_ie_header_and_footer() {
        let hkey_path;
        hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
        try {
          let RegWsh = new ActiveXObject("WScript.Shell");
          RegWsh.RegWrite(hkey_path + "header", "");
          RegWsh.RegWrite(hkey_path + "footer", "");
        } catch (e) {
        }
      },
      /** 组件页面 */
      comPage() {
        this.pageList.map(el => {
          if (el.code === this.code) {
            this.page = el.page;
          }
        })
      },
      /** 拉取接口时显示loading */
      loadingFun() {
        this.loading = this.$loading({
          lock: true,
          text: '加载中。。。。',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      /** loading关闭 */
      loadingCloseFun() {
        this.loading.close();
      },
      /** 根据表单code查询表单编码 */
      getProjectCode(val) {
        let obj = {};
        this.projectCodeList.map(el => {
          if (el.code === val) {
            obj = el
          }
        });
        return obj;
      },
      /** 根据表单code查询表单抬头 */
      getProjectTitle(val) {
        let obj = {};
        this.projectTitleList.map(el => {
          if (el.code === val) {
            obj = el;
          }
        });
        return obj;
      }
    },
  }
</script>

<style scoped media="print">
  #project_print {
    height: 100%;
    padding: 0 10px;
  }

  #printContent {
    position: relative;
    height: calc(100% - 50px);
    overflow: auto;
  }

  .print_content_item {
    height: 100%;
  }

  #printContent .print_component {
    min-width: 650px;
  }

  #project_print .print_btn {
    border-top: 2px solid #E4E7ED;
    text-align: center;
    padding-top: 10px;
  }

  @page {
    size: auto;
    margin: 0mm;
  }

  @media print {
    .print_hide {
      display: none;
    }

    .print_content {
      margin-top: 20px !important;
    }
  }
</style>

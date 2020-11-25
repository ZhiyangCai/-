<template>
  <div id="home">
    <div ref="home_main" class="home_main">
      <!-- stretch="true"设置tab头撑开 -->
      <!-- @tab-click="handleLoad" 点击头部选项卡的时候刷新页面-->

      <el-tabs
        @tab-click="handleLoad"
        v-model="activeName"
        style="height: 100%;background:white;"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          style="background:#E4E7ED;"
          v-for="(tab, i) in tabsList"
          :key="'tab_' + tab.name + i"
          :label="tab.title"
          :name="tab.name"
          :closable="tab.closable"
        >
          <template v-if="i > 1">
            <span
              style="padding: 10px 0;"
              slot="label"
              @contextmenu.stop.prevent="$refs.ctxshow.showMenu($event, tab)"
              >{{ tab.title }}</span
            >
          </template>
          <component
            :key="timer"
            :ref="'comp_' + tab.name"
            :is="tab.content"
            :projectId="tab.project_id"
            :projectType="tab.type"
            :stateList="stateList"
            :processCompList="processCompList"
            :bill_type="tab.bill_type"
            :billCode="tab.bill_code"
            :testerList="testerList"
            :subId="tab.subId"
            :contractStepList="contractStepList"
            :letter_id="tab.letter_id"
            style="height: 100%;overflow: auto;"
          >
          </component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import createWorkcontact from "../workcontactletter/createWorkcontact"; //创建工作联系函
import missionHistory from "../workcontactletter/missionHistory"; //任务历史记录
import workDetail from "../workcontactletter/workDetail"; //查看历史记录
import printDetail from "../workcontactletter/printDetail"; //打印页面

export default {
  name: "home",
  components: {
    createWorkcontact, //创建工作联系函
    missionHistory, //任务历史记录
    workDetail, //查看及重新发起
    printDetail //打印
  },
  data() {
    return {
      timer: "",
      /** tab */
      activeName: "", //tab 定位
      tabsList: [], //tab 数组 前两个是固定的没有关闭 后面的都是可以关闭的
      loadProject: false, //历史记录页面load状态
      tabData: {}, //右键事件 可操作的数组

      fileUploading: null, //文件上传 $loading
      saveLoading: null, //发起评审 $loading

      projectTitle: "黄鹤楼科技园工程中心", //表单名称 为子页面提供

      stateList: [], //项目评审状态
      processCompList: [], //单据类型
      acceptList: [], //验收类别
      testerList: [], //评测人
      testTypeList: [], //测评类型
      contractStepList: [] //ITME合同阶段
    };
  },
  watch: {
    activeName(val) {
      if (val === "project_2") {
        this.tabsList.map(el => {
          if (el.name === val) {
            this.loadProject = true;
            el.content = missionHistory;
          }
        });
      }
    }
  },
  mounted() {
    this.GLOBAL.userCode = sessionStorage.getItem("userCode");
    this.tabsList = [
      {
        title: "创建工作联系函",
        name: "project_1",
        closable: false,
        // content: project_process,
        content: createWorkcontact
      },
      {
        title: "任务历史记录",
        name: "project_2",
        closable: false,
        content: ""
      }
    ];
    this.activeName = "project_1";
  },
  methods: {
    handleLoad(data) {
      let name = data.name;
      this.timer = new Date().getTime();
    },

    /** TODO 右键点击事件 */
    handleTabClose(_type) {
      this.hideMenu();
      let tabListD = [];
      tabListD.push(this.tabsList[0]);
      tabListD.push(this.tabsList[1]);
      if (_type === "1") {
        //关闭当前
        let num = 0;
        this.tabsList.map((el, i) => {
          if (el.name === this.tabData.name) {
            num = i;
            this.tabsList.splice(i, 1);
          }
        });

        this.activeName = this.tabsList[num - 1].name;
      } else if (_type === "2") {
        //关闭其他
        this.tabsList = tabListD;
        this.tabsList.push(this.tabData);
        this.activeName = this.tabData.name;
      } else if (_type === "3") {
        //关闭所有
        this.tabsList = tabListD;
        this.activeName = "project_1";
      }
    },
    /** TODO 右键菜单隐藏 */
    hideMenu() {
      this.$refs.ctxshow.hideMenu(); // 隐藏菜单
    },
    /** TODO 右键菜单显示 */
    show(data) {
      this.tabData = data;
    },
    hide(data) {},

    /** TODO 生成随机码 默认为32位 */
    randomString(e) {
      //随机字符串
      e = e || 32;
      let t = "abcdefghijklmnopqrstuvwxyz123456789",
        a = t.length,
        n = "";
      for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
      return n;
    },
    /** TODO 历史记录页面调用 给单据 content 赋值*/
    linkToPage(val) {
      let compPage = "";
      this.processCompList.map(el => {
        if (el.code === val) {
          compPage = el.content;
          return;
        }
      });
      return compPage;
    },

    /** TODO 子组件获取 验收类别*/
    // getAcceptObj(val) {
    //   let obj = {};
    //   this.acceptList.map(el => {
    //     if (el.code === val) {
    //       obj = el;
    //     }
    //   });
    //   return obj;
    // },
    /** TODO 子组件获取 单据编码*/
    getProjectCode(val) {
      let obj = {};
      this.projectCodeList.map(el => {
        if (el.code === val) {
          obj = el;
        }
      });
      return obj;
    },
    /** TODO tab 关闭 */
    removeTab(targetName) {
      let tabs = this.tabsList;
      let activeName = this.activeName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.activeName = activeName;
      this.tabsList = tabs.filter(tab => tab.name !== targetName);
    },
    /** TODO 文件上传中 $loading */
    handleProgress(event, file, fileList) {
      this.fileUploading = this.$loading({
        lock: true,
        text: "文件上传中。。。。",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    /** TODO 文件上传后 $loading 关闭*/
    handleUploadError(err, file, fileList) {
      this.fileUploading.close();
      this.$message({
        type: "error",
        message: "上传失败！"
      });
    },
    /** TODO 子组件 文件删除 */
    // deleteUploadFile(id, _type) {
    //   let obj = {};
    //   obj.params = {};
    //   obj.methods = "get";
    //   obj.serviceRoot = "transfer/business/file/delete?fileId=" + id;
    //   obj.baseURL = "itmsdrm";
    //   if (_type === "click") {
    //     this.toolLoading();
    //   }
    //   this.requestFileDelete(obj, this)
    //     .then(res => {
    //       if (_type === "click") {
    //         this.toolLoadClose();
    //       }
    //       let type = "";
    //       if (res.resultCode === "0") {
    //         type = "success";
    //       } else {
    //         type = "error";
    //       }
    //       if (_type === "click") {
    //         this.$message({
    //           type: type,
    //           message: res.resultMessage
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       if (_type === "click") {
    //         this.toolLoadClose();
    //       }
    //       this.$message({
    //         type: "error",
    //         message: "操作失败！"
    //       });
    //       console.log(err);
    //     });
    // },
    /** TODO 子组件 发起评审中 $loading */
    toolLoading() {
      this.saveLoading = this.$loading({
        lock: true,
        text: "操作中。。。。",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    /** TODO 子组件 发起评审后 $loading 关闭*/
    toolLoadClose() {
      this.saveLoading.close();
    },
    /** TODO 单据保存或发起评审后 历史记录更新 */
    getChildrenFun() {
      //如果历史记录没有加载 则不更新历史记录
      if (!this.loadProject) {
        return;
      }
      //历史记录加载过 但没有选择评审类型 不更新历史记录
      let _select = this.$refs.comp_project_2[0];
      if (_select) {
        if (_select.searchFormInline.bill_type === "") {
          return;
        }
        _select.getTableHeader(_select.searchFormInline.bill_type);
        _select.getProjectList();
      }
    },
    /** TODO 子组件 催办评审审批 */
    handleApprove(id, bill_type) {
      this.toolLoading();
      let obj = {};
      obj.params = {
        id: id,
        bill_type: bill_type
      };
      obj.serviceRoot = "project/AsklTaskApprove";
      obj.baseURL = "/itmsdrm";
      this.requestDrmService(obj, this)
        .then(res => {
          let message = "";
          let type = "info";
          this.toolLoadClose();
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData);
            if (result_data.flag) {
              type = "success";
              message = "操作成功！";
            } else {
              type = "error";
              message = "操作失败！";
            }
          } else {
            type = "error";
            message = "操作失败！";
          }

          this.$message({
            message: message,
            type: type
          });
        })
        .catch(err => {
          this.toolLoadClose();
          this.$message({
            message: "操作失败",
            type: "error"
          });
        });
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
#home {
  width: 100%;
  height: calc(100% - 4px);
  background: #e4e7ed;
  /* padding: 5px 0 0 0; */
  padding: 0;
}

#home .home_main {
  /* background: white; */
  background: #e4e7ed;
  height: 100%;
}

.right_btn {
  cursor: pointer;
  font-weight: 400;
}

.right_btn:hover {
  color: #4ca3f3;
}
</style>

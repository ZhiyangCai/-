<template>
  <div id="project_history" style="background:white">
    <div>
      <div>
        <!-- style="border: 1px solid #E4E7ED;border-width: 0 1px 1px 1px;margin: 40px 25px 10px 25px;" -->
        <div>
          <!-- <el-divider content-position="left">任务记录查询：</el-divider> -->
          <!-- style="padding: 0 10px 10px 10px;" -->
          <el-form
            :inline="true"
            :model="searchFormInline"
            :label-position="'left'"
            class="demo-form-inline_"
            size="medium"
            style="padding:25px 25px 0px;"
          >
            <el-form-item label="任务标题：">
              <el-input
                style="width: 320px;"
                v-model="searchFormInline.letter_name"
                placeholder="请输入任务标题"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select
                v-model="this.searchFormInline.letter_status"
                placeholder="请选择状态"
                @change="handleSelectStatus"
              >
                <el-option
                  v-for="item in statusOptions"
                  :label="item.label"
                  :value="item.value"
                  :key="'letter_status_' + item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="选择周期：">
              <el-date-picker style="width: 250px;" v-model="searchTime" type="daterange" range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item>
              <el-button size="medium" type="primary" @click="onSubmitSearch()"
                >查询</el-button
              >
              <!-- <el-button @click="onSubmit('1')">重置</el-button> -->
            </el-form-item>
          </el-form>
        </div>

        <div style="padding: 0px 25px 10px;">
          <el-table
            v-loading="loading"
            :data="projectList"
            border
            :max-height="tableHeight"
            style="width: 100%;"
            size="mini"
          >
            <template v-for="(header, i) in tableHeader">
              <el-table-column
                :type="header.type"
                :prop="header.prop"
                :sortable="header.sortable"
                :label="header.label"
                align="center"
                header-align="center"
                :min-width="header.minWidth"
                :width="header.width"
                :show-overflow-tooltip="header.overflow"
              >
              </el-table-column>
            </template>
            <!-- width="400" -->
            <el-table-column
              width="320"
              label="操作"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <!-- 注：所有情况都显示查看按钮
                  （1）草稿0----显示（查看，删除）按钮，
                  （2）已回复2----显示（查看，重新发起，归档，打印）按钮，
                  （3）归档3----显示（查看，打印，已归档）按钮
                  （4）处理中1----显示（查看）按钮 -->
                <div style="white-space:nowrap;">
                  <el-button
                    style="margin:5px;"
                    @click="handleClick(scope.row, '查看')"
                    type="primary"
                    size="mini"
                    plain
                    >查看</el-button
                  >
                  <el-button
                    style="margin:5px;"
                    v-if="scope.row.letter_status === '草稿'"
                    type="primary"
                    size="mini"
                    @click="handleClick(scope.row, '删除')"
                    plain
                    >删除
                  </el-button>
                  <el-button
                    style="margin:5px;"
                    v-if="scope.row.letter_status === '已回复'"
                    type="primary"
                    size="mini"
                    @click="handleClick(scope.row, '重新发起')"
                    plain
                    >重新发起
                  </el-button>
                  <el-button
                    style="margin:5px;"
                    v-if="scope.row.letter_status === '已回复'"
                    type="primary"
                    size="mini"
                    @click="handleClick(scope.row, '归档')"
                    plain
                    >归档
                  </el-button>
                  <el-button
                    style="margin:5px;"
                    v-if="
                      scope.row.letter_status === '已回复' ||
                        scope.row.letter_status === '归档'
                    "
                    @click="handleClick(scope.row, '打印')"
                    type="primary"
                    size="mini"
                    plain
                    >打印
                  </el-button>
                  <el-button
                    style="margin:5px;"
                    v-if="scope.row.letter_status === '归档'"
                    type="info"
                    size="mini"
                    plain
                    disabled
                    >已归档
                  </el-button>

                  <!------------------------------分隔符---------------------------- -->
                  <!-- 所有状态都有权限 -->
                  <!-- <el-button @click="handleClick(scope.row,'1')" type="primary" size="mini" plain>查看</el-button> -->
                </div>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handlePageSizeChange"
            @current-change="handlePageNoChange"
            :total="total"
            :current-page="searchFormInline.page"
            :page-size="searchFormInline.rows"
            :page-sizes="[10, 15, 20, 25, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            style="padding: 6px;"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- <el-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="80%"
      :modal-append-to-body="false"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div slot="title">
        <el-row>
          <el-col style="width: calc(100% - 100px);padding-left: 15px;">{{
            dialogTitle
          }}</el-col>
          <el-col style="width: 100px;text-align: right;padding-right: 15px;">
            <span
              class="el-dialog__close el-icon el-icon-close active"
              style="padding:5px;font-weight: bold;"
              @click="dialogVisible = false"
            ></span>
          </el-col>
        </el-row>
      </div>
      <project_print
        ref="printRef"
        :num="num"
        :project_id="project_id"
        :project_code="project_code"
      ></project_print>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" size="mini" v-on:click="pdfOut"
          >导出</el-button
        >
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import project_print from "../project_print/index";

export default {
  name: "missionHistory",
  //props: ["stateList", "processCompList", "contractStepList"],
  components: {
    project_print
  },
  data() {
    return {
      /*------状态类型------*/
      statusOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "草稿"
        },
        {
          value: "1",
          label: "处理中"
        },
        {
          value: "2",
          label: "已回复"
        },
        {
          value: "3",
          label: "归档"
        }
      ],

      /** 登录用户信息 */
      userCode: sessionStorage.getItem("userCode"), //用户账号
      userName: this.GLOBAL.userName, //用户名

      // /** 导出弹框页面 */
      // dialogVisible: false, //弹框状态
      // dialogTitle: "", //弹框标题
      // num: 1,

      // /** 导出页面参数 --- 项目信息和合同信息*/
      // project_id: "",
      // project_code: "",
      // project_name: "",
      // project_title: "",

      // /** 归档弹框页面*/
      // dialogVisible1: false,
      // dialogTitle1: "归档到ITME系统",
      // fileObj: {
      //   stage: ""
      // },

      /** table */
      loading: false, //table 加载状态
      tableHeight: window.innerHeight - 240, //table 最大高度
      tableHeader: [], //table 的header
      projectList: [], //table 的data
      total: 1, //table 分页总数

      /** 任务记录查询 */
      billType: "",
      searchFormInline: {
        letter_status: "", //状态
        letter_name: "", //输入框条件
        // bill_type: "", //评审类型
        page: 1, //table 分页pageNo
        rows: 10 //table 分页pageSize
      },
      searchTime: "" //选择周期
    };
  },
  watch: {
    billType(val) {
      //评审类型
      this.searchFormInline.page = 1;
      this.getTableHeader(val);
      this.getProjectList();
    }
  },
  mounted() {
    //初始化加载表头和表格数据
    this.getTableHeader();
    this.getProjectList();

    window.onresize = () => {
      this.tableHeightChange();
    };
  },
  methods: {
    /** table 高度设置 */
    tableHeightChange() {
      this.tableHeight = window.innerHeight - 240;
    },
    /** 改变pageSize 调用方法 */
    handlePageSizeChange(val) {
      this.searchFormInline.page = 1;
      this.searchFormInline.rows = val;
      this.getProjectList();
    },
    /** 改变pageNo 调用方法 */
    handlePageNoChange(val) {
      this.searchFormInline.page = val;
      this.getProjectList();
    },
    /** table 表头设置 调用方法 */
    getTableHeader(_type) {
      this.tableHeader = [];

      this.tableHeader.push({
        label: "序号",
        prop: "letter_id",
        type: "index"
      });
      this.tableHeader.push({
        label: "任务名称",
        prop: "letter_name",
        minWidth: 100
      });
      this.tableHeader.push({
        label: "限定完成时间",
        prop: "limited_time",
        width: 100
      });

      this.tableHeader.push({
        label: "状态",
        prop: "letter_status",
        width: 100
        //   sortable: true
      });
    },
    /** 获取table data */
    getProjectList() {
      let obj = {};
      this.loading = true;
      this.searchFormInline.letter_name = this.searchFormInline.letter_name.trim();
      // obj.params = this.searchFormInline;
      obj.params = {
        data: {
          row: [
            {
              letter_name: this.searchFormInline.letter_name,
              letter_status: this.searchFormInline.letter_status,
              page: this.searchFormInline.page,
              rows: this.searchFormInline.rows,
              loggedUser: {
                path: "1/S00000000000003/S00000000012424",
                weight: "1",
                id: this.GLOBAL.userCode
              }
            }
          ]
        },
        head: {
          msg_code: "work_letter_list",
          msg_id: "work_letter_list",
          request_time: "",
          source_sys: "prodsm",
          service_class: "WorkLetter",
          target_sys: "MOBILE",
          user_id: "admin",
          user_key: "admin"
        }
      };
      console.log("====canshu====" + JSON.stringify(obj.params));
      obj.serviceRoot = "prodsm/WorkLetter/work_letter_list";
      //obj.serviceRoot = "project/confirmQuery";
      //obj.baseURL = "/itmsdrm";
      this.projectList = [];
      this.requestDrmService(obj, this)
        .then(res => {
          console.log("res:------", res);
          this.loading = false;
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData);
            console.log("====result_data====:" + JSON.stringify(result_data));
            this.total = result_data.total || 0;
            this.projectList = this.projectList.concat(result_data.rows || []);
            this.projectList.map(el => {
              el.limited_time = el.limited_time
                ? this.moment(el.limited_time).format("YYYY-MM-DD")
                : // ? this.moment(el.limited_time).format("YYYY-MM-DD HH:mm:ss")
                  "";
              switch (el.letter_status) {
                case "0":
                  el.letter_status = "草稿";
                  break;
                case "1":
                  el.letter_status = "处理中";
                  break;
                case "2":
                  el.letter_status = "已回复";
                  break;
                case "3":
                  el.letter_status = "归档";
                  break;
                default:
                  break;
              }
            });
            // this.projectList.map(el => {
            //   if (el.ACCEPT_TYPE) {
            //     el.ACCEPT_TYPE = this.$parent.$parent.$parent.getAcceptObj(
            //       el.ACCEPT_TYPE
            //     ).value;
            //   }
            // });
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    /** 状态变化后 调用的方法 */
    handleSelectStatus(val) {
      this.searchFormInline.letter_status = val;

      this.billType = this.searchFormInline.letter_status;
      //this.billType = this.searchFormInline.bill_type;
    },
    /** 任务记录查询 查询按钮 */
    onSubmitSearch() {
      this.getProjectList();
    },
    /** table 操作列 按钮方法 */
    handleClick(rowData, _type) {
      /*-----------------删除---------------*/
      if (_type === "删除") {
        this.deleteWork(rowData);
        return;
      }
      /*-----------------归档---------------*/

      if (_type === "归档") {
        this.fileWork(rowData);
        return;
      }
      /*-----------------打印---------------*/
      let content = "workDetail";
      //let content = this.$parent.$parent.$parent.linkToPage(this.billType);
      let tabName = this.$parent.$parent.$parent.randomString(6);
      let title = _type; //"查看及重新发起";
      let type = "edit";
      if (_type === "打印") {
        let href_url;
        const { href } = this.$router.resolve({
          path: "/printDetail",
          query: {
            letter_id: rowData.letter_id,
            userCode: this.GLOBAL.userCode
          }
        });
        href_url = href;
        window.open(href_url, "_blank");
        return;
      }

      if (_type === "查看" || _type === "重新发起") {
        // if (_type === "查看" || _type === "重新发起" || _type === "打印") {
        // if (_type === "打印") {
        //   content = "printDetail";
        // }
        title = _type + "任务(" + rowData.letter_name + ")";
        let obj_params = {
          name: tabName,
          content: content,
          // closable: true,
          project_id: rowData.ID,
          bill_code: "rowData.TYPE", //rowData.TYPE,
          type: type,
          /*--------------分隔符-----------------*/
          letter_id: rowData.letter_id
        };
        obj_params.title = title; //+ rowData.PROJECT_VIEW_TYPE_NAME;

        if (this.$parent.$parent.$parent.tabsList.length > 2) {
          let index = this.$parent.$parent.$parent.tabsList.length - 1;
          this.$parent.$parent.$parent.tabsList.splice(index, 1);
        }
        this.$parent.$parent.$parent.tabsList.push(obj_params);
        this.$parent.$parent.$parent.activeName = tabName;
      }
    },
    /** 打印页面 导出按钮 执行方法 */
    // pdfOut() {
    //   let dom = document
    //     .querySelector("#printContent")
    //     .getElementsByClassName("project_title1");
    //   let domTitle = dom[0].innerHTML;
    //   let appendTitle =
    //     "（" +
    //     this.project_name +
    //     (this.project_title.length > 0 ? "-" + this.project_title : "") +
    //     "）";
    //   this.getPdf("printContent", domTitle + appendTitle);
    //   this.dialogVisible = false;
    // },
    /** table 操作列中 删除按钮 执行方法 */
    //s删除任务
    deleteWork(rowData) {
      this.$confirm("此操作将删除任务，是否继续?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      }).then(() => {
        let obj = {};
        obj.serviceRoot = "prodsm/WorkLetter/work_letter_delete";
        //obj.baseURL = "/itmsdrm";
        obj.params = {
          data: {
            row: [
              {
                letter_id: rowData.letter_id
              }
            ]
          },
          head: {
            msg_code: "work_letter_delete",
            msg_id: "work_letter_delete",
            request_time: "",
            source_sys: "prodsm",
            service_class: "WorkLetter",
            target_sys: "MOBILE",
            user_id: "admin",
            user_key: "admin"
          }
        };
        let type = "info";
        let message = "";
        this.requestDrmService(obj, this)
          .then(res => {
            if (res.resultCode === "0") {
              let result_data = JSON.parse(res.resultData);
              message = "删除成功！"; //result_data.message;
              if (result_data.flag) {
                type = "success";
                this.getProjectList();
              } else {
                type = "error";
              }
            } else {
              type = "error";
              message = "删除失败！";
            }
            this.$message({
              type: type,
              message: message
            });
          })
          .catch(err => {
            type = "error";
            message = "删除失败！";
            this.$message({
              type: type,
              message: message
            });
          });
      });
    },
    //归档
    fileWork(rowData) {
      this.$confirm("确定归档?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      }).then(() => {
        let obj = {};
        obj.serviceRoot = "prodsm/WorkLetter/work_letter_archive";
        //obj.baseURL = "/itmsdrm";
        obj.params = {
          data: {
            row: [
              {
                letter_id: rowData.letter_id
              }
            ]
          },
          head: {
            msg_code: "work_letter_archive",
            msg_id: "work_letter_archive",
            request_time: "",
            source_sys: "prodsm",
            service_class: "WorkLetter",
            target_sys: "MOBILE",
            user_id: "admin",
            user_key: "admin"
          }
        };
        let type = "info";
        let message = "";
        this.requestDrmService(obj, this)
          .then(res => {
            if (res.resultCode === "0") {
              let result_data = JSON.parse(res.resultData);
              message = "归档成功！"; //result_data.message;
              if (result_data.flag) {
                type = "success";
                this.getProjectList();
              } else {
                type = "error";
              }
            } else {
              type = "error";
              message = "归档失败！";
            }
            this.$message({
              type: type,
              message: message
            });
          })
          .catch(err => {
            type = "error";
            message = "归档失败！";
            this.$message({
              type: type,
              message: message
            });
          });
      });
    }
  }
};
</script>
<style scoped media="print">
@media print {
  /* 打印的时候隐藏头部 */
  .el-tabs__nav-scroll {
    display: none;
  }
}
</style>
<style scoped>
#project_history {
  height: 100%;
  overflow: auto;
}

#project_history .no_data {
  text-align: center;
  line-height: 100px;
  color: #999999;
}

#project_history .history_dialog_annotate {
  text-align: center;
  font-size: 12px;
  color: #999999;
}

#project_history .history_dialog_row_label {
  width: 150px;
  text-align: right;
}

#project_history .history_dialog_row_desc {
  width: calc(100% - 150px);
}
</style>

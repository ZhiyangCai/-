<template>
  <div id="project_history">
    <div>
      <div>
        <div
          style="border: 1px solid #E4E7ED;border-width: 0 1px 1px 1px;margin: 40px 25px 10px 25px;"
        >
          <el-divider content-position="left">项目记录查询：</el-divider>

          <el-form
            :inline="true"
            :model="searchFormInline"
            :label-position="'right'"
            class="demo-form-inline"
            size="mini"
            style="padding: 0 10px 10px 10px;"
          >
            <el-form-item label="评审类型：">
              <el-select
                v-model="searchFormInline.bill_type"
                placeholder="请选择项目评选类型"
                @change="handleSelectBill"
              >
                <el-option
                  v-for="bill_type in processCompList"
                  :label="bill_type.value"
                  :value="bill_type.code"
                  :key="'bill_type_' + bill_type.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择周期：">
              <el-date-picker
                style="width: 250px;"
                v-model="searchTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-input
                style="width: 320px;"
                v-model="searchFormInline.query_text"
                placeholder="请输入项目名称、签字人员、发起人或项目编号"
                clearable
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit('0')">查询</el-button>
              <el-button @click="onSubmit('1')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div style="padding: 10px 25px;">
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
                :prop="header.prop"
                :sortable="header.sortable"
                :label="header.label"
                header-align="center"
                :min-width="header.minWidth"
                :width="header.width"
                :show-overflow-tooltip="header.overflow"
              >
              </el-table-column>
            </template>
            <el-table-column
              label="操作"
              width="300"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <div style="white-space: nowrap;">
                  <!-- 所有状态都有权限 -->
                  <el-button
                    @click="handleClick(scope.row, '1')"
                    type="primary"
                    size="mini"
                    plain
                    >查看</el-button
                  >

                  <!--发起人为登录用户 且状态 为 state=2（发起） 时有权限 -->
                  <el-button
                    v-show="userCode === scope.row.USER_CODE"
                    v-if="scope.row.STATE === '2'"
                    plain
                    @click="handleClick(scope.row, '2')"
                    type="primary"
                    size="mini"
                    >撤回
                  </el-button>
                  <!--发起人为登录用户 且状态 为 state=1或者7（暂存或者驳回） 时有权限 -->
                  <el-button
                    v-show="userCode === scope.row.USER_CODE"
                    v-if="scope.row.STATE === '1' || scope.row.STATE === '7'"
                    @click="handleClick(scope.row, '3')"
                    type="primary"
                    size="mini"
                    plain
                    >修改
                  </el-button>
                  <!--状态 为 state=4或者5（已评审待验证或者完成） 时有权限 -->
                  <el-button
                    v-if="scope.row.STATE === '4' || scope.row.STATE === '5'"
                    @click="handleClick(scope.row, '4')"
                    type="primary"
                    size="mini"
                    plain
                    >打印
                  </el-button>
                  <!--状态 为 state=5（完成） 时有权限 -->
                  <el-button
                    v-if="scope.row.STATE === '5'"
                    @click="handleClick(scope.row, '6')"
                    type="primary"
                    size="mini"
                    plain
                    >导出
                  </el-button>
                  <!--用户为信息经办人 且状态 为 state=5（完成） 时有权限 且未归档 -->
                  <el-button
                    v-if="
                      scope.row.STATE === '5' &&
                        scope.row.ISPOWER > 0 &&
                        scope.row.FILED_STATE !== 'Y'
                    "
                    @click="handleClick(scope.row, '7')"
                    type="primary"
                    size="mini"
                    plain
                    >归档
                  </el-button>
                  <!--用户为信息经办人状态 为 state=5（完成） 时有权限 且已归档显示 -->
                  <el-button
                    v-if="
                      scope.row.STATE === '5' &&
                        scope.row.ISPOWER > 0 &&
                        scope.row.FILED_STATE === 'Y'
                    "
                    type="info"
                    size="mini"
                    plain
                    disabled
                    >已归档
                  </el-button>

                  <!--发起人为登录用户 且状态 为 state=1（暂存） 时有权限 -->
                  <el-button
                    v-show="userCode === scope.row.USER_CODE"
                    v-if="scope.row.STATE === '1'"
                    type="primary"
                    size="mini"
                    @click="handleClick(scope.row, '5')"
                    plain
                    >删除
                  </el-button>
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

    <el-dialog
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
    </el-dialog>

    <el-dialog
      v-if="dialogVisible1"
      :visible.sync="dialogVisible1"
      width="50%"
      :modal-append-to-body="false"
      :show-close="false"
      :close-on-click-modal="false"
      class="history_dialog"
    >
      <div slot="title">
        <el-row>
          <el-col style="width: calc(100% - 100px);padding-left: 15px;">{{
            dialogTitle1
          }}</el-col>
          <el-col style="width: 100px;text-align: right;padding-right: 15px;">
            <span
              class="el-dialog__close el-icon el-icon-close active"
              style="padding:5px;font-weight: bold;"
              @click="dialogVisible1 = false"
            ></span>
          </el-col>
        </el-row>
      </div>
      <div style="line-height: 50px;font-size: 14px;min-width: 600px;">
        <el-row>
          <el-col class="history_dialog_row_label">项目名称：</el-col>
          <el-col class="history_dialog_row_desc">{{
            fileObj.project_name || "暂无"
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="history_dialog_row_label">合同名称：</el-col>
          <el-col class="history_dialog_row_desc">{{
            fileObj.contract_name || "暂无"
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="history_dialog_row_label">
            <span class="rule_item" style="margin-right: 4px;">*</span
            >ITME合同阶段：
          </el-col>
          <el-col class="history_dialog_row_desc">
            <el-select
              size="mini"
              v-model="fileObj.stage"
              placeholder="请选择ITME合同阶段"
            >
              <el-option
                v-for="fileStage in contractStepList"
                :label="fileStage.value"
                :value="fileStage.code"
                :key="'stage_' + fileStage.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="history_dialog_row_label">提交人：</el-col>
          <el-col class="history_dialog_row_desc">{{ userName }}</el-col>
        </el-row>
        <div class="history_dialog_annotate">
          注：归档后会将项目附件及评审单pdf文档存入ITME系统文档管理
        </div>
      </div>
      <div slot="footer" style="text-align: center;">
        <el-button
          type="primary"
          size="mini"
          plain
          @click="dialogVisible1 = false"
          >取消</el-button
        >
        <el-button type="primary" size="mini" @click="handleKeepOnFileSubmit"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import project_print from "../project_print/index";

export default {
  name: "project_history",
  props: ["stateList", "processCompList", "contractStepList"],
  components: {
    project_print
  },
  data() {
    return {
      /** 登录用户信息 */
      userCode: sessionStorage.getItem("userCode"), //用户账号
      userName: this.GLOBAL.userName, //用户名

      /** 导出弹框页面 */
      dialogVisible: false, //弹框状态
      dialogTitle: "", //弹框标题
      num: 1,

      /** 导出页面参数 --- 项目信息和合同信息*/
      project_id: "",
      project_code: "",
      project_name: "",
      project_title: "",

      /** 归档弹框页面*/
      dialogVisible1: false,
      dialogTitle1: "归档到ITME系统",
      fileObj: {
        stage: ""
      },

      /** table */
      loading: false, //table 加载状态
      tableHeight: window.innerHeight - 240, //table 最大高度
      tableHeader: [], //table 的header
      projectList: [], //table 的data
      total: 1, //table 分页总数

      /** 项目记录查询 */
      billType: "",
      searchFormInline: {
        bill_type: "", //评审类型
        query_text: "", //输入框条件
        start_date: "", //选择周期 开始日期
        end_date: "", //选择周期 结束日期
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
    this.searchFormInline.bill_type = this.processCompList[0].code;
    this.billType = this.searchFormInline.bill_type;

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
        label: "项目评审类型",
        prop: "PROJECT_VIEW_TYPE_NAME"
        // width: 130
      });

      if (_type === "6") {
        this.tableHeader.push({
          label: "验收类型",
          prop: "ACCEPT_TYPE"
          // width: 130
        });
      }

      if (_type === "8" || _type === "9") {
        this.tableHeader.push({
          label: "测评阶段 ",
          prop: "BILL_TYPE_NAME",
          width: 70
        });
      }
      if (_type === "14") {
        this.tableHeader.push({
          label: "测评阶段 ",
          prop: "SIGN_STAGE_NAME",
          width: 70
        });
      }
      this.tableHeader.push({
        label: "项目名称",
        prop: "PROJECT_NAME",
        minWidth: 100,
        sortable: true
      });

      this.tableHeader.push({
        label: "项目编号",
        prop: "PROJECT_CODE"
      });

      this.tableHeader.push({
        label: "合同名称",
        prop: "CONTRACT_NAME",
        minWidth: 100
      });

      this.tableHeader.push({
        label: "合同编号",
        prop: "CONTRACT_CODE"
      });

      if (
        _type === "1" ||
        _type === "3" ||
        _type === "5" ||
        _type === "10" ||
        _type === "12"
      ) {
        this.tableHeader.push({
          label: "项目执行部门负责人",
          prop: "PROJECT_EXECUTE_DEPT_NAME"
        });
      }

      if (_type === "1" || _type === "3" || _type === "5" || _type === "10") {
        this.tableHeader.push({
          label: "业务主管部门负责人",
          prop: "BIZ_COMP_DEPT_NAME"
        });
      }

      if (_type === "1" || _type === "3" || _type === "12") {
        this.tableHeader.push({
          label: "相关业务部门干系人",
          prop: "BIZ_ABOUT_DEPT_NAME"
        });
      }
      if (
        _type === "1" ||
        _type === "3" ||
        _type === "5" ||
        _type === "10" ||
        _type === "12"
      ) {
        this.tableHeader.push({
          label: "供应商项目经理",
          prop: "PROVIDER_NAME"
        });
      }
      if (_type === "2" || _type === "4") {
        this.tableHeader.push({
          label: "项目评委",
          prop: "JUDGE_USER"
        });

        this.tableHeader.push({
          label: "改进措施验证人",
          prop: "CHECK_USER"
        });
      }

      if (_type === "6") {
        this.tableHeader.push({
          label: "验收确认人",
          prop: "CONFIRM_USER"
        });
      }

      if (_type === "7") {
        this.tableHeader.push({
          label: "评审人",
          prop: "JUDGE_USER"
        });

        this.tableHeader.push({
          label: "改进措施验证人",
          prop: "CHECK_USER"
        });
      }

      if (_type === "8") {
        this.tableHeader.push({
          label: "信息中心",
          prop: "MSG_USER"
        });

        this.tableHeader.push({
          label: "评测人",
          prop: "JUDGE_USER"
        });
      }

      if (_type === "9" || _type === "11" || _type === "13") {
        this.tableHeader.push({
          label: "项目业务经办人",
          prop: "BIZ_USER"
        });

        this.tableHeader.push({
          label: "项目信息经办人",
          prop: "MSG_USER"
        });

        if (_type === "13") {
          this.tableHeader.push({
            label: "供应商项目经理",
            prop: "PROVIDER_NAME"
          });
        }
      }

      if (_type === "9") {
        // this.tableHeader.push({
        //   label: '应用系统主管',
        //   prop: 'APPS_USER'
        // });

        // this.tableHeader.push({
        //   label: '信息化部门主管',
        //   prop: 'INDP_USER'
        // });

        this.tableHeader.push({
          label: "网络安全管理员",
          prop: "WEB_USER"
        });
      }
      if (_type === "11" || _type === "14") {
        this.tableHeader.push({
          label: "签字模版",
          prop: "SIGN_TYPE_NAME"
        });
      }
      this.tableHeader.push({
        label: "申请时间",
        prop: "CRT_TIME",
        width: 90
      });

      this.tableHeader.push({
        label: "完成时间",
        prop: "UPT_TIME",
        width: 90
      });

      this.tableHeader.push({
        label: "发起人",
        prop: "CRT_USER",
        width: 80
      });

      this.tableHeader.push({
        label: "状态",
        prop: "STATE_NAME",
        width: 70,
        sortable: true
      });
    },
    /** 获取table data */
    getProjectList() {
      let obj = {};
      this.loading = true;
      this.searchFormInline.query_text = this.searchFormInline.query_text.trim();
      obj.params = this.searchFormInline;
      obj.serviceRoot = "project/confirmQuery";
      obj.baseURL = "/itmsdrm";
      this.projectList = [];
      this.requestDrmService(obj, this)
        .then(res => {
          this.loading = false;
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData);
            console.log(result_data);
            this.total = result_data.total || 0;
            this.projectList = this.projectList.concat(result_data.rows || []);
            this.projectList.map(el => {
              if (el.ACCEPT_TYPE) {
                el.ACCEPT_TYPE = this.$parent.$parent.$parent.getAcceptObj(
                  el.ACCEPT_TYPE
                ).value;
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /** 评审类型变化后 调用的方法 */
    handleSelectBill() {
      this.billType = this.searchFormInline.bill_type;
    },
    /** 项目记录查询 查询按钮 */
    onSubmit(_type) {
      let start_date, end_date;
      if (_type === "0") {
        if (this.searchTime.length !== 0) {
          start_date = this.searchTime[0];
          end_date = this.searchTime[1];
          this.searchFormInline.start_date = this.appDateFormat(
            start_date,
            "yyyy-mm-dd"
          );
          this.searchFormInline.end_date = this.appDateFormat(
            end_date,
            "yyyy-mm-dd"
          );
        }
      } else if (_type === "1") {
        this.searchTime = "";
        this.searchFormInline.start_date = "";
        this.searchFormInline.end_date = "";
        this.searchFormInline.query_text = "";
        this.searchFormInline.page = 1;
      }

      this.getProjectList();
    },
    /** table 操作列 按钮方法 */
    handleClick(rowData, _type) {
      let content = this.$parent.$parent.$parent.linkToPage(this.billType);
      let tabName = this.$parent.$parent.$parent.randomString(6);
      let title = "查看";
      let type = "read";
      if (_type === "1" || _type === "3") {
        //查看或修改
        if (_type === "3") {
          //修改
          type = "edit";
          title = "修改";
        }
        let obj_params = {
          name: tabName,
          content: content,
          closable: true,
          project_id: rowData.ID,
          bill_code: "codecodecodecode", //rowData.TYPE,
          type: type
        };
        obj_params.title = title + rowData.PROJECT_VIEW_TYPE_NAME;
        if (rowData.TYPE === "8" || rowData.TYPE === "9") {
          //安全评测
          if (rowData.TYPE === "8") {
            //安全评测确认单
            obj_params.subId = rowData.APPLY_ID || "";
          } else if (rowData.TYPE === "9") {
            //安全评测申请单
            obj_params.subId = rowData.CONFIRM_ID || "";
          }
          obj_params.bill_type = rowData.BILL_TYPE;
          title += rowData.BILL_TYPE_NAME;
          obj_params.title = title + "安全评测";
        } else if (rowData.TYPE === "14") {
          //用户确认签字
          obj_params.bill_type = rowData.SIGN_STAGE;
          title += rowData.SIGN_STAGE_NAME;
          obj_params.title = title + rowData.PROJECT_VIEW_TYPE_NAME;
        }

        this.$parent.$parent.$parent.tabsList.push(obj_params);
        this.$parent.$parent.$parent.activeName = tabName;
      } else if (_type === "2") {
        //撤回

        this.getFormBack(rowData);
      } else if (_type === "4") {
        //打印
        let href_url;
        if (rowData.STORE_FILE_ID === null || rowData.STORE_FILE_ID === "") {
          const { href } = this.$router.resolve({
            path: "/printPdf",
            query: {
              projectId: rowData.ID,
              code: this.searchFormInline.bill_type
            }
          });
          href_url = href;
        } else {
          const { href } = this.$router.resolve({
            path: "/projectPrint",
            query: {
              projectId: rowData.ID
            }
          });
          href_url = href;
        }

        window.open(href_url, "_blank");
      } else if (_type === "5") {
        //删除

        this.deleteForm(rowData);
      } else if (_type === "6") {
        //导出
        // this.project_id = rowData.ID;
        // this.project_code = this.searchFormInline.bill_type;
        // this.project_title = '';
        // if (rowData.TYPE === '8' || rowData.TYPE === '9') {
        //   this.project_title = rowData.BILL_TYPE_NAME;
        // }
        //
        // this.project_name = rowData.PROJECT_NAME;
        // this.dialogTitle = rowData.PROJECT_NAME + this.project_title + rowData.PROJECT_VIEW_TYPE_NAME;
        // this.dialogVisible = true;
        /** pdf 名为 表单抬头+（项目名称） */
        if (rowData.STORE_FILE_ID === null || rowData.STORE_FILE_ID === "") {
          this.$message({
            type: "warning",
            message: "pdf还未生成，请稍后再试！"
          });
          return;
        }

        window.location.href =
          this.GLOBAL.fileDownloadUrl +
          "?module=workOrder&fileId=" +
          rowData.STORE_FILE_ID;
      } else if (_type === "7") {
        //归档
        if (rowData.STORE_FILE_ID === null || rowData.STORE_FILE_ID === "") {
          this.$message({
            type: "warning",
            message: "pdf还未生成，请稍后再试！"
          });
          return;
        }

        this.dialogVisible1 = true;
        this.fileObj.stage = "";
        this.fileObj.project_name = rowData.PROJECT_NAME;
        this.fileObj.contract_name = rowData.CONTRACT_NAME;
        this.fileObj.project_id = rowData.ID;
        this.fileObj.file_id = rowData.STORE_FILE_ID;
      }
    },
    /** 打印页面 导出按钮 执行方法 */
    pdfOut() {
      let dom = document
        .querySelector("#printContent")
        .getElementsByClassName("project_title1");
      let domTitle = dom[0].innerHTML;
      let appendTitle =
        "（" +
        this.project_name +
        (this.project_title.length > 0 ? "-" + this.project_title : "") +
        "）";
      this.getPdf("printContent", domTitle + appendTitle);
      this.dialogVisible = false;
    },
    /** table 操作列中 删除按钮 执行方法 */
    deleteForm(rowData) {
      this.$confirm("此操作将删除表单，是否继续?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      }).then(() => {
        let obj = {};
        obj.serviceRoot = "project/deleteProjectReview";
        obj.baseURL = "/itmsdrm";
        obj.params = {
          id: rowData.ID,
          bill_type: rowData.TYPE
        };
        let type = "info";
        let message = "";
        this.requestDrmService(obj, this)
          .then(res => {
            if (res.resultCode === "0") {
              let result_data = JSON.parse(res.resultData);
              message = result_data.message;
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
    /** table 操作列 撤回按钮 调用方法*/
    getFormBack(rowData) {
      this.$confirm("此操作将需评审的表单撤回, 是否继续?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          let obj = {};
          obj.serviceRoot = "project/cancelTaskApprove";
          obj.baseURL = "/itmsdrm";
          obj.params = {
            id: rowData.ID,
            bill_type: rowData.TYPE
          };
          let type = "info";
          let message = "";
          this.requestDrmService(obj, this)
            .then(res => {
              if (res.resultCode === "0") {
                let result_data = JSON.parse(res.resultData);
                if (result_data.flag) {
                  type = "success";
                  message = "操作成功！";
                  this.getProjectList();
                } else {
                  type = "error";
                  message = "操作失败！";
                }
              } else {
                type = "error";
                message = "操作失败！";
              }
              this.$message({
                type: type,
                message: message
              });
            })
            .catch(err => {
              type = "error";
              message = "操作失败！";
              this.$message({
                type: type,
                message: message
              });
              console.log(err);
            });
        })
        .catch(() => {});
    },
    /** table 操作列 归档按钮 执行方法 */
    handleKeepOnFileSubmit() {
      console.log(this.fileObj);

      let type = "info";
      let message = "";
      let obj = {};
      obj.serviceRoot = "project/itms_gd";
      obj.params = {
        main_id: this.fileObj.project_id,
        user_id: this.GLOBAL.userCode,
        gd_stage_code: this.fileObj.stage
      };

      this.requestDrmService(obj, this)
        .then(res => {
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData);
            if (result_data.msg === "success") {
              type = "success";
              message = "操作成功！";
              this.dialogVisible1 = false;
              this.getProjectList();
            } else {
              type = "error";
              message = "操作失败！";
            }
          } else {
            type = "error";
            message = "操作失败！";
          }
          this.$message({
            type: type,
            message: message
          });
        })
        .catch(err => {
          type = "error";
          message = "操作失败！";
          this.$message({
            type: type,
            message: message
          });
          console.log(err);
        });
    }
  }
};
</script>

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

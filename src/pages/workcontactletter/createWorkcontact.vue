<!-- 设计报告确认单 edit by xyy -->
<template>
  <div id="designer_report_confirm">
    <div class="project_form">
      <div class="project_title">{{ projectTitle }}工作联系函</div>
      <div
        style="height:100%;background:white;margin-top:10px;padding:20px 40px;"
      >
        <el-form
          :model="formData"
          :rules="rules"
          ref="formRef"
          size="small"
          :show-message="showMessage"
          label-position="left"
          label-width="150px"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="任务名称" prop="letter_name">
                <el-input v-model="formData.letter_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="限定完成时间" prop="limited_time">
                <!-- value-format="yyyy-MM-dd" -->
                <el-date-picker
                  v-model="formData.limited_time"
                  type="date"
                  placeholder="请选择签字日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="personCenter"
                style="padding-right:30px"
                label-width="100px"
                label="责任人"
                prop="project_execute_dept_name"
              >
                <div style="position: relative;">
                  <el-input
                    v-model="formData.project_execute_dept_name"
                    placeholder="请选择项目执行部门/负责人"
                    :disabled="false"
                    readonly
                  ></el-input>
                  <span
                    v-if="
                      formData.project_execute_dept_name != '' //&& !isReadonly
                    "
                    class="clear_input_item"
                    @click="handleUserDelete('project_execute_dept_name')"
                  >
                    <span class="el-icon-circle-close"></span>
                  </span>
                </div>

                <i
                  style="position:absolute;right:-30px;top:5px"
                  class="el-icon-circle-plus add_user_img"
                  @click="
                    handleAddUsers('project_execute_dept_name', '责任人', true)
                  "
                ></i>
              </el-form-item>

              <!-- <el-form-item style="margin-left:80px" label="责任人" prop="project_code">
                <el-input v-if="isReadonly" v-model="formData.project_code"></el-input>
                <el-select v-else v-model="formData.project_id1" filterable placeholder="请选择项目编号" @change="handleSelectProject"
                  style="width: 100%;">
                  <el-option v-for="(item,i) in projectOptions" :key="item.project_id+i" :label="item.project_code"
                    :value="item.project_id">
                  </el-option>
                </el-select>
              </el-form-item> -->
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="责任单位（部门）" prop="imple_depart">
                <el-input v-model="formData.imple_depart"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="padding-top: 30px;">
            <el-col :span="24" style="text-align: right;padding-top:8px;">
              <el-button size="mini" type="primary" @click="handleAddDetails"
                >增加
              </el-button>
              <el-button size="mini" type="warning" @click="handleDeleteDetails"
                >删除
              </el-button>
            </el-col>
          </el-row>

          <div
            class="func_list_item_"
            style="margin-top:10px;margin-bottom:10px"
          >
            <!-- 待实施工作内容 start-->
            <el-form-item label="" prop="letter_contents">
              <el-table
                border
                ref="multipleTable"
                :data="formData.letter_contents"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  header-align="center"
                  align="center"
                  type="selection"
                  width="55"
                >
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  type="index"
                  label="序号"
                  width="50"
                >
                </el-table-column>

                <el-table-column
                  header-align="center"
                  prop="name"
                  label="待实施工作项内容"
                  align="center"
                >
                  <!-- <template slot-scope="scope" >            
                <el-input
                  contenteditable="true"
                  placeholder=""/>     
              </template> -->
                  <template slot-scope="scope">
                    <!-- <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p> -->

                    <el-input prop="" v-model="scope.row.name" placeholder="" />
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>

            <!-- 描述与附件 -->
            <div style="margin-top:20px;display:none">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="实际情况描述" prop="project_name">
                    <el-input
                      v-model="formData.contract_code"
                      type="textarea"
                      rows="4"
                      :disabled="!isReadonly"
                      placeholder=""
                      :autosize="{ minRows: 4 }"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="完成时间">
                    <el-date-picker
                      v-model="formData.sign_date"
                      type="date"
                      placeholder="请选择签字日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="设计报告：" prop="file_list_attach2">
                    <div v-if="isReadonly && projectType === 'read'">
                      <span
                        class="attach_no_data"
                        v-if="formData.file_list_attach2.length === 0"
                        >暂无</span
                      >
                      <div v-else>
                        <div
                          class="download_file_name"
                          v-for="(item, i) in formData.file_list_attach2"
                          :key="'attach_' + i"
                        >
                          <span class="el-icon-document"></span>
                          <a :href="item.url">{{ item.name }}</a>
                        </div>
                      </div>
                    </div>
                    <el-upload
                      v-else
                      ref="upload_attach2"
                      :disabled="!isReadonly"
                      class="upload-demo"
                      :action="uploadUrl"
                      :auto-upload="false"
                      :show-file-list="false"
                      :name="'FILE_CONTENTS'"
                      multiple
                      :data="{
                        bizId: projectId,
                        uploadType: 'doc01',
                        prop: 'attach2'
                      }"
                      :on-change="handleChangeFile2"
                    >
                      <div slot="trigger">
                        <el-button
                          size="small"
                          :disabled="!isReadonly"
                          type="primary"
                          style="width: 200px;"
                          >上传附件</el-button
                        >
                        <!--<el-button size="small" :disabled="isReadonly" type="primary" style="width: 100px;">上传</el-button>-->
                      </div>

                      <div class="file_list">
                        <el-row
                          class="file_list_row"
                          v-for="(file, i) in formData.file_list_attach2"
                          :key="'file_' + i"
                        >
                          <el-col class="file_list_name">
                            <span class="el-icon-document"></span>
                            <a :href="file.url">{{ file.file_name }}</a>
                          </el-col>
                          <el-col v-if="!isReadonly" class="file_list_delete">
                            <el-button
                              type="text"
                              size="mini"
                              @click="
                                handleDeleteFile(
                                  file.id,
                                  file.file_name,
                                  'attach2'
                                )
                              "
                            >
                              <span class="el-icon-close"></span>
                            </el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 底部按钮 -->
            <el-row>
              <el-col :span="24">
                <div style="text-align:center;margin-top:30px">
                  <el-button
                    type="primary"
                    v-loading.fullscreen.lock="this.loading"
                    @click="onSave"
                    >保存</el-button
                  >
                  <el-button @click="onSubmit" type="warning">提交</el-button>
                </div>
              </el-col>
            </el-row>

            <!-- 待实施工作内容 end-->
          </div>
        </el-form>
      </div>
    </div>

    <el-dialog
      v-if="dialogVisible"
      class="no_footer"
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

      <dept_user_index
        ref="deptUserRef"
        :isCheckBtn="isCheckBtn"
      ></dept_user_index>
    </el-dialog>
  </div>
</template>

<script>
import dept_user_index from "../project_dept_user/dept_user_index"; //人员选择
import QRCode from "qrcodejs2";

export default {
  //name: "designer_report_confirm",
  name: "createWorkcontact",
  props: ["projectId", "projectType", "billCode"],
  components: {
    dept_user_index
  },
  data() {
    return {
      /*选中的工作项*/
      multipleSelection: [],

      /** 校验信息 */
      showMessage: true,

      loading: false, //接口加载状态 true 加载中 ，false 加载完

      /** 合同信息 */
      contract_id: "", //合同id
      contractSelect: false,
      contractList: [], //合同列表

      projectOptions: [], //项目列表

      /** 人员选择弹框 */
      dialogVisible: false,
      dialogTitle: "", //dialog标题
      selectItem: {}, //dialog弹框时赋值
      isCheckBtn: false, //是否多选
      checkedList: [], //已选人员

      state: "1", //表单状态
      projectTitle: "", //表单抬头
      projectCode: "", //表单编码
      isReadonly: false, //projectType为read时为 true，（add,read）为 false
      // isReadonly: false, //projectType为read时为 true，（add,read）为 false

      uploadUrl: "transfer/api/dsm/file/upload", //上传url

      /** 表单参数 */
      formData: {
        /*工作联系函基本信息*/
        letter_name: "", //工作联系函任务名称
        letter_contents: [], //工作事项
        limited_time: "", //限定完成时间
        imple_uses: [], //责任人
        imple_depart: "", //责任部门

        /** 项目基本信息 */
        project_id: "", //项目id
        project_id1: "", //项目id
        project_name: "", //项目名称
        project_code: "", //项目编码
        contract_id: "", //合同id
        contract_name: "", //合同名称
        contract_code: "", //合同编码
        sign_date: "", //签字日期

        /** 确认人信息 */
        project_execute_dept_name: "", //项目执行部门/负责人
        project_execute_dept_name_ids: [], //项目执行部门/负责人数组
        biz_comp_dept_name: "", //业务主管部门/负责人
        biz_comp_dept_name_ids: [], //业务主管部门/负责人数组
        biz_about_dept_name: "", //相关业务部门/负责人
        biz_about_dept_name_ids: [], //相关业务部门/负责人数组
        provider_name: "", //供应商项目经理
        provider_name_ids: [], //供应商项目经理人员数组

        /** 附件 */
        file_list_attach1: [], //附件-设计报告
        file_list_attach2: [], //附件-设计评审报告
        file_list_attach3: [], //附件-其它文档
        upload_list_attach: [] //正在选择的上传文件
      },
      /** 表单校验 */
      rules: {
        letter_name: [
          {
            required: true,
            message: "请填写任务名称",
            trigger: "blur"
          }
        ],
        letter_contents: [
          {
            type: "array",
            required: true,
            message: "请填写工作事项",
            trigger: "blur"
          }
        ],
        limited_time: [
          {
            type: "date",
            // trigger: "change",
            trigger: "blur",
            required: true,
            message: "请选择限定完成时间"
          }
        ],
        imple_depart: [
          {
            required: true,
            trigger: "blur",

            message: "请填写责任单位（部门）"
          }
        ],
        project_execute_dept_name: [
          {
            required: true,
            message: "请选择责任人"
          }
        ],
        //--------------------------------分隔符------------------------------------
        project_name: [
          {
            required: false,
            message: "请选择项目名称"
          }
        ],
        project_code: [
          {
            required: false,
            message: "请选择项目编号"
          }
        ],
        contract_id: [
          {
            required: false,
            message: "请选择合同名称"
          }
        ],
        contract_code: [
          {
            required: false,
            message: "请在合同名称重新选择合同"
          }
        ],
        // project_execute_dept_name: [
        //   {
        //     required: false,
        //     message: "请选择项目执行部门/负责人"
        //   }
        // ],
        biz_comp_dept_name: [
          {
            required: false,
            message: "请选择业务主管部门/负责人"
          }
        ],
        provider_name: [
          {
            required: false,
            message: "请选择供应商项目经理"
          }
        ],
        sign_date: [
          {
            required: false,
            message: "请选择签字日期"
          }
        ],
        file_list_attach1: [
          {
            required: false,
            message: "请上传设计评审报告"
          }
        ],
        file_list_attach2: [
          {
            required: false,
            message: "请上传设计报告"
          }
        ]
      }
    };
  },
  watch: {
    state(val) {
      if (val !== "1") {
        this.isReadonly = true;
      }
    },
    contract_id(val) {
      this.formData.contract_id = val;
      if (this.contractSelect) {
        return;
      }
      this.contractList.map(el => {
        if (el.id === val) {
          this.formData.contract_code = el.contract_code;
          this.formData.contract_name = el.contract_name;
          this.formData.supplier = el.supplier_name || "";
        }
      });
      if (
        this.formData.contract_code === "" ||
        this.formData.contract_code === null
      ) {
        this.$message({
          type: "warning",
          message: "合同编号不能为空！请先到ITME系统中维护合同编号！"
        });
      }
    }
  },
  mounted() {
    this.projectTitle = this.$parent.$parent.$parent.projectTitle;
    this.projectCode = this.$parent.$parent.$parent.getProjectCode(
      this.billCode
    ).label;
    if (this.projectType === "add" || this.projectType === "edit") {
      this.isReadonly = false;
    } else {
      this.isReadonly = true;
    }

    this.getProjectListData();

    if (this.projectType !== "add") {
      this.getFormData();
    }
  },
  methods: {
    /*------提交事件------*/
    onSubmit() {
      // this.$confirm(`确定提交？`, "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning"
      // }).then(() => {}).catch(() => {});
      //this.$router.push({ path: "/printDetail", query: { stage: "" } });

      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (this.formData.letter_contents.length > 0) {
            var contents = this.formData.letter_contents;
            for (var i = 0; i < contents.length; i++) {
              if (contents[i].name.trim() === "") {
                this.$message({
                  message: "工作项内容并不能为空！",
                  type: "warning"
                });
                return;
              }
            }
          }

          /*------执行提交操作------*/
          var date = this.moment(this.formData.limited_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.formData.limited_time = date;

          let checkedList = this.checkedList; //责任人
          if (checkedList.length > 0) {
            for (var i = 0; i < checkedList.length; i++) {
              this.formData.imple_uses.push(checkedList[i].user_id);
            }
          }
          let letter_contents = []; //工作事项
          if (this.formData.letter_contents.length > 0) {
            for (var i = 0; i < this.formData.letter_contents.length; i++) {
              letter_contents.push(this.formData.letter_contents[i].name);
            }
          }

          let obj = {};
          obj.serviceRoot = "WorkLetter/work_letter_submit";
          obj.params = {
            data: {
              row: [
                {
                  letter_name: this.formData.letter_name,
                  letter_contents: letter_contents,
                  limited_time: this.formData.limited_time,
                  imple_uses: this.formData.imple_uses, //["99100774", "99100778"],
                  imple_depart: this.formData.imple_depart,
                  loggedUser: {
                    path: "1/S00000000000003/S00000000012424",
                    weight: "1",
                    id: this.GLOBAL.userCode
                  }
                }
              ]
            },
            head: {
              msg_code: "work_letter_submit",
              msg_id: "work_letter_submit",
              request_time: "",
              source_sys: "prodsm",
              service_class: "WorkLetter",
              target_sys: "MOBILE",
              user_id: "admin",
              user_key: "admin"
            }
          };

          this.loading = true;
          this.requestDrmService(obj, this)
            .then(res => {
              this.loading = false;
              console.log("提交成功：----", res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },

    /*------保存事件-----*/
    onSave() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (this.formData.letter_contents.length > 0) {
            var contents = this.formData.letter_contents;
            for (var i = 0; i < contents.length; i++) {
              if (contents[i].name.trim() === "") {
                this.$message({
                  message: "工作项内容并不能为空！",
                  type: "warning"
                });
                return;
              }
            }
          }

          /*------执行保存操作------*/
          var date = this.moment(this.formData.limited_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.formData.limited_time = date;
          alert("即将要保存的时间：" + this.formData.limited_time);
          let checkedList = this.checkedList; //责任人
          if (checkedList.length > 0) {
            for (var i = 0; i < checkedList.length; i++) {
              this.formData.imple_uses.push(checkedList[i].user_id);
            }
          }
          let letter_contents = []; //工作事项
          if (this.formData.letter_contents.length > 0) {
            for (var i = 0; i < this.formData.letter_contents.length; i++) {
              letter_contents.push(this.formData.letter_contents[i].name);
            }
          }

          let obj = {};
          obj.serviceRoot = "WorkLetter/work_letter_save";
          obj.params = {
            data: {
              row: [
                {
                  letter_name: this.formData.letter_name,
                  letter_contents: letter_contents,
                  limited_time: this.formData.limited_time,
                  imple_uses: this.formData.imple_uses, //["99100774", "99100778"],
                  imple_depart: this.formData.imple_depart,
                  loggedUser: {
                    path: "1/S00000000000003/S00000000012424",
                    weight: "1",
                    id: this.GLOBAL.userCode
                  }
                }
              ]
            },
            head: {
              msg_code: "work_letter_save",
              msg_id: "work_letter_save",
              request_time: "",
              source_sys: "prodsm",
              service_class: "WorkLetter",
              target_sys: "MOBILE",
              user_id: "admin",
              user_key: "admin"
            }
          };

          this.loading = true;
          this.requestDrmService(obj, this)
            .then(res => {
              this.loading = false;
              console.log("保存成功：----", res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    //增加一行表格
    handleAddDetails() {
      if (this.formData.letter_contents == undefined) {
        this.formData.letter_contents = new Array();
      }
      let obj = {};
      obj.id = this.formData.letter_contents.length + 1;
      obj.name = "";
      //if ((obj, name.trim() && obj.name.trim() !== "")) {
      this.formData.letter_contents.push(obj);
      //}
    },
    //删除选中的表格
    handleDeleteDetails() {
      if (this.multipleSelection.length === 0) {
        this.$alert("请先选择要删除的数据", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        for (var i = 0; i < this.multipleSelection.length; i++) {
          for (var j = 0; j < this.formData.letter_contents.length; j++) {
            if (
              this.multipleSelection[i].id ===
              this.formData.letter_contents[j].id
            ) {
              this.formData.letter_contents.splice(j, 1);
            }
          }
        }
        //this.tableData.splice(this.multipleSelection[0].xh - 1, 1);
      }
    },
    //点击复选框的事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /** 项目基本信息-获取项目列表 */
    getProjectListData() {
      let obj = {};
      obj.params = {
        type: this.billCode
      };
      obj.serviceRoot = "project/searchProjectByJudge";
      obj.baseURL = "/itmsdrm";
      this.requestDrmService(obj, this)
        .then(res => {
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData);
            this.projectOptions = result_data.rows;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /** 项目基本信息 - 项目 change */
    handleSelectProject(val) {
      let list = {};
      this.projectOptions.map(el => {
        if (val === el.project_id) {
          list = el;
          this.formData.project_name = el.project_name;
          this.formData.project_code = el.project_code;
          this.formData.project_id1 = val;
          this.formData.project_id = val;
        }
      });

      this.getContractList(val);
      if (
        this.formData.project_code === null ||
        this.formData.project_code === ""
      ) {
        this.formData.project_id1 = "";
        this.$message({
          type: "warning",
          message: "请联系信息经办人在ITME系统中维护项目编号"
        });
      }
    },
    /** 项目基本信息 - 合同 change */
    handleSelectContract(val) {
      this.contractSelect = false;
      this.contract_id = val;
    },
    /** 项目基本信息-获取合同列表 */
    getContractList(project_id, _type, contractId) {
      let obj = {};
      obj.params = {
        project_id: project_id
      };
      obj.serviceRoot = "itms/contractByProjectIdQuery";
      obj.baseURL = "/itmsdrm";
      this.requestDrmService(obj, this)
        .then(res => {
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData);
            this.contractList = result_data.rows || [];
            if (_type) {
              this.contractSelect = true;
              this.contract_id = contractId;
              return;
            }

            this.contractSelect = false;
            if (this.contractList.length !== 0) {
              this.contract_id = this.contractList[0].id;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /** 根据表单id 获取表单信息 */
    getFormData() {
      let obj = {};
      obj.params = {
        id: this.projectId
      };
      obj.serviceRoot = "project/designReportByIdQuery";
      obj.baseURL = "/itmsdrm";
      this.requestDrmService(obj, this)
        .then(res => {
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData).map;
            this.state = result_data.state;
            this.formData.project_id = result_data.project_id;
            this.formData.project_code = result_data.project_code;
            this.formData.project_name = result_data.project_name;
            if (
              this.formData.project_code === "" ||
              this.formData.project_code === null
            ) {
              this.formData.project_id1 = "";
            } else {
              this.formData.project_id1 = result_data.project_id;
            }
            this.formData.sign_date = result_data.sign_date;

            this.formData.contract_code = result_data.contract_code;
            this.formData.contract_name = result_data.contract_name;
            this.multi_contract = result_data.multi_contract;

            this.getContractList(
              this.formData.project_id,
              "search",
              result_data.contract_id
            );
            this.formData.project_execute_dept_name_ids = [];
            this.formData.project_execute_dept_name = "";
            result_data.project_execute_dept_name.map(el => {
              this.formData.project_execute_dept_name +=
                (el.dept_name ? el.dept_name + "/" : "") +
                el.dept_user_name +
                "；";
              el.user_id = el.dept_user_id;
              el.user_name = el.dept_user_name;
              el.dept_type = el.type;
              el.msg = el.msg || "";
              this.formData.project_execute_dept_name_ids.push(el);
            });
            if (this.formData.project_execute_dept_name.length > 0) {
              this.formData.project_execute_dept_name = this.formData.project_execute_dept_name.substring(
                0,
                this.formData.project_execute_dept_name.length - 1
              );
            }

            this.formData.biz_about_dept_name_ids = [];
            this.formData.biz_about_dept_name = "";
            result_data.biz_about_dept_name.map(el => {
              this.formData.biz_about_dept_name +=
                (el.dept_name ? el.dept_name + "/" : "") +
                el.dept_user_name +
                "；";
              el.user_id = el.dept_user_id;
              el.user_name = el.dept_user_name;
              el.dept_type = el.type;
              el.msg = el.msg || "";
              this.formData.biz_about_dept_name_ids.push(el);
            });
            if (this.formData.biz_about_dept_name.length > 0) {
              this.formData.biz_about_dept_name = this.formData.biz_about_dept_name.substring(
                0,
                this.formData.biz_about_dept_name.length - 1
              );
            }

            this.formData.biz_comp_dept_name_ids = [];
            this.formData.biz_comp_dept_name = "";
            result_data.biz_comp_dept_name.map(el => {
              this.formData.biz_comp_dept_name +=
                (el.dept_name ? el.dept_name + "/" : "") +
                el.dept_user_name +
                "；";
              el.user_id = el.dept_user_id;
              el.user_name = el.dept_user_name;
              el.dept_type = el.type;
              el.msg = el.msg || "";
              this.formData.biz_comp_dept_name_ids.push(el);
            });
            if (this.formData.biz_comp_dept_name.length > 0) {
              this.formData.biz_comp_dept_name = this.formData.biz_comp_dept_name.substring(
                0,
                this.formData.biz_comp_dept_name.length - 1
              );
            }

            this.formData.provider_name_ids = [];
            this.formData.provider_name = "";
            result_data.provider_name.map(el => {
              this.formData.provider_name +=
                (el.dept_name ? el.dept_name + "/" : "") +
                el.dept_user_name +
                "；";
              el.user_id = el.dept_user_id;
              el.user_name = el.dept_user_name;
              el.dept_type = el.type;
              el.msg = el.msg || "";
              this.formData.provider_name_ids.push(el);
            });
            if (this.formData.provider_name.length > 0) {
              this.formData.provider_name = this.formData.provider_name.substring(
                0,
                this.formData.provider_name.length - 1
              );
            }

            result_data.attach.map(el => {
              el.name = el.file_name;
              el.status = "success";
              if (el.upload_type === "doc02") {
                el.prop = "attach1";
                this.formData["file_list_" + el.prop].push(el);
              } else if (el.upload_type === "doc01") {
                el.prop = "attach2";
                this.formData["file_list_" + el.prop].push(el);
              } else if (el.upload_type === "doc08") {
                el.prop = "attach3";
                this.formData["file_list_" + el.prop].push(el);
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /** 文件删除 */
    handleDeleteFile(id, name, prop) {
      this.$confirm(`确定移除 ${name}？`, "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          this.$parent.$parent.$parent.deleteUploadFile(id, "click");
          this.formData["file_list_" + prop].map((el, i) => {
            if (el.id === id) {
              this.formData["file_list_" + prop].splice(i, 1);
            }
          });
        })
        .catch(() => {});
    },
    /** 文件上传 设计报告 */
    handleChangeFile1(file, fileList) {
      this.formData.upload_list_attach = [];
      this.$confirm("确定上传吗？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          fileList.map((el, i) => {
            if (el.status === "ready") {
              this.formData.upload_list_attach.push(el);
            }
          });
          this.handleSaveFile({
            uploadType: "doc02",
            prop: "attach1"
          });
          this.$refs.upload_attach1.clearFiles();
        })
        .catch(() => {
          this.$refs.upload_attach1.clearFiles();
        });
    },
    /** 文件上传 设计评审报告 */
    handleChangeFile2(file, fileList) {
      this.formData.upload_list_attach = [];
      this.$confirm("确定上传吗？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          fileList.map((el, i) => {
            if (el.status === "ready") {
              this.formData.upload_list_attach.push(el);
            }
          });
          this.handleSaveFile({
            uploadType: "doc01",
            prop: "attach2"
          });
          this.$refs.upload_attach2.clearFiles();
        })
        .catch(() => {
          this.$refs.upload_attach2.clearFiles();
        });
    },
    /** 文件上传 其它文档 */
    handleChangeFile3(file, fileList) {
      this.formData.upload_list_attach = [];
      this.$confirm("确定上传吗？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          fileList.map((el, i) => {
            if (el.status === "ready") {
              this.formData.upload_list_attach.push(el);
            }
          });
          this.handleSaveFile({
            uploadType: "doc08",
            prop: "attach3"
          });
          this.$refs.upload_attach3.clearFiles();
        })
        .catch(() => {
          this.$refs.upload_attach3.clearFiles();
        });
    },
    /** 文件上传接口 */
    handleSaveFile(params) {
      this.$refs.formRef.clearValidate();
      let formData = new FormData();
      this.formData.upload_list_attach.map(file => {
        if (file.status === "ready") {
          formData.append("FILE_CONTENTS", file.raw);
        }
      });
      let obj = {};
      this.$parent.$parent.$parent.handleProgress();

      formData.append("bizId", this.projectId);
      formData.append("uploadType", params.uploadType);
      obj.headerType = "application/x-www-form-urlencoded";
      obj.serviceRoot = "transfer/business/file/upload";
      obj.baseURL = "itmsdrm/";

      this.uploadFile(obj, formData, this)
        .then(res => {
          this.handleUploadSuccess(res, params);
        })
        .catch(err => {
          this.$parent.$parent.$parent.handleUploadError();
          console.log(err);
        });
    },
    /** 文件上传成功后赋值 */
    handleUploadSuccess(response, file_data) {
      let message = response.resultMessage;
      let type = "";
      this.$parent.$parent.$parent.fileUploading.close();
      if (response.resultCode === "0") {
        let result_data = response.resultData;
        result_data.map((el, idx) => {
          this.formData["file_list_" + file_data.prop].push({
            id: el.id,
            url: el.url,
            bizId: el.bizId,
            upload_type: el.uploadType,
            file_name: el.fileName,
            file_size: el.fileSize,
            prop: file_data.prop
          });
        });
        type = "success";
      } else {
        type = "error";
      }
      this.$message({
        type: type,
        message: message
      });
    },
    /** 删除选择人员 */
    handleUserDelete(prop) {
      this.formData[prop] = "";
      this.formData[prop + "_ids"] = [];
      this.checkedList = []; //清空选择的责任人
    },
    /** 选择人员弹框 */
    handleAddUsers(prop, name, checkItem = false) {
      this.checkedList = this.formData[prop + "_ids"];
      this.selectItem.name = name;
      this.selectItem.prop = prop;
      this.dialogTitle = name + "人员选择";

      //this.isCheckBtn = checkItem;
      this.dialogVisible = true;
    },
    /** 选择人员确认 */
    cascadeSubmit(checkList, isCheck) {
      this.dialogVisible = false;
      let checkStr = "";
      let arrList = [];
      let typeList = {
        project_execute_dept_name: "3",
        biz_comp_dept_name: "1",
        biz_about_dept_name: "2",
        provider_name: "4"
      };

      if (checkList.length === 0) {
        this.formData[this.selectItem.prop] = checkStr;
        this.formData[this.selectItem.prop + "_ids"] = arrList;
        return;
      }
      checkList.map((el, i) => {
        checkStr += el.deptName + "/" + el.name + "；";
        arrList.push({
          user_id: el.userId,
          user_name: el.name,
          dept_id: el.parentId || "",
          dept_name: el.deptName || "",
          dept_type: typeList[this.selectItem.prop]
        });
      });

      checkStr = checkStr.substr(0, checkStr.length - 1);
      this.formData[this.selectItem.prop] = checkStr;
      this.formData[this.selectItem.prop + "_ids"] = arrList;
      //选择的责任人
      this.checkedList = arrList;
      //this.project_execute_dept_name = checkStr;
    },
    /** 表单保存 */
    saveFormData() {
      let stateId = this.$parent.$parent.$parent.getStateObj(this.state).id;
      let about_dept = [];
      about_dept = about_dept.concat(this.formData.biz_about_dept_name_ids);
      about_dept = about_dept.concat(this.formData.biz_comp_dept_name_ids);
      about_dept = about_dept.concat(
        this.formData.project_execute_dept_name_ids
      );
      about_dept = about_dept.concat(this.formData.provider_name_ids);
      let param = {
        id: this.projectId,
        project_id: this.formData.project_id,
        state: stateId,
        sign_date:
          this.formData.sign_date === "" || this.formData.sign_date === null
            ? ""
            : this.appDateFormat(this.formData.sign_date, "yyyy-mm-dd"),
        about_dept: about_dept,
        contract_id: this.contract_id,
        multi_contract: this.contractList.length > 1 ? "Y" : "N"
      };

      let obj = {};
      obj.params = param;
      obj.baseURL = "/itmsdrm";
      obj.serviceRoot = "project/designReportSave";
      this.$parent.$parent.$parent.toolLoading();
      this.requestDrmService(obj, this)
        .then(res => {
          this.$parent.$parent.$parent.toolLoadClose();
          let message = "";
          let type = "info";
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData);
            if (result_data.flag) {
              type = "success";
              message = "操作成功！";
              this.$parent.$parent.$parent.getChildrenFun();
            } else {
              this.state = "1";
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
          this.$parent.$parent.$parent.toolLoadClose();
          this.state = "1";
          this.$message({
            message: "操作失败",
            type: "error"
          });
        });
    },
    /** 验证合同是否可选 */
    checkProjectSelect(_state) {
      let obj = {};
      obj.params = {
        project_id: this.formData.project_id,
        contract_code: this.formData.contract_code,
        bill_type: this.billCode,
        safe_type: "",
        contract_id: this.contract_id,
        state: this.state,
        id: this.projectId
      };
      obj.baseURL = "/itmsdrm";
      obj.serviceRoot = "project/checkOutContractGoOn";
      let type = "warning";
      let message = "操作失败！";
      this.requestDrmService(obj, this)
        .then(res => {
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData).map;
            message = result_data.msg;
            if (result_data.flag) {
              this.state = _state;
              this.saveFormData();
            } else {
              // this.state = '1';
              this.$message({
                type: type,
                message: message
              });
            }
          } else {
            // this.state = '1';
            this.$message({
              type: type,
              message: message
            });
          }
        })
        .catch(err => {
          // this.state = '1';
          this.$message({
            type: type,
            message: message
          });
          console.log(err);
        });
    },
    /** 保存 */
    // onSubmit() {
    //   // this.state = '1';
    //   this.$refs.formRef.clearValidate();
    //   this.checkProjectSelect("1");
    // },
    /** 推送至审核人员 */
    handleSendToJudge() {
      //推送到确认人
      this.showMessage = true;
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.showMessage = false;
          this.$confirm("此操作将表单推送至审核人员, 是否继续?", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning"
          })
            .then(() => {
              // this.state = '2';
              this.checkProjectSelect("2");
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          setTimeout(() => {
            const isError = document.getElementsByClassName("is-error");
            if (isError[0].querySelector("input")) {
              isError[0].querySelector("input").focus();
            }
            if (isError[0].querySelector("textarea")) {
              isError[0].querySelector("textarea").focus();
            }
          }, 100);
          return false;
        }
      });
    },
    /** 催办 */
    handleApprove() {
      this.$confirm("此操作是催办还没审核的人员, 是否继续?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          this.$parent.$parent.$parent.handleApprove(
            this.projectId,
            this.billCode
          );
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.personCenter {
  position: relative;
  text-align: center;
  padding-left: 50px;
}
.personCenter > label.el-form-item__label {
  text-align: center;
}
.project_form {
  padding: 10px 20px;
}
.project_title {
  text-align: center;
  font-weight: bold;
  font-size: 25px;
  padding: 10px 0;
  background: white;
  color: #409eff;
}
#designer_report_confirm {
  height: 100%;
  overflow: auto;
}
</style>

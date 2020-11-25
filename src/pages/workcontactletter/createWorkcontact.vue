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
                    placeholder="请选择责任人"
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
                    handleAddUsers('project_execute_dept_name', '责任人', false)
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
            <el-form-item
              style="padding-left:0px"
              label=""
              width="0px"
              prop="letter_contents"
              label-width="0px"
            >
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
      projectTitle: "",
      /*选中的工作项*/
      multipleSelection: [],

      /** 校验信息 */
      showMessage: false,

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

      isReadonly: false, //

      /** 表单参数 */
      formData: {
        /*工作联系函基本信息*/
        letter_name: "", //工作联系函任务名称
        letter_contents: [], //工作事项
        limited_time: "", //限定完成时间
        imple_uses: [], //责任人
        imple_depart: "", //责任部门

        /** 确认人信息 */
        project_execute_dept_name: "", //项目执行部门/负责人
        project_execute_dept_name_ids: [] //项目执行部门/负责人数组
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
            //type: "date",
            // trigger: "change",
            required: true,
            trigger: "blur",
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
            trigger: "blur",
            message: "请选择责任人"
          }
        ]
        //--------------------------------分隔符------------------------------------
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
  },
  methods: {
    /*------提交事件------*/
    onSubmit() {
      this.rules.project_execute_dept_name[0].required = true;
      this.showMessage = true;
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
          obj.serviceRoot = "prodsm/WorkLetter/work_letter_submit";
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
                    name: this.formData.letter_name,
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
              let result_data = JSON.parse(res.resultData);
              if (result_data.result_list.length > 0) {
                //循环提交待办接口
                for (let i = 0; i < result_data.result_list.length; i++) {
                  let objItem = {};
                  objItem.serviceRoot =
                    "wpdbDS/wxapprovemanger/wxapprovemanger";
                  objItem.params = {
                    data: {
                      row: [result_data.result_list[i]]
                    },
                    head: {
                      msg_code: "wxapprovemanger",
                      msg_id: "wxapprovemanger",
                      request_time: "",
                      source_sys: "wpdbDS",
                      service_class: "wxapprovemanger",
                      target_sys: "MOBILE",
                      user_id: "admin",
                      user_key: "admin"
                    }
                  };
                  this.requestDrmService(objItem, this)
                    .then(r => {
                      if (r.resultCode === "0") {
                        console.log("==submitSuccess==");
                      }
                    })
                    .catch(e => {
                      this.loading = false;
                      this.$message({
                        type: "error",
                        message: "提交失败"
                      });
                      console.log("==submitError==", e);
                    });
                }
              }
              this.$message({
                type: "success",
                message: "提交成功"
              });
              /*---------提交成功后重置----------*/
              this.formData.letter_name = "";
              this.formData.limited_time = "";
              this.checkedList = [];
              this.formData.project_execute_dept_name = "";
              this.formData.imple_depart = "";
              this.formData.letter_contents = [];
              this.showMessage = false;
              this.rules.project_execute_dept_name[0].required = false;
              console.log("提交成功：----", res);
            })
            .catch(err => {
              this.loading = false;
              this.$message({
                type: "error",
                message: "提交失败"
              });
              console.log(err);
            });
        }
      });
    },

    /*------保存事件-----*/
    onSave() {
      this.rules.project_execute_dept_name[0].required = true;
      this.showMessage = true;
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
          obj.serviceRoot = "prodsm/WorkLetter/work_letter_save";
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
              this.$message({
                type: "success",
                message: "保存成功"
              });
              /*---------保存成功后重置----------*/
              this.formData.letter_name = "";
              this.formData.limited_time = "";
              this.checkedList = [];
              this.formData.project_execute_dept_name = "";
              this.formData.imple_depart = "";
              this.formData.letter_contents = [];
              this.showMessage = false;
              this.rules.project_execute_dept_name[0].required = false;
              console.log("保存成功：----", res);
            })
            .catch(err => {
              this.loading = false;
              this.$message({
                type: "error",
                message: "保存失败"
              });
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

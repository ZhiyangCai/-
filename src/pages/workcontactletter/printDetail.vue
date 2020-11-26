<!-- 设计报告确认单 edit by xyy -->

<template>
  <div
    id="project_print"
    ref="projectPrintRef"
    style="-webkit-text-size-adjust: 100%!important;background:white"
  >
    <div ref="printContentRef" id="printContent" v-loading="loading">
      <div class="print_component">
        <div class="project_form">
          <div class="project_title">工作联系函</div>
          <!-- height:100%; -->
          <div style="background:white;margin-top:10px;padding:0px 40px;">
            <!-- label-width="150px" -->
            <el-form
              ref="formRef_"
              size="small"
              :show-message="showMessage"
              label-position="left"
              lable-width="150px"
            >
              <!-- 任务名称 -->
              <el-row>
                <ell-col v-if="deptName.trim() !== ''" :span="24">
                  <el-form-item style="margin:0px" label-width="0px">
                    {{ deptName }}
                  </el-form-item>
                </ell-col>
                <el-col :span="24">
                  <el-form-item
                    style="margin:0px;"
                    label="任务名称"
                    prop="project_name"
                    label-width="100px"
                  >
                    {{ letter_name }}
                  </el-form-item>
                </el-col>
              </el-row>
              <div
                class="work_item"
                v-for="item in workDataList"
                :key="'work_item_' + item.send_time"
              >
                <el-divider
                  >任务发送时间
                  {{
                    item.send_time
                      ? moment(item.send_time).format("YYYY-MM-DD")
                      : ""
                  }}</el-divider
                >
                <!-- 限定完成时间 -->
                <!-- <el-row>
                  <el-col :span="12">
                    <el-form-item label="限定完成时间">
                      <el-date-picker
                        :disabled="isReadonly"
                        v-model="item.limited_time"
                        type="date"
                        placeholder="请选择签字日期"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      v-if="isReadonly"
                      class="personCenter"
                      style="padding-right:0px"
                      label-width="100px"
                      label="责任人"
                      prop="project_execute_dept_name"
                    >
                      <div class="sign_div">
                        <span v-for="(dept_name, i) in item.iprincipal_list">
                          <span>
                            <span
                              >{{ dept_name.pname }}
                            </span>
                            <span v-if="i !== item.iprincipal_list.length - 1"
                              >；</span
                            >
                          </span>
                        </span>
                      </div>
                    </el-form-item>

                    <el-form-item
                      v-else
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
                          handleAddUsers(
                            'project_execute_dept_name',
                            '责任人',
                            false
                          )
                        "
                      ></i>
                    </el-form-item>
                  </el-col>
                </el-row> -->
                <!-- 责任单位 -->
                <!-- <el-row>
                  <el-col :span="12">
                    <el-form-item label="责任单位（部门）" prop="contract_code">
                      <el-input
                        :disabled="isReadonly"
                        v-model="item.iprincipal_list[0].imple_depart"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row> -->
                <!-- 待实施工作内容（只读部分） start-->

                <table border="1" class="tabledata">
                  <thead>
                    <th style="width:50px">序号</th>
                    <th>待实施工作项内容</th>
                  </thead>
                  <tbody>
                    <tr v-for="(obj, i) in item.content_list" :key="i">
                      <td>{{ i + 1 }}</td>
                      <td>
                        <el-input
                          :disabled="isReadonly"
                          v-model="obj.letter_content"
                          placeholder=""
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- <el-table
                  border
                  ref="multipleTable"
                  :data="item.content_list"
                  tooltip-effect="dark"
                  style="width: 100%"
                >
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
                    prop="letter_content"
                    label="待实施工作项内容"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input
                        :disabled="isReadonly"
                        v-model="scope.row.letter_content"
                        placeholder=""
                      />
                    </template>
                  </el-table-column>
                </el-table> -->
                <!-- 待实施工作内容（只读部分） end-->
                <!-- 实施情况描述start -->

                <table style="margin-top:10px" border="1" class="tabledata">
                  <thead>
                    <th style="width:50px">序号</th>
                    <th>实施情况描述</th>
                    <th>责任人</th>
                    <th>完成时间</th>
                  </thead>
                  <tbody>
                    <tr v-for="(obj, i) in item.iprincipal_list" :key="i">
                      <td>{{ i + 1 }}</td>
                      <td>
                        {{ obj.work_describe }}
                      </td>
                      <td>{{ obj.pname }}</td>
                      <td>
                        {{
                          obj.finish_time
                            ? moment(obj.finish_time).format("YYYY-MM-DD")
                            : ""
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- <el-table
                  :data="item.iprincipal_list"
                  border
                  style="width: 100%;margin-top:20px;"
                >
                  <el-table-column
                    align="center"
                    header-align="center"
                    prop="work_describe"
                    label="实施情况描述"
                    min-width="300"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    header-align="center"
                    prop="pname"
                    label="责任人"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    header-align="center"
                    prop="finish_time"
                    label="完成时间"
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    header-align="center"
                    label="附件"
                  >
                    <template slot-scope="scope">
                      <a
                        v-for="(fileitem, i) in scope.row.file_list"
                        target="_blank"
                        :href="fileitem.emc_url"
                        :download="fileitem.file_name"
                        >{{ fileitem.file_name }}&nbsp;&nbsp;</a
                      >
                    </template>
                  </el-table-column>
                </el-table> -->
                <!-- 实施情况描述end -->
              </div>
              <p style="text-align:right">{{ group_name }}</p>
              <p style="text-align:right">
                {{ moment(new Date()).format("YYYY年MM月DD日") }}
              </p>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <div class="print_btn print_hide">
      <!-- size="mini" -->
      <el-button
        id="printButton"
        @click="handlePrint"
        type="primary"
        size="medium"
        >打印</el-button
      >
    </div>
  </div>
</template>

<style scoped media="print">
.tabledata {
  width: 100%;
  border: 1px solid #e4e7ed;
  border-collapse: collapse;
  text-align: center;
}
.tabledata th {
  white-space: nowrap;
}
.tabledata th,
.tabledata td {
  height: 45px;
  padding: 5px;
  word-wrap: break-word;
  word-break: normal;
  border: 1px solid #e4e7ed;
}
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
  margin: 0px auto;
  height: 100%;
  overflow: auto;
}

#project_print .print_btn {
  border-top: 2px solid #e4e7ed;
  /* text-align: center; */
  /* padding-top: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 6px;
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

<script>
// import dept_user_index from "../project_dept_user/dept_user_index"; //人员选择
// import QRCode from "qrcodejs2";

export default {
  name: "printDetail",
  //props: ["projectId", "projectType", "billCode"],
  //props: ["letter_id"],
  // components: {
  //   dept_user_index
  // },
  data() {
    return {
      printObj: {
        id: "printContent",
        popTitle: "工作联系函(" + this.letter_name + ")"
        // extraCss: "https://www.google.com,https://www.google.com",
        //extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      group_name: "",
      loading: false, // 加载状态
      deptName: "", //部门名称
      nowDate: "", //当前时间
      workDataList: [], //数据列表
      letter_id: "", //任务ID
      letter_name: "", //任务名称
      userCode: "",
      multipleSelection: [],

      /** 校验信息 */
      showMessage: false,

      projectTitle: "", //表单抬头
      isReadonly: true //是否禁用
    };
  },
  watch: {},
  mounted() {
    // document.getElementById("printButton").addEventListener(
    //   "load",
    //   function() {
    //     alert("printButton load");
    //   },
    //   false
    // );
    /*路由入参*/
    this.letter_id = this.$route.query.letter_id;
    // this.userCode = this.$route.query.userCode;
    this.userCode = this.GLOBAL.userCode;

    this.getProjectListData();
    this.getUserDeptName(this.userCode);
  },
  methods: {
    //获取人员部门
    getUserDeptName(_usercode) {
      this.loading = true;
      let obj = {};
      //obj.serviceRoot = "project/findUserByText";
      obj.serviceRoot = "prodsm/WorkLetter/WorkLetterFindUserByText";
      obj.params = {
        // id: this.dept_id,
        // text: this.searchInput.trim()
        data: {
          row: [
            {
              //id: this.dept_id,
              text: _usercode
            }
          ]
        },
        head: {
          msg_code: "WorkLetterFindUserByText",
          msg_id: "WorkLetterFindUserByText",
          request_time: "",
          source_sys: "prodsm",
          service_class: "WorkLetter",
          target_sys: "MOBILE",
          user_id: "admin",
          user_key: "admin"
        }
      };
      this.tableData1 = [];
      this.requestDrmService(obj, this)
        .then(res => {
          this.loading = false;
          if (res.resultCode === "0") {
            console.log("====deptData====", res.resultData);
            let result_data = JSON.parse(res.resultData);
            if (result_data.users.length > 0) {
              this.deptName = result_data.users[0].deptName;
            }
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    //打印
    handlePrint() {
      console.log("====print====");
      // let dom = document
      //   .querySelector(".print_component")
      //   .getElementsByClassName("project_title");
      // let domTitle = dom[0].innerHTML;
      // let appendTitle = "（" + this.letter_name + "）";
      // this.getPdf("printContent", domTitle + appendTitle);
      /*---------------------------分隔符---------------------------*/
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        //是否ie
        this.remove_ie_header_and_footer();
      }
      let dom = document.querySelector(".print_component");
      this.$print(dom);
      console.log("====print end====");
    },
    remove_ie_header_and_footer() {
      let hkey_path;
      hkey_path =
        "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
      try {
        //alert("ie-try");
        let RegWsh = new ActiveXObject("WScript.Shell");
        RegWsh.RegWrite(hkey_path + "header", "");
        RegWsh.RegWrite(hkey_path + "footer", "");
      } catch (e) {
        //alert("ie-catch" + JSON.stringify(e));
      }
    },
    /** 项目基本信息-获取项目列表 */
    getProjectListData() {
      this.loading = true;
      let obj = {};
      obj.params = {
        data: {
          row: [
            {
              letter_id: this.letter_id,
              loggedUser: {
                path: "1/S00000000000003/S00000000012424",
                weight: "1",
                id: this.userCode
              }
            }
          ]
        },
        head: {
          msg_code: "work_letter_detail",
          msg_id: "work_letter_detail",
          request_time: "",
          source_sys: "prodsm",
          service_class: "WorkLetter",
          target_sys: "MOBILE",
          user_id: "admin",
          user_key: "admin"
        }
      };
      obj.serviceRoot = "prodsm/WorkLetter/work_letter_detail";
      this.requestDrmService(obj, this)
        .then(res => {
          this.loading = false;
          if (res.resultCode === "0") {
            //let result_data = JSON.parse(res.resultData).map;
            let result_data = JSON.parse(res.resultData);
            this.group_name = result_data.group_name;
            this.workDataList = result_data.rows;
            console.log("----result_data----:" + JSON.stringify(result_data));
            //工作联系函实施表id
            // this.letter_implement_id = result_data.rows[0].letter_implement_id;
            this.letter_name = result_data.letter_name;
            //this.letter_status = result_data.letter_status;
          }
        })
        .catch(err => {
          this.loading = false;
          console.log("服务异常", err);
        });
    }

    // /** 删除选择人员 */
    // handleUserDelete(prop) {
    //   this.formData[prop] = "";
    //   this.formData[prop + "_ids"] = [];
    // },
    // /** 选择人员弹框 */
    // handleAddUsers(prop, name, checkItem = true) {
    //   this.checkedList = this.formData[prop + "_ids"];
    //   this.selectItem.name = name;
    //   this.selectItem.prop = prop;
    //   this.dialogTitle = name + "人员选择";

    //   this.isCheckBtn = checkItem;
    //   this.dialogVisible = true;
    // },
    // /** 选择人员确认 */
    // cascadeSubmit(checkList, isCheck) {
    //   this.dialogVisible = false;
    //   let checkStr = "";
    //   let arrList = [];
    //   let typeList = {
    //     project_execute_dept_name: "3",
    //     biz_comp_dept_name: "1",
    //     biz_about_dept_name: "2",
    //     provider_name: "4"
    //   };

    //   if (checkList.length === 0) {
    //     this.formData[this.selectItem.prop] = checkStr;
    //     this.formData[this.selectItem.prop + "_ids"] = arrList;
    //     return;
    //   }
    //   checkList.map((el, i) => {
    //     checkStr += el.deptName + "/" + el.name + "；";
    //     arrList.push({
    //       user_id: el.userId,
    //       user_name: el.name,
    //       dept_id: el.parentId || "",
    //       dept_name: el.deptName || "",
    //       dept_type: typeList[this.selectItem.prop]
    //     });
    //   });

    //   checkStr = checkStr.substr(0, checkStr.length - 1);
    //   this.formData[this.selectItem.prop] = checkStr;
    //   this.formData[this.selectItem.prop + "_ids"] = arrList;
    // },
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
  /* color: #409eff; */
}
</style>

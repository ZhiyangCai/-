<!-- 设计报告确认单 edit by xyy -->
<template>
<!-- style="background:#e4e7ed" -->
  <div id="designer_report_confirm" style="background:#e4e7ed">
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
                <el-input
                  :disabled="isReadonly"
                  v-model="formData.letter_name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="限定完成时间" prop="limited_time">
                <!-- value-format="yyyy-MM-dd" -->
                <el-date-picker
                  :disabled="isReadonly"
                  v-model="formData.limited_time"
                  type="date"
                  placeholder="请选择签字日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="personCenter"
                style="padding-right:0px"
                label-width="100px"
                label="责任人"
                prop="project_execute_dept_name"
              >
                <div style="position: relative;">
                  <el-input
                    v-model="formData.project_execute_dept_name"
                    placeholder="请选择责任人"
                    :disabled="isReadonly"
                    readonly
                  ></el-input>
                  <span
                    v-if="
                      formData.project_execute_dept_name != '' && !isReadonly
                    "
                    class="clear_input_item"
                    @click="handleUserDelete('project_execute_dept_name')"
                  >
                    <span class="el-icon-circle-close"></span>
                  </span>
                </div>
              </el-form-item>

            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="责任单位（部门）" prop="imple_depart">
                <el-input
                  :disabled="isReadonly"
                  v-model="formData.imple_depart"
                ></el-input>
              </el-form-item>
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
                :disabled="isReadonly"
              
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
                  <!-- <template slot-scope="scope" >            
                <el-input
                  contenteditable="true"
                  placeholder=""/>     
              </template> -->
                  <template slot-scope="scope">
                    <!-- <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p> -->

                    <el-input
                      :disabled="isReadonly"
                      prop=""
                      v-model="scope.row.letter_content"
                      placeholder=""
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>

            <!-- 描述与附件 -->
            <div style="margin-top:20px;">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="实际情况描述" prop="work_describe">
                    <!-- :autosize="{ minRows: 4 }" -->
                    <el-input
                      v-model="formData.work_describe"
                      type="textarea"
                      rows="4"
                      :disabled="!isReadonly"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="完成时间" prop="finish_time">
                    <el-date-picker
                      :disabled="!isReadonly"
                      v-model="formData.finish_time"
                      type="date"
                      placeholder="请选择签字日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="设计报告：" prop="file_list">
                    <!-- :show-file-list="true" -->
                    <!-- action="uploadUrl" -->
                      <!-- :before-upload="beforeAvatarUpload"
                       :on-error="handleAvatarError" -->
                        <!-- :file-list="formData.file_list" -->
                    <el-upload
                      ref="upload_attach2"
                      :disabled="!isReadonly"
                      :file-list="formData.file_list"
                      class="upload-demo"
                      :action="uploadUrl"
                      :auto-upload="!isAutoupload"
                      :show-file-list="false"
                      multiple
                      :on-change="handleChangeFile"
                      :on-error="handleAvatarError" 
                    >
                      <div slot="trigger">
                       <!-- size="small" -->
                        <el-button
                          size="medium"
                          :disabled="!isReadonly"
                          type="primary"
                          style="width: 200px;"
                          >上传附件</el-button
                        >
                      </div>

                      <div class="file_list">
                         <el-row
                          class="file_list_row"
                          v-for="(file, i) in formData.file_list"
                          :key="'file_' + i"
                        >
                          <el-col class="file_list_name">
                            <span class="el-icon-document"></span>
                            <a :href="file.emc_url">{{ file.file_name}}</a>
                          </el-col>
                          <el-col  v-if="isReadonly" class="file_list_delete">
                            <el-button
                              type="text"
                              size="mini"
                              @click="
                                handleDeleteFile(file.id,
                                  file.file_name,
                                  'attach')"
                            >
                              <span class="el-icon-close"></span>
                            </el-button>
                          </el-col>
                         </el-row>
                        <!-- <el-row
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
                        </el-row> -->
                      </div>
                  
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
          
          
            </div>
            <!-- 底部按钮 -->
            <el-row style="height:40px">
              <el-col :span="24">
                <div style="text-align:center;height:40px">
                  <el-button
                    type="primary"
                    v-loading.fullscreen.lock="this.loading"
                    @click='onSave("save")'>保存</el-button>
                  <el-button @click='onSave("submit")' type="warning">提交</el-button>
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
  name: "personliableConfirm",
  //props: ["projectId", "projectType", "billCode"],
  components: {
    dept_user_index
  },
  data() {
    return {

      work_describe:"",//实际情况描述
      finish_time:"",//完成时间
      isAutoupload:true,//是否自动上传
      uploadImages:[],
      fileUploading: null, //文件上传 $loading

      /*路由传参*/
      letter_id: "",
      letter_implement_id: "",
      letter_principal_id: "",
      // letter_id:"e437729804294ecea15d0b73073ea007",
      // letter_implement_id:"0808f6488b094f8884e7d534ad4b5fde",
      // letter_principal_id:"9c0267303523415abb174c7f136765a1",
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

      projectTitle: "", //表单抬头
      isReadonly: true, 
      //uploadUrl: "transfer/api/dsm/file/upload", //上传url
      //uploadUrl: "https://weixin.hbtobacco.cn/financeTransport/wechat/file/upload", //上传url
      uploadUrl: "/financeTransport/wechat/file/upload", //上传url

      /** 表单参数 */
      formData: {
        /*工作联系函基本信息*/
        letter_name: "", //工作联系函任务名称
        letter_contents: [], //工作事项
        limited_time: "", //限定完成时间
        imple_uses: [], //责任人
        imple_depart: "", //责任部门
        file_list:[],//附件列表

        /** 确认人信息 */
        project_execute_dept_name: "", //项目执行部门/负责人
        project_execute_dept_name_ids: [], //项目执行部门/负责人数组
      },
      /** 表单校验 */
      rules: {
         file_list:[
           {
            type: "array",
            required: true,
            message: "请上传附件",
            trigger: "blur"
          }
        ],
         work_describe: [
          {
            required: true,
            message: "请填写实际情况描述",
            trigger: "blur"
          }
        ],
         finish_time: [
          {
            //type: "date",
            // trigger: "change",
            trigger: "blur",
            required: true,
            message: "请选择完成时间"
          }
        ],
        letter_name: [
          {
            required: false,
            message: "请填写任务名称",
            trigger: "blur"
          }
        ],
       
        letter_contents: [
          {
            type: "array",
            required: false,
            message: "请填写工作事项",
            trigger: "blur"
          }
        ],
        limited_time: [
          {
            //type: "date",
            // trigger: "change",
            trigger: "blur",
            required: false,
            message: "请选择限定完成时间"
          }
        ],
        imple_depart: [
          {
            required: false,
            trigger: "blur",

            message: "请填写责任单位（部门）"
          }
        ],
        project_execute_dept_name: [
          {
            required: false,
            message: "请选择责任人"
          }
        ]
        //--------------------------------分隔符------------------------------------
      }
    };
  },
  watch: {
  },
  mounted() {
    /*路由传参(还需要userCode)*/
    this.letter_id = this.$route.query.letter_id;
    this.letter_implement_id = this.$route.query.letter_implement_id;
    this.letter_principal_id = this.$route.query.letter_principal_id;

    this.projectTitle = "黄鹤楼科技园工程中心"; //this.$parent.$parent.$parent.projectTitle;

    this.getFormData();
   
  },
  methods: {

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
    handleUploadSuccess(err, file, fileList) {
      this.fileUploading.close();
      this.$message({
        type: "success",
        message: "上传成功！"
      });
    },
    /**上传失败的提示**/
      handleUploadError(err, file, fileList) {
      this.fileUploading.close();
      this.$message({
        type: "error",
        message: "上传失败！"
      });
    },
   
    /**（保存/提交）事件**/
    onSave(_type) {

      this.showMessage=true;
      this.$refs.formRef.validate(valid => {
        if (valid) {
          /*------执行操作(关联附件部分)------*/
          var fileList=[];
          for(var i=0;i<this.formData.file_list.length;i++)
          {
              var item={
                FILE_NAME:this.formData.file_list[i].file_name,
                EMC_URL:this.formData.file_list[i].emc_url
              }
              fileList.push(item);
          }
          let obj = {};
          obj.serviceRoot = "prodsm/WxbusinessAttachment/WxbusinessAttachment";
          obj.params = {
                "data":{
                    "row":[
                        {
                            "MEDIA_LIST":fileList,
                            "CREATOR":this.GLOBAL.userCode,
                            "BUSINESSID":this.letter_principal_id
                        }
                    ]
                },
                "head":{
                    "msg_code":"",
                    "msg_id":"WxbusinessAttachment",
                    "request_time":"",
                    "service_class":"WxbusinessAttachment",
                    "source_sys":"prodsm",
                    "target_sys":"MOBILE",
                    "user_id":"admin",
                    "user_key":"admin"
                }
          };
          this.loading = true;
          this.requestDrmService(obj, this)
            .then(res => {
              this.loading = false;
                if (res.resultCode === "0") {
                 if(_type==="save")
                 {
                   /*--保存方法--*/
                   this.saveDetail();
                 }
                 else{
                   /*--提交方法--*/
                   this.submitDetail();
                 }
                  console.log("上传文件成功：----", res);
                }
                else {
                    this.$message({
                      message: "保存失败",
                      type: "error"
                  });
                }
             
            })
            .catch(err => {
              this.loading = false;
              this.$message({
                message: "保存失败",
                type: "error"
              });
              console.log(err);
            });
        }
      });
    },
    /*提交明细操作*/ 
    submitDetail(){
        var date = this.moment(this.formData.finish_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.formData.finish_time = date;
          let obj = {};
          obj.serviceRoot = "prodsm/WorkLetter/work_letter_iprincipal_submit";
          obj.params = {
                 "data": {
                        "row" :[{
                            "letter_id": this.letter_id,
                            "letter_principal_id": this.letter_principal_id,
                            "work_describe": this.formData.work_describe,
                            "finish_time": this.formData.finish_time
                         }]
                      },
                      "head": {
                        "msg_code": "work_letter_iprincipal_submit",
                        "msg_id": "work_letter_iprincipal_submit",
                        "request_time": "",
                        "source_sys": "prodsm",
                        "service_class": "WorkLetter",
                        "target_sys": "MOBILE",
                        "user_id": "admin",
                        "user_key": "admin"
                      }
                 
                }
          console.log("提交明细部分:----"+JSON.stringify(obj.params));
          this.loading = true;
          this.requestDrmService(obj, this)
            .then(res => {
              this.loading = false;
                 if (res.resultCode === "0") {
              let result_data = JSON.parse(res.resultData);

               //提交待办接口
                  let objItem = {};
                  objItem.serviceRoot =
                    "wpdbDS/wxapprovemanger/wxapprovemanger";
                  objItem.params = {
                    data: {
                      row: [result_data.data]
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
                      return;
                      console.log("==submitError==", e);
                    });

                 this.$message({
                      message: "提交成功",
                      type: "success"
                  });
                   //页面关闭或回退
                  //this.$router.go(-1);
                  window.location.href="about:blank";
                  window.close();
                }
                else {
                    this.$message({
                      message: "提交失败",
                      type: "error"
                  });
                }
            })
            .catch(err => {
              this.loading = false;
              this.$message({
                message: "提交失败",
                type: "error"
              });
              console.log("请求提交error后返回：------",err);
            });

    },
    /*保存明细操作*/ 
    saveDetail(){
          var date = this.moment(this.formData.finish_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.formData.finish_time = date;
          let obj = {};
          obj.serviceRoot = "prodsm/WorkLetter/work_letter_iprincipal_save";
          obj.params = {
                  "data": {
                    "row" :[{
                        "letter_principal_id": this.letter_principal_id,
                        "work_describe": this.formData.work_describe,
                        "finish_time": this.formData.finish_time
                       }]
                  },
                  "head": {
                    "msg_code": "work_letter_iprincipal_save",
                    "msg_id": "work_letter_iprincipal_save",
                    "request_time": "",
                    "source_sys": "prodsm",
                    "service_class": "WorkLetter",
                    "target_sys": "MOBILE",
                    "user_id": "admin",
                    "user_key": "admin"
                  }
                }
          console.log("保存明细部分:----"+JSON.stringify(obj.params));
          this.loading = true;
          this.requestDrmService(obj, this)
            .then(res => {
              console.log("请求保存success后返回：------",res);
              this.loading = false;
                 if (res.resultCode === "0") {
                 this.$message({
                      message: "保存成功",
                      type: "success"
                  });
                  //页面关闭或回退
                  //this.$router.go(-1);
                  window.location.href="about:blank";
                  window.close();
              
                }
                else {
                    this.$message({
                      message: "保存失败",
                      type: "error"
                  });
                }
            })
            .catch(err => {
              this.loading = false;
              this.$message({
                message: "保存失败",
                type: "error"
              });
              console.log("请求保存error后返回：------",err);
            });
    },

    /** 根据表单id 获取表单信息 */
    getFormData() {
      let obj = {};
      obj.params = {
        data: {
          row: [
            {
              letter_id: this.letter_id,
              letter_implement_id: this.letter_implement_id,
              letter_principal_id: this.letter_principal_id
            }
          ]
        },
        head: {
          msg_code: "work_letter_iprincipal_select",
          msg_id: "work_letter_iprincipal_select",
          request_time: "",
          source_sys: "prodsm",
          service_class: "WorkLetter",
          target_sys: "MOBILE",
          user_id: "admin",
          user_key: "admin"
        }
      };
      obj.serviceRoot = "prodsm/WorkLetter/work_letter_iprincipal_select";
      // obj.serviceRoot = "project/designReportByIdQuery";
      // obj.baseURL = "/itmsdrm";
      console.log("obj.params:--------" + JSON.stringify(obj.params));
      this.loading = true;
      this.requestDrmService(obj, this)
        .then(res => {
            this.loading = false;
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData);
            this.formData.letter_name = result_data.rows[0].letter_name; //任务名称
            this.formData.limited_time = result_data.rows[0].limited_time; //限定完成时间
            this.formData.imple_depart = result_data.rows[0].imple_depart;
            this.formData.project_execute_dept_name = result_data.rows[0].pname;
            this.formData.letter_contents = result_data.rows[0].content_list;
            this.formData.file_list = result_data.rows[0].file_list;
            /**/
          }
        })
        .catch(err => {
          this.loading = false;
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
           this.formData["file_list"].map((el, i) => {
            if (el.file_name === name) {
              this.formData["file_list"].splice(i, 1);
            }
          });
         //this.$parent.$parent.$parent.deleteUploadFile(id, "click");
          // this.formData["file_list_" + prop].map((el, i) => {
          //   if (el.id === id) {
          //     this.formData["file_list_" + prop].splice(i, 1);
          //   }
          // });
        })
        .catch(() => {});
    },

    /** 文件上传 设计评审报告 */
    //上传失败
    handleAvatarError()
    {
        this.$message({
            message: "上传失败",
            type: "error"
          });
    },
    //上传前(暂时不用)
  //  beforeAvatarUpload(file) {
  //       // const isJPG = file.type === 'image/jpeg';
  //       // const isLt2M = file.size / 1024 / 1024 < 2;
  //       // if (!isJPG) {
  //       //   this.$message.error('上传头像图片只能是 JPG 格式!');
  //       // }
  //       // if (!isLt2M) {
  //       //   this.$message.error('上传头像图片大小不能超过 2MB!');
  //       // }
  //       // return isJPG && isLt2M;
  //      var yn="n";
  //      this.$confirm("确定上传吗？", "提示", {
  //       confirmButtonText: "是",
  //       cancelButtonText: "否",
  //       type: "warning"
  //     }).then(() => {
  //      yn="y";
  //     this.isAutoupload=true;
  //     }).catch(() => {
  //       yn="n";
  //       });
  //      if(yn==="y")
  //      {
  //         return true
  //      }
  //      else{
  //         return false
  //      }
       
  //     },
      //上传成功(上传文件操作)
    handleChangeFile(file, fileList) {
      /*----------设置auto-upload为true，成功后的上传（暂时不用）-----------*/
      // console.log("==========file-----------:",file);
      //     var obj = {
      //     id: "",
      //     tranceId: "",
      //     attachName: file.resultData.attachName,
      //     attachUrl: file.resultData.attachUrl,
      //     attachExt: file.resultData.attachExt,
      //     attachSize: file.resultData.attachSize
      //   };
      //   this.uploadImages.push(obj);
      //   var fileobj={
      //     emc_url:file.resultData.attachUrl,
      //     file_name: file.resultData.attachName
      //   }
      //   this.formData.file_list.push(fileobj);
      //   console.log("==this.ssuploadImages",this.uploadImages);
/*--------------------文件状态改变时（无论上传成功还是失败都会被调用）----------------------*/
 this.$confirm("确定上传吗？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      }).then(() => {
        this.handleProgress();
        var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
        formData.append("file", file.raw); //接口需要传的参数
        this.$axios({
        method: "post",
        //服务器上传地址 
        url: "/financeTransport/wechat/file/upload",
        data: formData, //（名字是后台接口参数确定的）
        headers: {
          // 修改请求头
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log("====上传的文件信息====",res.data.resultData);
        this.handleUploadSuccess();
        var fileobj={
            emc_url:res.data.resultData.attachUrl,
            file_name: res.data.resultData.attachName
        }
        this.formData.file_list.push(fileobj);
      this.showMessage=false;

        //alert(JSON.stringify(JSON.parse(res.data.resultData)));
       }).catch((error)=>{
        this.handleUploadError();
        console,log("====error====",error);
        });
      });


     // this.formData.upload_list_attach = [];
      // this.$confirm("确定上传吗？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning"
      // }).then(() => {
    //     this.handleProgress();
    //     var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
    //     formData.append("file", file.file); //接口需要传的参数
    //     console.log("---------files:--------", JSON.parse(JSON.stringify(formData)));
    //     this.$axios({
    //     method: "post",
    //     //服务器上传地址
    //     url: `/financeTransport/wechat/file/upload`,
    //     data: formData, //（名字是后台接口参数确定的）
    //     headers: {
    //       // 修改请求头
    //       "Content-Type": "multipart/form-data"
          
    //     }
    //   }).then(res => {
    //     this.handleUploadError();
    //     var obj = {
    //       id: "",
    //       tranceId: "",
    //       attachName: res.data.resultData.attachName,
    //       attachUrl: res.data.resultData.attachUrl,
    //       attachExt: res.data.resultData.attachExt,
    //       attachSize: res.data.resultData.attachSize
    //     };
    //     this.uploadImages.push(obj);
    //     alert("uploadImages:----"+JSON.stringify(this.uploadImages));
    //     console.log("==this.uploadImages",this.uploadImages);
    //   }).catch(()=>{
    //    alert("error:----"+JSON.stringify(this.uploadImages));
    //     this.handleUploadError();
    //  })
    //     /*-----------分隔符-----------*/
    //       // fileList.map((el, i) => {
    //       //   if (el.status === "ready") {
    //       //     this.formData.upload_list_attach.push(el);
    //       //   }
    //       // });
    //       // this.handleSaveFile({
    //       //   uploadType: "doc01",
    //       //   prop: "attach2"
    //       // });
    //       this.$refs.upload_attach2.clearFiles();
    //     })
    //     .catch(() => {
    //     this.handleUploadError();
    //       this.$refs.upload_attach2.clearFiles();
    //     });
    },
  
    /** 文件上传接口 */
//     handleSaveFile(params) {
      
//       this.$refs.formRef.clearValidate();
//       let formData = new FormData();
//       this.formData.upload_list_attach.map(file => {
//         if (file.status === "ready") {
//           formData.append("FILE_CONTENTS", file.raw);
//         }
//       });
//       let obj = {};

//      // this.$parent.$parent.$parent.handleProgress();
//       this.handleProgress();

//       formData.append("bizId", this.projectId);
//       formData.append("uploadType", params.uploadType);
//       obj.headerType = "application/x-www-form-urlencoded";
//       obj.serviceRoot = "transfer/business/file/upload";
//       //obj.serviceRoot = "wxdsm/services/admin/prodsm/WxbusinessAttachment/WxbusinessAttachment";
// //
//       //obj.baseURL = "itmsdrm/";
//       this.uploadFile(obj, formData, this)
//         .then(res => {
//           this.handleUploadSuccess(res, params);
//         })
//         .catch(err => {
//           //this.$parent.$parent.$parent.handleUploadError();
//           this.handleUploadError();
//           console.log(err);
//         });
//     },
    /** 文件上传成功后赋值 */
    // handleUploadSuccess(response, file_data) {
    //   let message = response.resultMessage;
    //   let type = "";
    //   //this.$parent.$parent.$parent.fileUploading.close();
    //   this.fileUploading.close();
    //   if (response.resultCode === "0") {
    //     let result_data = response.resultData;
    //     result_data.map((el, idx) => {
    //       this.formData["file_list_" + file_data.prop].push({
    //         id: el.id,
    //         url: el.url,
    //         bizId: el.bizId,
    //         upload_type: el.uploadType,
    //         file_name: el.fileName,
    //         file_size: el.fileSize,
    //         prop: file_data.prop
    //       });
    //     });
    //     type = "success";
    //   } else {
    //     type = "error";
    //   }
    //   this.$message({
    //     type: type,
    //     message: message
    //   });
    // },
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
  background: #e4e7ed;

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

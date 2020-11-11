<!-- 验收申请报告 edit by xyy -->
<template>
  <div id="acceptance_application_report">
    <div class="project_form">
      <div class="project_title">{{projectTitle}}验收申请单</div>
      <div>
        <el-form :model="formData" :rules="rules" ref="formRef" size="small" :show-message="showMessage" label-position="right"
          label-width="160px">
          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="12">
                <div class="head">项目基本信息：</div>
              </el-col>
              <el-col :span="12" class="head_right">{{projectCode}}</el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="16">
              <el-form-item label="项目名称：" prop="project_name">
                <el-input v-if="isReadonly" v-model="formData.project_name" :disabled="isReadonly"></el-input>
                <el-select v-else v-model="formData.project_id" filterable placeholder="请选择项目名称" @change="handleSelectProject"
                  style="width: 100%;" :disabled="isReadonly">
                  <el-option v-for="(item,i) in projectOptions" :key="item.project_id+i" :label="item.project_name"
                    :value="item.project_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目编号：" prop="project_code">
                <el-input v-if="isReadonly" v-model="formData.project_code" :disabled="isReadonly"></el-input>
                <el-select v-else v-model="formData.project_id1" filterable placeholder="请选择项目编号" @change="handleSelectProject"
                  style="width: 100%;" :disabled="isReadonly">
                  <el-option v-for="(item,i) in projectOptions" :key="item.project_id+i" :label="item.project_code"
                    :value="item.project_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="合同名称：" prop="contract_id">
                <el-select v-model="formData.contract_id" filterable placeholder="请选择合同名称" style="width: 100%;"
                  :disabled="isReadonly" @change="handleSelectContract">
                  <el-option v-for="(item,i) in contractList" :key="item.id+i" :label="item.contract_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号：" prop="contract_code">
                <el-input v-model="formData.contract_code" :disabled="isReadonly" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="实施单位：" prop="supplier">
                <el-input v-model="formData.supplier" clearable placeholder="请输入实施单位" :disabled="isReadonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="验收类别：" prop="accept_type">
                <el-select v-model="formData.accept_type" filterable placeholder="请选择验收类别" style="width: 100%;"
                  :disabled="isReadonly" @change="handleAcceptChange">
                  <el-option v-for="item in acceptList" :key="item.id" :label="item.value" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="实施单位项目经理：" prop="project_manager">
                <el-row>
                  <el-col :style="{'width':(isReadonly?'100%':'calc(100% - 30px)')}">
                    <div style="position: relative;">
                      <el-input v-model="formData.project_manager" :disabled="isReadonly" readonly placeholder="请选择项目经理"></el-input>
                      <span v-if="formData.project_manager!=''&&!isReadonly" class="clear_input_item" @click="handleUserDelete('project_manager')">
                        <span class="el-icon-circle-close"></span>
                      </span>
                    </div>

                  </el-col>
                  <el-col v-if="!isReadonly" style="width: 30px;text-align: right;">
                    <i class="el-icon-circle-plus add_user_img" @click="handleAddUsers('project_manager','项目经理',false)"></i>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签字日期：">
                <el-date-picker v-model="formData.sign_date" type="date" placeholder="请选择签字日期" :disabled="isReadonly"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item prop="start_time" class="start_time">
                <label slot="label" style="line-height: 16px;">
                  <div>项目起始时间：</div>
                  <div class="warning_item" style="padding-right: 14px;">即合同签订时间</div>
                </label>
                <el-date-picker v-model="formData.start_time" type="date" placeholder="请选择项目起始时间" :disabled="isReadonly"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="验收申请时间：" prop="acceptance_time">
                <el-date-picker v-model="formData.acceptance_time" type="date" placeholder="请选择验收申请时间" :disabled="isReadonly"></el-date-picker>
              </el-form-item>
            </el-col>

          </el-row>

          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="24">
                <div class="head">确认人信息：</div>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :style="{width: isReadonly?'100%':'calc(100% - 40px)'}">
              <el-form-item label="项目业务经办人：" label-width="250px">
                <div v-if="isReadonly&projectType==='read'" class="sign_div">
                  <span v-for="(dept_name,i) in formData.biz_user_name_ids">
                    <span>
                      <span>{{dept_name.dept_name}}/{{dept_name.user_name}}</span>
                      <span v-if="dept_name.sign==='Y'" class="el-icon-check sign_item"></span>
                      <span v-if="i!==formData.biz_user_name_ids.length-1">；</span>
                    </span>
                  </span>
                </div>
                <div v-else style="position: relative;">
                  <el-input v-model="formData.biz_user_name" :disabled="isReadonly" readonly placeholder="请选择项目业务经办人"></el-input>
                  <span v-if="formData.biz_user_name!=''&&!isReadonly" class="clear_input_item" @click="handleUserDelete('biz_user_name')">
                    <span class="el-icon-circle-close"></span>
                  </span>
                </div>

              </el-form-item>
            </el-col>
            <el-col v-if="!isReadonly" style="width:40px;padding-left: 10px;line-height: 32px;">
              <i class="el-icon-circle-plus add_user_img" @click="handleAddUsers('biz_user_name','项目业务经办',true)"></i>
            </el-col>

            <el-col :style="{width: isReadonly?'100%':'calc(100% - 40px)'}">
              <el-form-item label="项目信息经办人：" prop="msg_user_name" label-width="250px">
                <div v-if="isReadonly&projectType==='read'" class="sign_div">
                  <span v-for="(dept_name,i) in formData.msg_user_name_ids">
                    <span>{{dept_name.dept_name}}/{{dept_name.user_name}}</span>
                    <span v-if="dept_name.sign==='Y'" class="el-icon-check sign_item"></span>
                    <span v-if="i!==formData.msg_user_name_ids.length-1">；</span>
                  </span>
                </div>
                <div v-else style="position: relative;">
                  <el-input v-model="formData.msg_user_name" :disabled="isReadonly" readonly placeholder="请选择项目信息经办人"></el-input>
                  <span v-if="formData.msg_user_name!=''&&!isReadonly" class="clear_input_item" @click="handleUserDelete('msg_user_name')">
                    <span class="el-icon-circle-close"></span>
                  </span>
                </div>

              </el-form-item>
            </el-col>
            <el-col v-if="!isReadonly" style="width: 40px;padding-left: 10px;line-height: 32px;">
              <i class="el-icon-circle-plus add_user_img" @click="handleAddUsers('msg_user_name','项目信息经办人',false)"></i>
            </el-col>

          </el-row>

          <el-row v-if="isReadonly&&projectType==='read'">
            <el-col :span="24" v-for="(item,i) in itemList" :key="item.code+i">
              <el-form-item :label="item.text+'：'" label-width="250px" required>
                <div class="sign_div">
                  <span v-for="(user,ii) in item.user_list">
                    <span>
                      <span>{{user.dept_name}}/{{user.user_name}}</span>
                      <span v-if="user.sign==='Y'" class="el-icon-check sign_item"></span>
                      <span v-if="ii!=item.user_list.length-1">；</span>
                    </span>
                  </span>
                </div>
              </el-form-item>
              <el-form-item :label="item.text+'意见：'" label-width="250px">
                <div class="sign_suggest_div">
                  <div v-for="(user,ii) in item.user_list">
                    <div class="sign_suggest_msg" v-if="user.sign==='Y'" v-show="user.content!==''">
                      <span>{{user.user_name}}：</span>
                      <span>{{user.content}}</span>
                      <span class="sign_date_padding">签字日期：{{user.sign_date|filterDateFormat('.')}}</span>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="24">
                <div class="head" style="width:200px;">主要实施内容及完成情况：</div>
              </el-col>
            </el-row>
          </div>

          <el-row>
            <el-col :span="24">
              <el-form-item class="form_line_height_item" label="主要实施内容与完成情况：" prop="acceptance_desc">
                <el-input v-model="formData.acceptance_desc" type="textarea" rows="8" clearable :disabled="isReadonly"
                  placeholder="请输入主要实施内容与完成情况" maxlength="450" show-word-limit :autosize="{ minRows: 8 }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="24">
                <div class="head">附件：</div>
              </el-col>
            </el-row>
          </div>

          <el-row>
            <el-col :span="16">
              <el-form-item label="验收文档：">
                <div v-if="isReadonly&&projectType==='read'">
                  <span class="attach_no_data" v-if="formData.file_list_attach.length===0">暂无</span>
                  <div v-else>
                    <div class="download_file_name" v-for="(item,i) in formData.file_list_attach" :key="'attach_'+i">
                      <span class="el-icon-document"></span>
                      <a :href="item.url">{{item.name}}</a>
                    </div>
                  </div>
                </div>
                <el-upload v-else ref="upload_attach" :disabled="isReadonly" class="upload-demo" :action="uploadUrl"
                  :auto-upload="false" :show-file-list="false" :name="'FILE_CONTENTS'" multiple :data="{bizId:projectId,uploadType:'doc04',prop:'attach'}"
                  :on-change="handleChangeFile">
                  <div slot="trigger">
                    <el-button size="small" :disabled="isReadonly" type="primary" style="width: 200px;">选取文件</el-button>
                    <!--<el-button size="small" :disabled="isReadonly" type="primary" style="width: 100px;">上传</el-button>-->
                  </div>

                  <div class="file_list">
                    <el-row class="file_list_row" v-for="(file,i) in formData.file_list_attach" :key="'file_'+i">
                      <el-col class="file_list_name">
                        <span class="el-icon-document"></span>
                        <a :href="file.url">{{file.file_name}}</a>
                      </el-col>
                      <el-col v-if="!isReadonly" class="file_list_delete">
                        <el-button type="text" size="mini" @click="handleDeleteFile(file.id,file.file_name,'attach')">
                          <span class="el-icon-close"></span>
                        </el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row style="border-top: 2px solid #E4E7ED;padding-top: 20px;margin-top: 20px;">
            <el-col :span="24">
              <el-form-item style="text-align: center;" label-width="0">
                <el-button v-if="isReadonly" v-show="state==='2'||state==='3'||state==='4'" type="primary" @click="handleApprove">催办确认人审批
                </el-button>
                <div v-else>
                  <el-button type="primary" v-if="state==='1'" @click="onSubmit">保存</el-button>
                  <el-button type="primary" v-if="state==='1'" @click="handleSendToJudge">推送到确认人</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </div>

    <el-dialog v-if="dialogVisible" class="no_footer" :visible.sync="dialogVisible" width="80%" :modal-append-to-body="false"
      :show-close="false" :close-on-click-modal="false">
      <div slot="title">
        <el-row>
          <el-col style="width: calc(100% - 100px);padding-left: 15px;">{{dialogTitle}}</el-col>
          <el-col style="width: 100px;text-align: right;padding-right: 15px;">
            <span class="el-dialog__close el-icon el-icon-close active" style="padding:5px;font-weight: bold;" @click="dialogVisible = false"></span>
          </el-col>
        </el-row>
      </div>

      <dept_user_index ref="deptUserRef" :isCheckBtn="isCheckBtn"></dept_user_index>
    </el-dialog>

  </div>
</template>

<script>
  import dept_user_index from "../../project_dept_user/dept_user_index";

  export default {
    name: "acceptance_application_report",
    props: ['projectId', 'projectType', 'billCode'],
    components: {
      dept_user_index
    },
    data() {
      return {
        /** 校验信息 */
        showMessage: false,

        /** 合同信息 */
        contractSelect: false,
        contract_id: '', //合同id
        contractList: [], //合同列表

        projectOptions: [], //项目基本信息 - 项目列表
        acceptList: [], //项目基本信息 - 验收类别
        itemList: [ //四项交接人
          {
            text: '可编译源代码完整性验证确认人',
            code: '1'
          },
          {
            text: '源代码功能性验证确认人',
            code: '2'
          },
          {
            text: '软件运维交接确认人',
            code: '3'
          },
          {
            text: '系统运维交接确认人',
            code: '4'
          },
        ],

        /** 人员选择弹框 */
        dialogVisible: false,
        dialogTitle: '', //dialog标题
        selectItem: {}, //dialog弹框时赋值
        isCheckBtn: false, //是否多选
        checkedList: [], //已选人员

        state: '1', //表单状态
        projectTitle: '', //表单抬头
        projectCode: '', //表单编码
        isReadonly: false, //projectType为read时为 true，（add,read）为 false
        uploadUrl: 'itmsdrm/transfer/api/dsm/file/upload', //上传url

        /** 表单参数 */
        formData: {
          /** 项目基本信息 */
          project_id: '', //项目id
          project_id1: '', //项目id
          project_name: '', //项目名称
          project_code: '', //项目编码

          contract_id: '', //合同id
          contract_name: '', //合同名称
          contract_code: '', //合同编码

          supplier: '', //实施单位
          project_manager: '', //项目经理人员
          project_manager_ids: [], //项目经理人员数组
          accept_type: '', //验收类别
          sign_date: '', //签字日期
          start_time: '', //项目起始时间
          acceptance_time: '', //验收申请时间

          acceptance_desc: '', //主要实施内容与完成情况

          /** 确认人 */
          biz_user_name: '', //项目业务经办人
          biz_user_name_ids: [], //项目业务经办人员数组
          msg_user_name: '', //项目信息经办人
          msg_user_name_ids: [], //项目信息经办人员数组

          /** 附件 */
          file_list_attach: [], //附件 - 验收文档
          upload_list_attach: [], //正在选择的上传文件
        },
        /** 表单校验 */
        rules: {
          project_name: [{
            required: true,
            message: '请选择项目名称',
          }],
          project_code: [{
            required: true,
            message: '请选择项目编号',
          }],
          contract_id: [{
            required: true,
            message: '请选择合同名称'
          }],
          contract_code: [{
            required: true,
            message: '请在合同名称重新选择合同'
          }],
          supplier: [{
            required: true,
            message: '请输入实施单位',
          }],
          project_manager: [{
            required: true,
            message: '请选择项目经理',
          }],
          accept_type: [{
            required: true,
            message: '请选择验收类别',
          }],
          biz_user_name: [{
            required: true,
            message: '请选择项目业务经办人',
          }],
          msg_user_name: [{
            required: true,
            message: '请选择项目信息经办人',
          }],
          sign_date: [{
            required: true,
            message: '请选择签字日期',
          }],
          start_time: [{
            required: true,
            message: '请选择项目起始时间',
          }],
          acceptance_time: [{
            required: true,
            message: '请选择验收申请时间',
          }],
          acceptance_desc: [{
            required: true,
            message: '请输入主要实施内容与完成情况'
          }],
        },

      }
    },
    watch: {
      state(val) {
        if (val !== '1') {
          this.isReadonly = true;
        }
      },
      contract_id(val) {
        this.formData.contract_id = val;
        if (this.contractSelect) {
          return;
        }
        this.formData.project_manager = '';
        this.formData.project_manager_ids = [];

        this.formData.biz_user_name = '';
        this.formData.biz_user_name_ids = [];
        this.formData.msg_user_name = '';
        this.formData.msg_user_name_ids = [];

        this.contractList.map(el => {
          if (el.id === val) {
            this.formData.start_time = el.contract_date;
            this.formData.contract_code = el.contract_code;
            this.formData.contract_name = el.contract_name;
            this.formData.supplier = el.supplier_name || '';

            this.formData.biz_user_name_ids = el.biz_users;
            this.formData.msg_user_name_ids = el.info_users;

            if (el.pm_users.length === 1) {
              this.formData.project_manager_ids = el.pm_users;
              el.pm_users.map((el, i) => {
                this.formData.project_manager += el.user_name;
              });
            }

            el.biz_users.map(ele => {
              this.formData.biz_user_name += ele.user_name + '；';
            });

            if (this.formData.biz_user_name_ids.length > 0) {
              this.formData.biz_user_name = this.formData.biz_user_name.substring(0, this.formData.biz_user_name.length -
                1);
            }

            el.info_users.map(ele => {
              this.formData.msg_user_name += ele.user_name + '；';
            });

            if (this.formData.msg_user_name_ids.length > 0) {
              this.formData.msg_user_name = this.formData.msg_user_name.substring(0, this.formData.msg_user_name.length -
                1);
            }

          }
        });

        if (this.formData.contract_code === '' || this.formData.contract_code === null) {
          this.$message({
            type: 'warning',
            message: '合同编号不能为空！请先到ITME系统中维护合同编号！'
          })
        }
      }
    },
    mounted() {
      this.projectTitle = this.$parent.$parent.$parent.projectTitle;
      this.projectCode = this.$parent.$parent.$parent.getProjectCode(this.billCode).label;
      this.formData.accept_type = '1';
      if (this.projectType === 'add' || this.projectType === 'edit') {
        this.isReadonly = false;
      } else {
        this.isReadonly = true;
      }
      this.acceptList = this.$parent.$parent.$parent.acceptList;
      this.getProjectListData();
      if (this.projectType !== 'add') {
        this.getFormData()
      }
    },
    methods: {
      /** 项目基本信息-获取项目列表 */
      getProjectListData() {
        let obj = {};
        obj.params = {
          type: this.billCode
        };
        obj.serviceRoot = 'project/searchProjectByJudge';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            this.projectOptions = result_data.rows;
          }
        }).catch(err => {
          console.log(err)
        })
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
        if (this.formData.project_code === null || this.formData.project_code === '') {
          this.formData.project_id1 = '';
          this.$message({
            type: 'warning',
            message: '请联系信息经办人在ITME系统中维护项目编号'
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
          project_id: project_id,
        };
        obj.serviceRoot = 'itms/contractByProjectIdQuery';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            this.contractList = result_data.rows || [];
            if (_type) {
              this.contractSelect = true;
              this.contract_id = contractId;
              return
            }

            this.contractSelect = false;
            if (this.contractList.length !== 0) {
              this.contract_id = this.contractList[0].id;

            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /** 项目基本信息- 验收类别 change */
      handleAcceptChange(val) {
        if (val === '1') {
          this.projectCode = 'XX3-JL12'
        } else if (val === '2') {
          this.projectCode = 'XX3-JL13'
        }
      },
      /** 根据表单id 获取表单信息 */
      getFormData() {
        let obj = {};
        obj.params = {
          id: this.projectId
        };
        obj.serviceRoot = 'project/acceptanceByIdQuery';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;
            this.state = result_data.state;
            this.formData.project_id = result_data.project_id;
            this.formData.project_code = result_data.project_code;
            if (this.formData.project_code === '' || this.formData.project_code === null) {
              this.formData.project_id1 = ''
            } else {
              this.formData.project_id1 = result_data.project_id;
            }
            this.formData.project_name = result_data.project_name;
            this.formData.supplier = result_data.supplier_name;
            this.formData.sign_date = result_data.sign_date;
            this.formData.acceptance_desc = result_data.content;
            this.formData.project_manager = result_data.project_manager.length === 0 ? '' : result_data.project_manager[
              0].user_name;
            this.formData.project_manager_ids = result_data.project_manager.length === 0 ? [] : result_data.project_manager;
            this.formData.start_time = result_data.start_date;
            this.formData.acceptance_time = result_data.acceptance_date;
            this.formData.accept_type = result_data.accept_type;

            this.formData.contract_code = result_data.contract_code;
            this.formData.contract_name = result_data.contract_name;
            this.multi_contract = result_data.multi_contract;

            this.getContractList(this.formData.project_id, 'search', result_data.contract_id);
            result_data.checkUsers[0].checkUser1.map((el, i) => {
              el.content = el.content || '';
            });
            result_data.checkUsers[0].checkUser2.map((el, i) => {
              el.content = el.content || '';
            });
            result_data.checkUsers[0].checkUser3.map((el, i) => {
              el.content = el.content || '';
            });
            result_data.checkUsers[0].checkUser4.map((el, i) => {
              el.content = el.content || '';
            });
            this.itemList.map((el, i) => {
              if (el.code === '1') {
                el.user_list = result_data.checkUsers[0].checkUser1 || [];
              } else if (el.code === '2') {
                el.user_list = result_data.checkUsers[0].checkUser2 || [];
              } else if (el.code === '3') {
                el.user_list = result_data.checkUsers[0].checkUser3 || [];
              } else if (el.code === '4') {
                el.user_list = result_data.checkUsers[0].checkUser4 || [];
              }
            });

            this.formData.biz_user_name = '';
            this.formData.biz_user_name_ids = [];
            result_data.biz_user.map(el => {
              this.formData.biz_user_name += (el.dept_name ? (el.dept_name + '/') : '') + el.user_name + '；';
              el.msg = el.msg || '无';
              this.formData.biz_user_name_ids.push(el)
            });
            if (this.formData.biz_user_name.length > 0) {
              this.formData.biz_user_name = this.formData.biz_user_name.substring(0, this.formData.biz_user_name.length -
                1);
            }

            this.formData.msg_user_name = '';
            this.formData.msg_user_name_ids = [];
            result_data.msg_user.map(el => {
              this.formData.msg_user_name += (el.dept_name ? (el.dept_name + '/') : '') + el.user_name + '；';
              this.formData.msg_user_name_ids.push(el);
            });
            if (this.formData.msg_user_name.length > 0) {
              this.formData.msg_user_name = this.formData.msg_user_name.substring(0, this.formData.msg_user_name.length -
                1);
            }

            result_data.attach.map(el => {
              el.name = el.file_name;
              el.status = 'success';
              if (el.upload_type === 'doc04') {
                el.prop = 'attach';
                this.formData['file_list_' + el.prop].push(el);
              }
            });

          }
        }).catch(err => {
          console.log(err)
        })
      },
      /** 文件删除 */
      handleDeleteFile(id, name, prop) {
        this.$confirm(`确定移除 ${name}？`, '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.$parent.$parent.$parent.deleteUploadFile(id, 'click');
          this.formData['file_list_' + prop].map((el, i) => {
            if (el.id === id) {
              this.formData['file_list_' + prop].splice(i, 1);
            }
          })
        }).catch(() => {});

      },
      /** 文件上传 验收文档 */
      handleChangeFile(file, fileList) {

        this.formData.upload_list_attach = [];
        this.$confirm('确定上传吗？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          fileList.map((el, i) => {
            if (el.status === 'ready') {
              this.formData.upload_list_attach.push(el);
            }
          });
          this.handleSaveFile({
            uploadType: 'doc04',
            prop: 'attach'
          });
          this.$refs.upload_attach.clearFiles();
        }).catch(() => {
          this.$refs.upload_attach.clearFiles();
        })
      },
      /** 文件上传接口 */
      handleSaveFile(params) {
        let formData = new FormData();
        this.formData.upload_list_attach.map(file => {
          if (file.status === 'ready') {
            formData.append("FILE_CONTENTS", file.raw);
          }
        });

        let obj = {};
        this.$parent.$parent.$parent.handleProgress();

        formData.append('bizId', this.projectId);
        formData.append('uploadType', params.uploadType);
        obj.headerType = 'application/x-www-form-urlencoded';
        obj.serviceRoot = 'transfer/business/file/upload';
        obj.baseURL = 'itmsdrm/';

        this.uploadFile(obj, formData, this).then(res => {
          this.handleUploadSuccess(res, params);
        }).catch(err => {
          this.$parent.$parent.$parent.handleUploadError();
          console.log(err)
        })
      },
      /** 文件上传成功后赋值 */
      handleUploadSuccess(response, file_data) {
        let message = response.resultMessage;
        let type = '';
        this.$parent.$parent.$parent.fileUploading.close();
        if (response.resultCode === '0') {
          let result_data = response.resultData;
          result_data.map((el, idx) => {
            this.formData['file_list_' + file_data.prop].push({
              id: el.id,
              url: el.url,
              bizId: el.bizId,
              upload_type: el.uploadType,
              file_name: el.fileName,
              file_size: el.fileSize,
              prop: file_data.prop,
            })
          });

          type = 'success'
        } else {
          type = 'error'
        }
        this.$message({
          type: type,
          message: message
        })
      },
      /** 删除选择人员 */
      handleUserDelete(prop) {
        this.formData[prop] = '';
        this.formData[prop + '_ids'] = []
      },
      /** 选择人员弹框 */
      handleAddUsers(prop, name, checkItem = true) {
        this.selectItem.name = name;
        this.selectItem.prop = prop;

        this.isCheckBtn = checkItem;
        this.dialogTitle = name + '人员选择';

        this.checkedList = this.formData[prop + '_ids'];

        this.dialogVisible = true;
      },
      /** 选择人员确认 */
      cascadeSubmit(checkList, isCheck) {
        this.dialogVisible = false;
        let checkStr = '';
        let arrList = [];
        if (checkList.length === 0) {
          this.formData[this.selectItem.prop] = checkStr;
          this.formData[this.selectItem.prop + '_ids'] = arrList;
          return
        }
        checkList.map((el, i) => {
          if (this.selectItem.prop === 'project_manager') {
            checkStr += el.name + '；';
          } else {
            checkStr += el.deptName + '/' + el.name + '；';
          }
          arrList.push({
            user_id: el.userId,
            user_name: el.name,
            dept_id: el.parentId || '',
            dept_name: el.deptName || '',
          })
        });
        checkStr = checkStr.substr(0, checkStr.length - 1);

        this.formData[this.selectItem.prop] = checkStr;
        this.formData[this.selectItem.prop + '_ids'] = arrList;
      },
      /** 表单保存 */
      saveFormData() {
        let stateId = this.$parent.$parent.$parent.getStateObj(this.state).id;
        let param = {
          id: this.projectId,
          project_id: this.formData.project_id,
          state: stateId,
          supplier: this.formData.supplier.trim(),
          accept_type: this.formData.accept_type,
          sign_date: this.formData.sign_date === '' || this.formData.sign_date === null ? '' : this.appDateFormat(
            this.formData.sign_date, 'yyyy-mm-dd'),
          project_start_date: this.formData.start_time === '' || this.formData.start_time === null ? '' : this.appDateFormat(
            this.formData.start_time, 'yyyy-mm-dd'),
          project_acceptance_date: this.formData.acceptance_time === '' || this.formData.acceptance_time === null ?
            '' : this.appDateFormat(this.formData.acceptance_time, 'yyyy-mm-dd'),
          project_manager_id: this.formData.project_manager_ids.length === 0 ? '' : this.formData.project_manager_ids[
            0].user_id,
          biz_user: this.formData.biz_user_name_ids,
          msg_user: this.formData.msg_user_name_ids,
          content: this.formData.acceptance_desc.trim(),
          contract_id: this.contract_id,
          multi_contract: this.contractList.length > 1 ? 'Y' : 'N'
        };

        let obj = {};
        obj.params = param;
        obj.baseURL = '/itmsdrm';
        obj.serviceRoot = 'project/acceptanceApplySave';
        this.$parent.$parent.$parent.toolLoading();
        this.requestDrmService(obj, this).then(res => {
          this.$parent.$parent.$parent.toolLoadClose();
          let message = '';
          let type = 'info';
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            if (result_data.flag) {
              type = 'success';
              message = '操作成功！';
              this.$parent.$parent.$parent.getChildrenFun();
            } else {
              this.state = '1';
              type = 'error';
              message = '操作失败！';
            }
          } else {
            type = 'error';
            message = '操作失败！';
          }
          this.$message({
            message: message,
            type: type
          });
        }).catch(err => {
          this.$parent.$parent.$parent.toolLoadClose();
          this.state = '1';
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        })
      },
      /** 验证合同是否可选 */
      checkProjectSelect(_state) {
        let obj = {};
        obj.params = {
          project_id: this.formData.project_id,
          contract_code: this.formData.contract_code,
          bill_type: this.billCode,
          safe_type: '',
          contract_id: this.contract_id,
          state: this.state,
          id: this.projectId
        };
        obj.baseURL = '/itmsdrm';
        obj.serviceRoot = 'project/checkOutContractGoOn';
        let type = 'warning';
        let message = '操作失败！';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
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
              })
            }
          } else {
            // this.state = '1';
            this.$message({
              type: type,
              message: message
            })
          }
        }).catch(err => {
          // this.state = '1';
          this.$message({
            type: type,
            message: message
          });
          console.log(err);
        })
      },
      /** 保存 */
      onSubmit() {
        this.showMessage = false;
        let start_date, end_date;
        start_date = new Date(this.formData.start_time).getTime();
        end_date = new Date(this.formData.acceptance_time).getTime();
        if (start_date > end_date) {
          this.$message({
            type: 'warning',
            message: '验收申请时间应不能早于项目起始时间'
          });
          return
        }
        // this.state = '1';
        this.$refs.formRef.clearValidate();
        this.checkProjectSelect('1');
      },
      /** 推送至审核人员 */
      handleSendToJudge() {
        this.showMessage = true;
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.showMessage = false;
            if (this.formData.msg_user_name_ids.length > 1) {
            this.$message({
              type: "warning",
              message: "项目信息经办只能选一人，请重新选择！"
            });
            return;
            }
            let start_date, end_date;
            start_date = new Date(this.formData.start_time).getTime();
            end_date = new Date(this.formData.acceptance_time).getTime();
            if (start_date > end_date) {
              this.$message({
                type: 'warning',
                message: '验收申请时间应不能早于项目起始时间'
              });
              return
            }
            this.$confirm('此操作将表单推送至审核人员, 是否继续?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(() => {
              // this.state = '2';
              this.checkProjectSelect('2');
            }).catch(() => {});
          } else {
            console.log('error submit!!');
            setTimeout(() => {
              const isError = document.getElementsByClassName('is-error');
              if (isError[0].querySelector('input')) {
                isError[0].querySelector('input').focus()
              }
              if (isError[0].querySelector('textarea')) {
                isError[0].querySelector('textarea').focus()
              }
            }, 100);
            return false;
          }
        });
      },
      /** 催办 */
      handleApprove() {
        this.$confirm('此操作是催办还没审核的人员, 是否继续?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.$parent.$parent.$parent.handleApprove(this.projectId, this.billCode);
        }).catch(() => {});
      }
    }
  }
</script>

<style scoped>
  #acceptance_application_report {
    height: 100%;
    overflow: auto;
  }
</style>

<!-- 信息安全评测确认单 edit by xyy -->
<template>
  <div id="security_evaluation_confirm_index">
    <div class="project_form">
      <div class="project_title">{{projectTitle}}信息安全评测确认单</div>
      <div>
        <el-form :model="formData" :rules="rules" ref="formRef" size="small" :show-message="showMessage" label-position="right"
          label-width="180px">
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
                <el-input v-if="isReadonly||formReadonly" v-model="formData.project_name" :disabled="isReadonly||formReadonly"></el-input>
                <el-select v-else v-model="formData.project_id" filterable placeholder="请选择项目名称" @change="handleSelectProject"
                  style="width: 100%;" :disabled="isReadonly||formReadonly">
                  <el-option v-for="(item,i) in projectOptions" :key="item.project_id+i" :label="item.project_name"
                    :value="item.project_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目编号：" prop="project_code">
                <el-input v-if="isReadonly||formReadonly" v-model="formData.project_code" :disabled="isReadonly||formReadonly"></el-input>
                <el-select v-else v-model="formData.project_id1" filterable placeholder="请选择项目编号" @change="handleSelectProject"
                  style="width: 100%;" :disabled="isReadonly||formReadonly">
                  <el-option v-for="(item,i) in projectOptions" :key="item.project_id+i" :label="item.project_code"
                    :value="item.project_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="合同名称：" prop="contract_id">
                <el-select v-model="formData.contract_id" filterable placeholder="请选择合同名称" style="width: 100%;"
                  :disabled="isReadonly||formReadonly" @change="handleSelectContract">
                  <el-option v-for="(item,i) in contractList" :key="item.id+i" :label="item.contract_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号：" prop="contract_code">
                <el-input v-model="formData.contract_code" :disabled="isReadonly||formReadonly" readonly></el-input>

              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="系统名称：" prop="system_name">
                <el-input :disabled="isReadonly" v-model="formData.system_name" clearable placeholder="请输入系统名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="测评阶段：" required>
                <el-input disabled v-model="formType" readonly placeholder="请输入测评阶段"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="测评类型：" prop="test_type">
                <el-select v-model="formData.test_type" multiple filterable placeholder="请选择测评类型" style="width: 100%;"
                  :disabled="isReadonly">
                  <el-option v-for="item in testTypeList" :key="item.value" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="安全保护等级：" prop="safe_level">
                <el-select v-model="formData.safe_level" filterable placeholder="请选择安全保护等级" style="width: 100%;"
                  :disabled="isReadonly">
                  <el-option v-for="item in protectList" :key="item.value" :label="item.value" :value="item.value">
                    {{item.label}}<span style="padding-left: 10px;">{{item.value}}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="评测人：" prop="review_user">
                <el-select v-model="formData.review_user" multiple :disabled="isReadonly" clearable placeholder="请选择评测人"
                  style="width: 100%;">
                  <el-option v-for="(item,i) in testerList" :key="'review_user'+i" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="评测日期：" prop="evaluation_date">
                <el-date-picker :disabled="isReadonly" v-model="formData.evaluation_date" type="date" placeholder="请输入评测日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="网络安全管理员：" prop="safe_evaluator">
                <el-input v-model="formData.safe_evaluator" placeholder="请输入安全评测人" disabled></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="安全评测情况：" prop="safety_assessment">
                <el-input :disabled="isReadonly" v-model="formData.safety_assessment" clearable type="textarea" rows="6"
                  placeholder="请输入安全评测情况" maxlength="400" show-word-limit :autosize="{ minRows: 6 }"></el-input>
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
            <el-col :span="16">
              <el-form-item label="信息中心/负责人：" prop="info_center_name">
                <div v-if="isReadonly&&confirmProjectType==='read'" class="sign_div">
                  <span v-for="(user,i) in formData.info_center_name_ids">
                    <span>
                      <span>{{user.dept_name}}/{{user.user_name}}</span>
                      <span v-if="user.sign==='Y'" class="el-icon-check sign_item"></span>
                      <span v-if="i!==formData.info_center_name_ids.length-1">；</span>
                    </span>
                  </span>
                </div>
                <div v-else style="position: relative;">
                  <el-input v-model="formData.info_center_name" placeholder="请选择信息中心/负责人" readonly></el-input>
                  <span v-if="formData.info_center_name!=''&&!isReadonly" class="clear_input_item" @click="handleUserDelete('info_center_name')">
                    <span class="el-icon-circle-close"></span>
                  </span>
                </div>

              </el-form-item>
            </el-col>
            <el-col v-if="!isReadonly" style="width:30px;text-align:right;line-height: 32px;">
              <i class="el-icon-circle-plus add_user_img" @click="handleAddUsers('info_center_name','信息中心/负责人',true)"></i>
            </el-col>
          </el-row>

          <el-row v-if="isReadonly&&confirmProjectType=='read'">
            <el-col :span="16">
              <el-form-item label="信息中心/负责人意见：">
                <div class="sign_suggest_div">
                  <div v-for="(dept_name,i) in formData.info_center_name_ids">
                    <div class="sign_suggest_msg" v-if="dept_name.sign==='Y'" v-show="dept_name.content!==''">
                      <span>{{dept_name.user_name}}：</span>
                      <span>{{dept_name.content}}</span>
                      <span class="sign_date_padding">签字日期：{{dept_name.sign_date|filterDateFormat('.')}}</span>
                    </div>
                  </div>
                </div>
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
              <el-form-item label="上传文档：">
                <div v-if="isReadonly&&confirmProjectType==='read'">
                  <span class="attach_no_data" v-if="formData.file_list_attach.length===0">暂无</span>
                  <div v-else>
                    <div class="download_file_name" v-for="(item,i) in formData.file_list_attach" :key="'attach_'+i">
                      <span class="el-icon-document"></span>
                      <a :href="item.url">{{item.name}}</a>
                    </div>
                  </div>
                </div>
                <el-upload v-else ref="upload_attach" :disabled="isReadonly" class="upload-demo" :action="uploadUrl"
                  :auto-upload="false" :show-file-list="false" :name="'FILE_CONTENTS'" multiple :data="{bizId:projectId,uploadType:'doc08',prop:'attach'}"
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
                  <el-button v-if="state==='1'" type="primary" @click="onSubmit">保存</el-button>
                  <el-button v-if="state==='1'" type="primary" @click="handleSendToJudge">推送到确认人</el-button>
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
  import dept_user from '../../project_dept_user/index' //选择部门和人员
  import dept_user_radio from '../../project_dept_user/index_radio' //选择部门和人员单选
  import dept_user_index from "../../project_dept_user/dept_user_index";

  export default {
    name: "security_evaluation_confirm",
    props: ['projectType', 'testerList', 'projectTitle', 'projectCode', 'formType', 'bill_type', 'confirmProjectType'],
    components: {
      dept_user,
      dept_user_radio,
      dept_user_index
    },
    data() {
      return {
        /** 校验信息 */
        showMessage: false,

        isReadonly: false, //projectType为read时为 true，（add,read）为 false
        formReadonly: false,

        projectOptions: [], //项目基本信息 - 项目列表
        reviewUserList: [{
          value: '北京绿盟科技'
        }, {
          value: '深圳海云安'
        }, {
          value: '公安部第一研究所'
        }, {
          value: '武汉安域'
        }], //项目基本信息 - 评测人
        testTypeList: [], //项目基本信息 - 测评类型
        protectList: [ //项目基本信息 - 安全保护等级
          {
            value: '第一级',
            label: '自主保护级'
          },
          {
            value: '第二级',
            label: '指导保护级'
          },
          {
            value: '第三级',
            label: '监督保护级'
          },
          // {value: '第四级', label: '强制保护级'},
          // {value: '第五级', label: '专控保护级'}
        ],

        /** 合同信息 */
        contract_id: '', //合同id
        contractSelect: false,
        contractList: [], //合同列表

        billCode: '8', //表单code
        state: '1', //表单状态
        mainId: '', //主表id，申请单与确认单关联id
        projectId: '', //表单id

        /** 人员选弹框 */
        dialogTitle: '', //dialog标题
        dialogVisible: false,
        selectItem: {}, //dialog弹框时赋值
        isCheckBtn: false, //是否多选 多选为true
        checkedList: [], //已选人员

        uploadUrl: 'itmsdrm/transfer/api/dsm/file/upload', //附件上传url

        /** 表单参数 */
        formData: {
          project_id: '', //项目id
          project_id1: '', //项目id
          project_name: '', //项目名称
          project_code: '', //项目编码
          contract_id: '', //合同id
          contract_name: '', //合同名称
          contract_code: '', //合同编码

          system_name: '', //系统名称
          test_type: [], //测评类型
          safe_level: '第二级', //安全保护等级
          review_user: [], //评测人
          evaluation_date: '', //评测日期
          safety_assessment: '', //安全评测情况
          safe_evaluator: '', //网络安全管理员
          safe_evaluator_ids: [], //网络安全管理员数组

          /** 确认人 */
          info_center_name: '', //信息中心/负责人
          info_center_name_ids: [], //信息中心/负责人数组

          /** 附件 */
          file_list_attach: [], //附件 - 上传文档
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
          system_name: [{
            required: true,
            message: '请输入系统名称',
          }],
          test_type: [{
            required: true,
            message: '请选择测评类型'
          }],
          safe_level: [{
            required: true,
            message: '请选择安全保护等级',
          }],
          review_user: [{
            required: true,
            message: '请选择评测人',
          }],
          evaluation_date: [{
            required: true,
            message: '请选择评测日期',
          }],
          safety_assessment: [{
            required: true,
            message: '请输入安全评测情况',
          }],
          safe_evaluator: [{
            required: true,
            message: '请输入网络安全员，默认为发起人',
          }],
          info_center_name: [{
            required: true,
            message: '请选择信息中心/负责人',
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
        this.contractList.map(el => {
          if (el.id === val) {
            this.formData.contract_code = el.contract_code;
            this.formData.contract_name = el.contract_name;
            this.formData.supplier = el.supplier_name || '';
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
      this.mainId = this.$parent.projectId;
      this.confirmProjectType = this.$parent.confirmProjectType;
      this.testTypeList = this.$parent.$parent.$parent.$parent.testTypeList;
      if (this.confirmProjectType === 'add' || this.confirmProjectType === 'edit') {
        this.isReadonly = false;
      } else {
        this.isReadonly = true;
      }

      if (this.projectType === 'add' && this.confirmProjectType === 'add') {
        this.isReadonly = false;
        this.formReadonly = false;
      }

      if (this.projectType === 'read' && this.confirmProjectType === 'add') {
        this.formReadonly = true;
        this.isReadonly = false;
        if (this.$parent.subId === '') {
          this.getApplyData(this.mainId);
        }
      }

      this.getProjectListData();

      this.formData.safe_evaluator = '邹鑫灏';

      if (this.confirmProjectType === 'add') {
        this.projectId = this.$parent.$parent.$parent.$parent.randomString();
      } else {
        if (this.$parent.billCode === '9' && this.$parent.subId !== '') {
          this.projectId = this.$parent.subId;
        } else {
          this.projectId = this.mainId;
        }
        if (this.$parent.subId !== '') {
          this.formReadonly = true;
        }
        this.getFormData(this.projectId)
      }

    },
    methods: {
      /** 项目基本信息-获取项目列表 */
      getProjectListData() {
        let obj = {};
        obj.params = {
          type: this.billCode,
          bill_type: this.bill_type
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
      /** 项目 change */
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
      /** 合同 change */
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
      /** 项目基本信息- 获取申请单信息 */
      getApplyData(id) {
        let obj = {};
        obj.params = {
          id: id
        };
        obj.serviceRoot = 'project/querySafeApplyById';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;

            this.formData.project_id = result_data.project_id;
            this.formData.project_code = result_data.project_code;
            this.formData.project_name = result_data.project_name;
            if (this.formData.project_code === '' || this.formData.project_code === null) {
              this.formData.project_id1 = ''
            } else {
              this.formData.project_id1 = result_data.project_id;
            }
            //zhaoxi新增
            if (result_data.state === '5') {
              this.formData.evaluation_date = result_data.upt_time;
            }
            //结束
            this.formData.contract_code = result_data.contract_code;
            this.formData.contract_name = result_data.contract_name;
            this.multi_contract = result_data.multi_contract;

            this.getContractList(this.formData.project_id, 'search', result_data.contract_id);
            this.formData.system_name = result_data.system_name;
            this.formData.safe_level = result_data.safe_level;

            this.formData.test_type = [];
            result_data.evaluation_types.map(el => {
              this.formData.test_type.push(el.test_type);
            });
          }
        })
      },
      /** 获取项目信息 */
      getFormData(id) {
        let obj = {};
        obj.params = {
          id: id
        };
        obj.serviceRoot = 'project/safeByIdQuery';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;
            this.state = result_data.state;


            this.formData.project_id = result_data.project_id;
            this.formData.project_code = result_data.project_code;
            this.formData.project_name = result_data.project_name;
            if (this.formData.project_code === '' || this.formData.project_code === null) {
              this.formData.project_id1 = ''
            } else {
              this.formData.project_id1 = result_data.project_id;
            }
            this.formData.contract_code = result_data.contract_code;
            this.formData.contract_name = result_data.contract_name;
            this.multi_contract = result_data.multi_contract;

            this.getContractList(this.formData.project_id, 'search', result_data.contract_id);

            this.formData.sign_date = result_data.sign_date;
            this.formData.system_name = result_data.sys_name;

            this.formData.test_type = [];
            result_data.evaluation_types.map(el => {
              this.formData.test_type.push(el.test_type);
            });

            this.formData.safe_level = result_data.safe_level;
            this.formData.evaluation_date = result_data.review_date;
            this.formData.safety_assessment = result_data.content;
            this.formData.safe_evaluator = result_data.safeUser;

            this.formData.review_user = result_data.review_user;

            this.formData.info_center_name = '';
            this.formData.info_center_name_ids = [];
            result_data.info_user.map(el => {
              this.formData.info_center_name += (el.dept_name || '') + el.user_name + '；';
              el.content = el.content || '';
              this.formData.info_center_name_ids.push(el);
            });
            if (this.formData.info_center_name.length > 0) {
              this.formData.info_center_name = this.formData.info_center_name.substring(0, this.formData.info_center_name
                .length - 1);
            }

            result_data.attach.map(el => {
              el.name = el.file_name;
              el.status = 'success';
              if (el.upload_type === 'doc08') {
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
          this.$parent.$parent.$parent.$parent.deleteUploadFile(id, 'click');
          this.formData['file_list_' + prop].map((el, i) => {
            if (el.id === id) {
              this.formData['file_list_' + prop].splice(i, 1);
            }
          })
        }).catch(() => {});

      },
      /** 文件上传 上传文档 */
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
            uploadType: 'doc08',
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
        this.$parent.$parent.$parent.$parent.handleProgress();

        formData.append('bizId', this.projectId);
        formData.append('uploadType', params.uploadType);
        obj.headerType = 'application/x-www-form-urlencoded';
        obj.serviceRoot = 'transfer/business/file/upload';
        obj.baseURL = 'itmsdrm/';

        this.uploadFile(obj, formData, this).then(res => {
          this.handleUploadSuccess(res, params);
        }).catch(err => {
          this.$parent.$parent.$parent.$parent.handleUploadError();
          console.log(err)
        })
      },
      /** 文件上传成功后赋值 */
      handleUploadSuccess(response, file_data) {
        let message = response.resultMessage;
        let type = '';
        this.$parent.$parent.$parent.$parent.fileUploading.close();
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
        // if (prop === 'project_manager') {
        //   this.isCheckBtn = false;
        // } else {
        //   this.isCheckBtn = true;
        // }
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
        let type = '';
        if (this.selectItem.prop === 'info_center_name') {
          type = '2'
        }
        if (checkList.length === 0) {
          this.formData[this.selectItem.prop] = checkStr;
          this.formData[this.selectItem.prop + '_ids'] = arrList;
          return
        }
        checkList.map((el, i) => {
          checkStr += el.deptName + '/' + el.name + '；';
          arrList.push({
            user_id: el.userId,
            user_name: el.name,
            dept_id: el.parentId || '',
            dept_name: el.deptName || '',
            user_type: type
          })
        });
        // checkList.map(el => {
        //   if (!el.hasChildren) {
        //     arrList.push({user_id: el.value, dept_id: el.path[el.path.length - 2], user_type: type});
        //     el.pathLabels.map(ele => {
        //       checkStr += ele + '/'
        //     });
        //     checkStr = checkStr.substr(0, checkStr.length - 1);
        //     checkStr += '；'
        //   }
        // });
        checkStr = checkStr.substr(0, checkStr.length - 1);
        this.formData[this.selectItem.prop] = checkStr;
        this.formData[this.selectItem.prop + '_ids'] = arrList;
      },
      /** 表单保存 */
      saveFormData() {
        let stateId = this.$parent.$parent.$parent.$parent.getStateObj(this.state).id;
        let dept_list = [];
        dept_list = dept_list.concat(this.formData.info_center_name_ids);
        let evaluation_types = [];
        this.formData.test_type.map(el => {
          evaluation_types.push({
            test_type: el
          })
        });

        let param = {
          id: this.projectId,
          project_id: this.formData.project_id,
          state: stateId,
          evaluation_types: evaluation_types,
          review_user: this.formData.review_user,
          safeUser: this.formData.safe_evaluator.trim(),
          sys_name: this.formData.system_name.trim(),
          safe_level: this.formData.safe_level,
          review_date: this.formData.evaluation_date === '' || this.formData.evaluation_date === null ? '' : this.appDateFormat(
            this.formData.evaluation_date, 'yyyy-mm-dd'),
          content: this.formData.safety_assessment.trim(),
          bill_type: this.bill_type,
          users: dept_list,
          contract_id: this.contract_id,
          multi_contract: this.contractList.length > 1 ? 'Y' : 'N'
        };
        let obj = {};
        obj.params = param;
        obj.baseURL = '/itmsdrm';
        obj.serviceRoot = 'project/saftReviewSave';
        this.$parent.$parent.$parent.$parent.toolLoading();
        this.requestDrmService(obj, this).then(res => {
          this.$parent.$parent.$parent.$parent.toolLoadClose();
          let message = '';
          let type = 'info';
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            if (result_data.flag) {
              type = 'success';
              message = '操作成功！';
              this.$parent.$parent.$parent.$parent.getChildrenFun();
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
          this.$parent.$parent.$parent.$parent.toolLoadClose();
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
          safe_type: this.bill_type,
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
          this.$parent.$parent.$parent.$parent.handleApprove(this.projectId, this.billCode);
        }).catch(() => {});

      },
    }
  }
</script>

<style scoped>
  #security_evaluation_confirm_index {
    height: 100%;
    animation: rtl-drawer-in .3s 1ms;
    overflow: auto;
  }
</style>

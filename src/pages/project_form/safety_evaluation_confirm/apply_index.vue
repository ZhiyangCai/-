<!-- 安全评测申请单 edit by xyy -->
<template>
  <div id="security_evaluation_apply_index">
    <div class="project_form">
      <div class="project_title">{{projectTitle}}安全评测申请单</div>
      <div>
        <el-form :model="formData" :rules="rules" ref="formRef" size="small" :show-message="showMessage" label-position="right"
          label-width="180px">
          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="24">
                <div class="head">项目基本信息：</div>
              </el-col>
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
          </el-row>
          <el-row>
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
              <el-form-item label=" 实施单位：" prop="supplier">
                <el-input :disabled="isReadonly" v-model="formData.supplier" clearable placeholder="请输入实施单位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 申请单位/部门：" prop="apply_dept">
                <el-input disabled v-model="formData.apply_dept" clearable placeholder="请输入申请单位/部门"></el-input>
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
                <el-input disabled v-model="formType" placeholder="请输入测评阶段"></el-input>
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
              <el-form-item label="申请时间：">
                <el-date-picker disabled v-model="formData.apply_date" type="date" placeholder="无需填写，由系统自动生成"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划完成时间：">
                <el-date-picker disabled v-model="formData.plan_date" type="date" placeholder="无需填写，网络安全员填写后自动生成"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="供应商项目经理：" prop="project_manager">
                <el-row>
                  <el-col :style="{'width':(isReadonly?'100%':'calc(100% - 30px)')}">
                    <div style="position: relative;">
                      <el-input v-model="formData.project_manager" :disabled="isReadonly" readonly placeholder="请选择供应商项目经理"></el-input>
                      <span v-if="formData.project_manager!=''&&!isReadonly" class="clear_input_item" @click="handleUserDelete('project_manager')">
                        <span class="el-icon-circle-close"></span>
                      </span>
                    </div>

                  </el-col>
                  <el-col v-if="!isReadonly" style="width: 30px;text-align: right;">
                    <i class="el-icon-circle-plus add_user_img" @click="handleAddUsers('project_manager','供应商项目经理',false)"></i>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系电话：" prop="link_phone">
                <el-input :disabled="isReadonly" v-model="formData.link_phone" placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="web系统/客户端/app登录账号密码：" class="form_line_height_item">
                <el-row>
                  <el-col :span="12" style="padding-right:10px">
                    <!--                    <el-input disabled placeholder="管理员账号/密码：申请人线下提供"></el-input>-->
                    <div class="sign_div">管理员账号/密码：申请人线下提供</div>
                  </el-col>
                  <el-col :span="12" style="padding-left: 10px;">
                    <!--                    <el-input disabled placeholder="普通账号/密码：申请人线下提供"></el-input>-->
                    <div class="sign_div">普通账号/密码：申请人线下提供</div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label=" 安全评测申请次数：" prop="review_amount">
                <el-input disabled v-model="formData.review_amount" placeholder="请输入安全评测申请次数"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="系统访问url/客户端/APP下载地址：" class="form_line_height_item">
                <div class="url_div">
                  <el-form-item label="系统内网地址：" prop="in_net" class="form_line_height_default">
                    <el-input :disabled="isReadonly" type="textarea" v-model="formData.in_net" show-word-limit
                      placeholder="请输入系统内网地址" maxlength="500" :autosize="{ minRows: 3 }"></el-input>
                  </el-form-item>
                  <el-form-item label="系统外网地址：" class="form_line_height_default">
                    <el-input :disabled="isReadonly" type="textarea" v-model="formData.out_net" show-word-limit
                      placeholder="请输入系统外网地址" maxlength="500" :autosize="{ minRows: 3 }"></el-input>
                  </el-form-item>
                  <el-form-item label="系统服务器IP：" class="form_line_height_default">
                    <el-input :disabled="isReadonly" type="textarea" v-model="formData.server_ip" show-word-limit
                      placeholder="请输入系统服务器IP" maxlength="500" :autosize="{ minRows: 3 }"></el-input>
                  </el-form-item>
                  <el-form-item label="客户端/APP下载地址：" class="form_line_height_default">
                    <el-input :disabled="isReadonly" type="textarea" v-model="formData.app_download" show-word-limit
                      placeholder="请输入客户端/APP下载地址" maxlength="500" :autosize="{ minRows: 3 }"></el-input>
                  </el-form-item>
                </div>
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
                <div v-if="isReadonly&applyProjectType==='read'" class="sign_div">
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
                <div v-if="isReadonly&applyProjectType==='read'" class="sign_div">
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
              <i class="el-icon-circle-plus add_user_img" @click="handleAddUsers('msg_user_name','项目信息经办人',true)"></i>
            </el-col>
          </el-row>

          <el-row v-if="isReadonly&&applyProjectType==='read'">
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
                    <div class="sign_suggest_msg" v-if="user.sign==='Y'" v-show="user.message!==''">
                      <span>{{user.user_name}}：</span>
                      <span>{{user.message}}</span>
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
                <div class="head">附件：</div>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="16">
              <el-form-item label="上传文档：">
                <div v-if="attachReadonly&&applyProjectType==='read'">
                  <span class="attach_no_data" v-if="formData.file_list_attach.length===0">暂无</span>
                  <div v-else>
                    <div class="download_file_name" v-for="(item,i) in formData.file_list_attach" :key="'attach_'+i">
                      <span class="el-icon-document"></span>
                      <a :href="item.url">{{item.name}}</a>
                    </div>
                  </div>
                </div>
                <el-upload v-else ref="upload_attach" :disabled="attachReadonly" class="upload-demo" :action="uploadUrl"
                  :auto-upload="false" :show-file-list="false" :name="'FILE_CONTENTS'" multiple :data="{bizId:projectId,uploadType:'doc08',prop:'attach'}"
                  :on-change="handleChangeFile">
                  <div slot="trigger">
                    <el-button size="small" :disabled="attachReadonly" type="primary" style="width: 200px;">
                      选取文件
                    </el-button>
                  </div>

                  <div class="file_list">
                    <el-row class="file_list_row" v-for="(file,i) in formData.file_list_attach" :key="'file_'+i">
                      <el-col class="file_list_name">
                        <span class="el-icon-document"></span>
                        <a :href="file.url">{{file.file_name}}</a>
                      </el-col>
                      <el-col v-if="!attachReadonly" class="file_list_delete">
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
                <div v-if="attachReadonly">
                  <el-button v-show="state==='2'||state==='3'||state==='4'" type="primary" @click="handleApprove">
                    催办确认人审批
                  </el-button>
                  <el-button v-show="state==='6'" type="primary" @click="handleApprove">催办网络安全管理员审批
                  </el-button>
                </div>

                <div v-else>
                  <el-button v-if="state==='1'" type="primary" @click="onSubmit">保存</el-button>
                  <el-button v-if="state==='1'" type="primary" @click="handleSendToJudge">推送到确认人
                  </el-button>
                  <el-button v-if="state==='7'" type="primary" @click="handleSendToJudge">推送到网络安全管理员
                  </el-button>
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
  import dept_user_index from "../../project_dept_user/dept_user_index" //人员选择

  export default {
    name: "apply_index",
    props: ['projectType', 'testerList', 'projectTitle', 'formType', 'bill_type', 'applyProjectType'],
    components: {
      dept_user_index
    },
    data() {
      var checkphone = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入手机号"));
        } else if (!this.isCellPhone(value)) { //引入methods中封装的检查手机格式的方法
          callback(new Error("请输入正确的手机号!"));
        } else {
          callback();
        }
      };
      return {
        /** 校验信息 */
        showMessage: false,

        isReadonly: false, //projectType为read时为 true，（add,read）为 false
        attachReadonly: false, //state为7applyProjectType为edit时 attachReadonly为false，其他状态与isReadonly一样

        /** 合同信息 */
        contract_id: '', //合同id
        contractSelect: false,
        contractList: [], //合同列表

        projectOptions: [], //项目基本信息 - 项目列表
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
        testTypeList: [], //项目基本信息 - 测评类型
        itemList: [
          // {text: '应用系统主管部门负责人', code: 'apps', user_list: []},
          // {text: '信息化主管部门负责人', code: 'indp', user_list: []},
          {
            text: '网络安全管理员',
            code: 'web',
            user_list: []
          },
        ],

        billCode: '9', //表单code
        state: '1', //表单状态
        oldState: '1', //表单初始状态
        projectId: '', //表单id
        mainId: '', //主表id，申请单与确认单关联id

        /** 人员选弹框 */
        dialogTitle: '', //dialog标题
        dialogVisible: false,
        selectItem: {}, //dialog弹框时赋值
        isCheckBtn: false, //是否多选 多选为true
        checkedList: [], //已选人员

        uploadUrl: '', //附件上传url

        /** 表单参数 */
        formData: {
          project_id: '', //项目id
          project_id1: '', //项目id
          project_name: '', //项目名称
          project_code: '', //项目编码
          contract_id: '', //合同id
          contract_name: '', //合同名称
          contract_code: '', //合同编码

          supplier: '', //实施单位
          apply_dept: '', //申请单位/部门
          supplier_unit_id: '', //申请单位id
          supplier_dept_id: '', //申请部门id
          supplier_unit_name: '', //申请单位name
          supplier_dept_name: '', //申请单位name
          system_name: '', //系统名称
          test_type: [], //测评类型
          safe_level: '第二级', //安全保护等级
          apply_date: '', //申请时间
          plan_date: '', //计划完成时间
          project_manager: '', //供应商项目经理
          project_manager_ids: [], //供应商项目经理数组
          link_phone: '', //联系电话
          review_amount: 1, //安全评测申请次数

          /** 系统访问url/客户端/APP下载地址 */
          in_net: '', //系统内网地址
          out_net: '', //系统外网地址
          server_ip: '', //系统服务器IP
          app_download: '', //客户端/APP下载地址

          /** 确认人 */
          biz_user_name: '', //项目业务经办
          biz_user_name_ids: [], //项目业务经办数组
          msg_user_name: '', //项目信息经办人
          msg_user_name_ids: [], //项目信息经办人数组

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
          supplier: [{
            required: true,
            message: '请输入实施单位'
          }],
          apply_dept: [{
            required: true,
            message: '请输入申请单位/部门'
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
          project_manager: [{
            required: true,
            message: '请选择供应商项目经理'
          }],
          link_phone: [{
            required: true,
            validator: checkphone
          }],
          review_amount: [{
            required: true,
            message: '请输入安全评测申请次数'
          }],
          in_net: [{
            required: true,
            message: '请输入系统内网地址',
          }],
          biz_user_name: [{
            required: true,
            message: '请选择项目业务经办人',
          }],
          msg_user_name: [{
            required: true,
            message: '请选择项目信息经办人',
          }],
        },
      }
    },
    watch: {
      state(val) {
        if (this.state !== '1') {
          this.isReadonly = true;
        }

        this.attachReadonly = this.isReadonly;

        if (this.state === '7') {
          if (this.applyProjectType === 'edit') {
            this.attachReadonly = false;
          }
        }
      },
      contract_id(val) {
        this.formData.contract_id = val;
        if (this.contractSelect) {
          return;
        }
        this.formData.project_manager_ids = [];
        this.formData.project_manager = '';

        this.formData.biz_user_name = '';
        this.formData.biz_user_name_ids = [];
        this.formData.msg_user_name = '';
        this.formData.msg_user_name_ids = [];

        this.contractList.map(el => {
          if (el.id === val) {
            this.formData.contract_code = el.contract_code;
            this.formData.contract_name = el.contract_name;
            this.formData.supplier = el.supplier_name || '';
            this.formData.project_manager_ids = [];
            this.formData.project_manager = el.party_b.user_name || '';
            this.formData.link_phone = el.party_b.mobile || '';

            this.formData.biz_user_name_ids = el.biz_users;
            this.formData.msg_user_name_ids = el.info_users;

            if (el.party_b.user_id) {
              this.formData.project_manager_ids.push({
                user_name: el.party_b.user_name || '',
                user_id: el.party_b.user_id,
                mobile: el.party_b.mobile
              });
            }

            // if (el.pm_users.length === 1) {
            //   this.formData.project_manager_ids = el.pm_users;
            //   el.pm_users.map((el, i) => {
            //     this.formData.link_phone = el.mobile || '';
            //     this.formData.project_manager += el.user_name;
            //   });
            // }

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

      },
    },
    mounted() {
      this.mainId = this.$parent.projectId;
      this.applyProjectType = this.$parent.applyProjectType;
      this.testTypeList = this.$parent.$parent.$parent.$parent.testTypeList;

      if (this.applyProjectType === 'add' || this.applyProjectType === 'edit') {
        this.isReadonly = false;
      } else {
        this.isReadonly = true;
      }
      this.attachReadonly = this.isReadonly;

      this.applyProjectType = this.$parent.applyProjectType;
      this.getProjectListData();

      if (this.applyProjectType === 'add') {
        this.projectId = this.$parent.$parent.$parent.$parent.randomString();
      } else {
        if (this.$parent.billCode === '8' && this.$parent.subId !== '') {
          this.projectId = this.$parent.subId;
        } else {
          this.projectId = this.mainId;
        }
        this.getFormData(this.projectId)
      }

    },
    methods: {
      /** 手机号检测 */
      isCellPhone(val) {
        if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
          return false;
        } else {
          return true;
        }
      },
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
            el.supplier_unit_name = el.supplier_unit_name || '';
            el.supplier_dept_name = el.supplier_dept_name || '';

            this.formData.apply_dept = (el.supplier_unit_name === '' ? '' : el.supplier_unit_name) +
              (el.supplier_dept_name === '' ? '' : '/' + el.supplier_dept_name);

            this.formData.supplier_unit_id = el.supplier_unit || '';
            this.formData.supplier_dept_id = el.supplier_dept || '';
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
      /** 项目基本信息- 获取确认单信息 */
      getConfirmData(id) {
        let obj = {};
        obj.params = {
          id: id
        };
        obj.serviceRoot = 'project/safeByIdQuery';
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
            this.formData.contract_code = result_data.contract_code;
            this.formData.contract_name = result_data.contract_name;
            this.multi_contract = result_data.multi_contract;

            this.getContractList(this.formData.project_id, 'search', result_data.contract_id);
            this.formData.system_name = result_data.sys_name;
            this.formData.safe_level = result_data.safe_level;

            this.formData.supplier = result_data.supplier_name;

            this.formData.apply_dept = result_data.apply_unit_dept_name;
            this.formData.supplier_unit_id = result_data.supplier_unit_id;
            this.formData.supplier_dept_id = result_data.supplier_dept_id;

          }
        })
      },
      /** 获取项目信息 */
      getFormData(id) {
        let obj = {};
        obj.params = {
          id: id
        };
        obj.serviceRoot = 'project/querySafeApplyById';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;

            this.state = result_data.state;
            this.oldState = result_data.state;
            if (this.state === '7') {
              if (this.applyProjectType === 'edit') {
                this.attachReadonly = false;
              }
            }

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

            this.formData.supplier = result_data.supplier_name;

            this.formData.apply_dept = result_data.apply_unit_dept_name;
            this.formData.supplier_unit_id = result_data.supplier_unit_id;
            this.formData.supplier_dept_id = result_data.supplier_dept_id;

            this.formData.project_manager = result_data.link_user || '';

            this.formData.project_manager_ids = [];
            if (result_data.link_user) {
              this.formData.project_manager_ids.push({
                user_id: result_data.link_name || '',
                user_name: result_data.link_user || '',
                mobile: result_data.link_phone || ''
              });
            }
            this.formData.link_phone = result_data.link_phone;

            this.formData.system_name = result_data.system_name;

            this.formData.test_type = [];
            result_data.evaluation_types.map(el => {
              this.formData.test_type.push(el.test_type);
            });

            this.formData.apply_date = result_data.apply_date;

            this.formData.review_amount = result_data.review_amount;

            this.formData.safe_level = result_data.safe_level;

            this.formData.plan_date = result_data.plan_date;
            this.formData.in_net = result_data.in_net;
            this.formData.out_net = result_data.out_net;
            this.formData.server_ip = result_data.server_ip;
            this.formData.app_download = result_data.app_download;

            this.formData.biz_user_name = '';
            this.formData.msg_user_name = '';
            this.formData.biz_user_name_ids = [];
            this.formData.msg_user_name_ids = [];

            result_data.confirm_users.map(el => {
              if (el.user_type === 'info') {
                this.formData.msg_user_name += el.dept_name + '/' + el.user_name + '；';
                this.formData.msg_user_name_ids.push(el);
              } else if (el.user_type === 'biz') {
                this.formData.biz_user_name += el.dept_name + '/' + el.user_name + '；';
                this.formData.biz_user_name_ids.push(el);
              } else {
                this.itemList.map(ele => {
                  if (ele.code === el.user_type) {
                    ele.user_list.push(el);
                  }
                })
              }
            });

            if (this.formData.msg_user_name.length > 0) {
              this.formData.msg_user_name = this.formData.msg_user_name.substring(0, this.formData.msg_user_name.length -
                1)
            }

            if (this.formData.biz_user_name.length > 0) {
              this.formData.biz_user_name = this.formData.biz_user_name.substring(0, this.formData.biz_user_name.length -
                1)
            }

            result_data.attach.map(el => {
              el.upload_type = el.upload_type || '';

              el.name = el.file_name;
              el.status = 'success';
              if (el.upload_type === 'doc08') {
                el.prop = 'attach';
                this.formData['file_list_' + el.prop].push(el)
              }

            });
          }
        }).catch(err => {

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
        this.dialogTitle = name + '人员选择';
        this.isCheckBtn = checkItem;

        this.checkedList = this.formData[prop + '_ids'];
        this.dialogVisible = true;
      },
      /** 选择人员确认 */
      cascadeSubmit(checkList, isCheck) {
        this.dialogVisible = false;
        let checkStr = '';
        let arrList = [];
        let typeList = {
          project_manager: '1',
          biz_user_name: 'biz',
          msg_user_name: 'info'
        };

        if (checkList.length === 0) {
          this.formData[this.selectItem.prop] = checkStr;
          this.formData[this.selectItem.prop + '_ids'] = arrList;
          return
        }
        checkList.map((el, i) => {
          if (this.selectItem.prop === 'project_manager') {
            this.formData.link_phone = el.mobile;
            checkStr += el.name + '；';
          } else {
            checkStr += el.deptName + '/' + el.name + '；';
          }

          arrList.push({
            user_id: el.userId,
            user_name: el.name,
            dept_id: el.parentId || '',
            dept_name: el.deptName || '',
            mobile: el.mobile,
            user_type: typeList[this.selectItem.prop]
          })
        });
        checkStr = checkStr.substr(0, checkStr.length - 1);
        this.formData[this.selectItem.prop] = checkStr;
        this.formData[this.selectItem.prop + '_ids'] = arrList;
      },
      /** 表单保存 */
      saveFormData() {
        let stateId = this.$parent.$parent.$parent.$parent.getStateObj(this.state).id;
        let dept_list = [];
        dept_list = dept_list.concat(this.formData.biz_user_name_ids);
        dept_list = dept_list.concat(this.formData.msg_user_name_ids);
        let evaluation_types = [];
        this.formData.test_type.map(el => {
          evaluation_types.push({
            test_type: el
          })
        });
        let param = {
          id: this.projectId,
          project_id: this.formData.project_id,
          contract_id: this.contract_id,
          multi_contract: this.contractList.length > 1 ? 'Y' : 'N',
          state: stateId,
          supplier_name: this.formData.supplier.trim(),
          supplier_unit_id: this.formData.supplier_unit_id,
          supplier_dept_id: this.formData.supplier_dept_id,
          system_name: this.formData.system_name.trim(),
          stage: this.bill_type,
          evaluation_types: evaluation_types,
          safe_level: this.formData.safe_level,
          /* apply_date: this.formData.apply_date === '' || this.formData.apply_date === null ? '' : this.appDateFormat(this.formData.apply_date, 'yyyy-mm-dd'),*/
          link_name: this.formData.project_manager_ids.length > 0 ? this.formData.project_manager_ids[0].user_id : '',
          link_phone: this.formData.link_phone.trim(),
          app_download: this.formData.app_download.trim(),
          in_net: this.formData.in_net.trim(),
          out_net: this.formData.out_net.trim(),
          server_ip: this.formData.server_ip.trim(),
          confirm_users: dept_list,
        };
        let obj = {};
        obj.params = param;
        obj.baseURL = '/itmsdrm';
        obj.serviceRoot = 'project/safeApplySave';
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
              if (this.oldState === '1') {
                this.state = '1';
              } else if (this.oldState === '7') {
                this.state = '7';
              }

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
          if (this.oldState === '1') {
            this.state = '1';
          } else if (this.oldState === '7') {
            this.state = '7';
          }
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        })
      },
      /** 验证合同是否可选 */
      checkProjectSelect(_type, _state) {
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
              // if (this.oldState === '1') {
              //   this.state = '1';
              // } else if (this.oldState === '7') {
              //   this.state = '7';
              // }
              this.$message({
                type: type,
                message: message
              })
            }
          } else {
            // if (this.oldState === '1') {
            //   this.state = '1';
            // } else if (this.oldState === '7') {
            //   this.state = '7';
            // }
            this.$message({
              type: type,
              message: message
            })
          }
        }).catch(err => {
          // if (this.oldState === '1') {
          //   this.state = '1';
          // } else if (this.oldState === '7') {
          //   this.state = '7';
          // }
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
        this.checkProjectSelect('save', '1');
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
              let state;
              if (this.oldState === '1') {
                state = '2';
                // this.state = '2';
              } else if (this.oldState === '7') {
                state = '6';
                // this.state = '6'
              }

              this.checkProjectSelect('send', state);

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

      }
    }
  }
</script>

<style scoped>
  #security_evaluation_apply_index {
    animation: rtl-drawer-in .3s 1ms;
  }

  #security_evaluation_apply_index .url_div {
    border: 1px solid #DCDFE6;
    padding-top: 20px;
    padding-right: 20px;
  }
</style>

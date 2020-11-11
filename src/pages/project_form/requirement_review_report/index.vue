<!-- 需求评审报告 edit by xyy  -->
<template>
  <div id="requirement_review_report_index">
    <div class="project_form">
      <div class="project_title">{{projectTitle}}需求评审报告</div>
      <div>
        <el-form ref="formRef" :model="formData" :rules="rules" size="small" :show-message="showMessage" label-position="right"
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
            <el-col :span="16">
              <el-form-item label="实施单位：" prop="supplier">
                <el-input v-model="formData.supplier" :disabled="isReadonly" clearable placeholder="请输入实施单位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实施单位项目经理：" prop="project_manager">
                <el-row>
                  <el-col :style="{'width':(isReadonly?'100%':'calc(100% - 30px)')}">
                    <div style="position: relative;">
                      <el-input v-model="formData.project_manager" :disabled="isReadonly" readonly placeholder="请选择实施单位项目经理"></el-input>
                      <span v-if="formData.project_manager!=''&&!isReadonly" class="clear_input_item" @click="handleUserDelete('project_manager')">
                        <span class="el-icon-circle-close"></span>
                      </span>
                    </div>

                  </el-col>
                  <el-col v-if="!isReadonly" style="width: 30px;text-align: right;">
                    <i class="el-icon-circle-plus add_user_img" @click="handleAddUsers('project_manager','实施单位项目经理',false)"></i>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="项目业务经办：">
                <el-row>
                  <el-col :style="{'width':(isReadonly?'100%':'calc(100% - 30px)')}">
                    <div style="position: relative;">
                      <el-input v-model="formData.biz_user_name" :disabled="isReadonly" readonly placeholder="请选择项目业务经办"></el-input>
                      <span v-if="formData.biz_user_name!=''&&!isReadonly" class="clear_input_item" @click="handleUserDelete('biz_user_name')">
                        <span class="el-icon-circle-close"></span>
                      </span>
                    </div>

                  </el-col>
                  <el-col v-if="!isReadonly" style="width: 30px;text-align: right;">
                    <i class="el-icon-circle-plus add_user_img" @click="handleAddUsers('biz_user_name','项目业务经办',true)"></i>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目信息经办：" prop="msg_user_name">
                <el-row>
                  <el-col :style="{'width':(isReadonly?'100%':'calc(100% - 30px)')}">
                    <div style="position: relative;">
                      <el-input v-model="formData.msg_user_name" :disabled="isReadonly" readonly placeholder="请选择项目信息经办"></el-input>
                      <span v-if="formData.msg_user_name!=''&&!isReadonly" class="clear_input_item" @click="handleUserDelete('msg_user_name')">
                        <span class="el-icon-circle-close"></span>
                      </span>
                    </div>

                  </el-col>
                  <el-col v-if="!isReadonly" style="width: 30px;text-align: right;">
                    <i class="el-icon-circle-plus add_user_img" @click="handleAddUsers('msg_user_name','项目信息经办',true)"></i>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签字日期：">
                <el-date-picker v-model="formData.sign_date" :disabled="isReadonly" type="date" placeholder="请选择签字日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="评审会议地点：" prop="meet_address">
                <el-input v-model="formData.meet_address" :disabled="isReadonly" clearable placeholder="请输入评审会议地点"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会议时间：" prop="meet_time">
                <el-date-picker v-model="formData.meet_time" :disabled="isReadonly" type="date" placeholder="请选择会议时间"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="24">
                <div class="head">评审委员：</div>
              </el-col>
            </el-row>
          </div>

          <el-row>
            <el-col :span="16">
              <el-form-item label="评委：" prop="judge_name">
                <div v-if="isReadonly&&projectType==='read'" class="is_check_item judge_name_item">
                  <span v-for="(user,i) in formData.judge_name_ids">
                    <span>{{user.dept_name}}/{{user.user_name}}</span>
                    <span v-if="user.sign==='Y'" class="el-icon-check sign_item"></span>
                    <span v-if="i!==formData.judge_name_ids.length-1">；</span>
                  </span>
                </div>
                <el-input v-else v-model="formData.judge_name" type="textarea" :rows="4" placeholder="请选择评委" :autosize="{ minRows: 4 }"
                  readonly></el-input>

              </el-form-item>
            </el-col>
            <el-col v-if="!isReadonly" style="width:30px;text-align:right;line-height: 32px;">
              <div>
                <i class="el-icon-circle-plus add_user_img" @click="handleAddUsers('judge_name','评委',true)"></i>
              </div>

            </el-col>
          </el-row>
          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="24">
                <div class="head">项目评审信息：</div>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="16">
              <el-form-item label="评审内容：" prop="review_items">
                <el-checkbox-group :disabled="isReadonly" v-model="formData.review_items" style="font-size: 13px;">
                  <el-checkbox v-for="desc in reviewContentList" :key="'desc_'+desc.id" :label="desc.id" name="review_items">{{desc.value}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item class="form_line_height_item" label="存在的问题及建议改进措施：" prop="improve_content">
                <div style="margin-bottom: 10px;">
                  <el-input :disabled="isReadonly" clearable v-model="formData.improve_content_input" placeholder="请输入存在的问题及建议改进措施"></el-input>
                </div>

              </el-form-item>
            </el-col>
            <el-col v-if="!isReadonly" :span="8" style="line-height: 30px;">
              <div style="display: flex;">
                <div style="padding:0 10px;">
                  <i class="el-icon-circle-plus add_user_img" @click="handleAddSuggest()"></i>
                </div>
                <div class="warning_item">请逐条加入建议及措施</div>
              </div>

            </el-col>
          </el-row>
          <el-row v-for="(desc,i) in formData.improve_content" :key="'content_'+i">
            <el-col :span="16">
              <el-form-item :label="(i+1)+'、'">
                <el-input v-model="desc.content_text" :disabled="isReadonly" clearable placeholder="请输入存在的问题及建议改进措施"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <span v-if="!isReadonly" class="el-icon-error add_user_img" style="line-height: 30px;margin-left: 10px;color: #F56C6C;"
                @click="handleRemoveSuggest(i)"></span>
            </el-col>
          </el-row>

          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="24">
                <div class="head">项目评审结论：</div>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item style="text-align: center;" :label-width="'0'">
                <el-radio-group v-model="formData.is_judge" size="small" disabled>
                  <el-radio label="1">同意通过评审</el-radio>
                  <el-radio label="0">不同意通过评审</el-radio>
                </el-radio-group>

              </el-form-item>
            </el-col>
          </el-row>
          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="24">
                <div class="head">工作改进：</div>
              </el-col>
            </el-row>
          </div>

          <el-row>
            <el-col :span="24">
              <el-form-item prop="is_check" style="text-align: center;" :label-width="'0'">
                <el-radio-group v-model="formData.is_check" size="mini" :disabled="isReadonly">
                  <el-radio label="Y">验证</el-radio>
                  <el-radio label="N">不验证</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="formData.is_check==='Y'&&formData.check_msg!==''">
            <el-col :span="16">
              <el-form-item label="改进措施验证：">
                <div class="is_check_item" :class="{'judge_name_item':isReadonly}" v-html="formData.check_msg"></div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="formData.is_check==='Y'">
            <el-col :span="16">
              <el-form-item label="验证人员：" prop="check_users">
                <div v-if="isReadonly&&projectType==='read'" class="is_check_item judge_name_item">
                  <span v-for="(user,i) in formData.check_users_ids">
                    <span>{{user.dept_name}}/{{user.user_name}}</span>
                    <span v-if="user.sign==='Y'" class="el-icon-check sign_item"></span>
                    <span v-if="i!==formData.check_users_ids.length-1">；</span>
                  </span>
                </div>
                <el-input v-else v-model="formData.check_users" type="textarea" :rows="4" placeholder="请选择验证人员"
                  readonly :disabled="isReadonly" :autosize="{ minRows: 4 }"></el-input>
              </el-form-item>
            </el-col>
            <el-col v-if="!isReadonly" style="width:30px;text-align:right;line-height: 32px;">
              <div>
                <i class="el-icon-circle-plus add_user_img" @click="handleAddUsers('check_users','验证人员',true)"></i>
              </div>

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
              <el-form-item label="需求分析报告：" prop="file_list_attach1">
                <div v-if="isReadonly&&projectType==='read'">
                  <span class="attach_no_data" v-if="formData.file_list_attach1.length===0">暂无</span>
                  <div v-else>
                    <div class="download_file_name" v-for="(item,i) in formData.file_list_attach1" :key="'attach_'+i">
                      <span class="el-icon-document"></span>
                      <a :href="item.url">{{item.name}}</a>
                    </div>
                  </div>
                </div>
                <el-upload v-else ref="upload_attach1" :disabled="isReadonly" class="upload-demo" :action="uploadUrl"
                  :auto-upload="false" :show-file-list="false" :on-change="handleChangeFile1" multiple :name="'FILE_CONTENTS'"
                  :data="{bizId:projectId,uploadType:'doc11',prop:'attach1'}">
                  <div slot="trigger">
                    <el-button size="small" :disabled="isReadonly" type="primary" style="width: 200px;">选取文件</el-button>
                    <!--<el-button size="small" :disabled="isReadonly" type="primary" style="width: 100px;">上传</el-button>-->
                  </div>

                  <div class="file_list">
                    <el-row class="file_list_row" v-for="(file,i) in formData.file_list_attach1" :key="'file_'+i">
                      <el-col class="file_list_name">
                        <span class="el-icon-document"></span>
                        <a :href="file.url">{{file.file_name}}</a>
                      </el-col>
                      <el-col v-if="!isReadonly" class="file_list_delete">
                        <el-button size="mini" type="text" @click="handleDeleteFile(file.id,file.file_name,'attach1')">
                          <span class="el-icon-close"></span>
                        </el-button>

                      </el-col>
                    </el-row>
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="其它文档：">
                <div v-if="isReadonly&&projectType==='read'">
                  <span class="attach_no_data" v-if="formData.file_list_attach3.length===0">暂无</span>
                  <div v-else>
                    <div class="download_file_name" v-for="(item,i) in formData.file_list_attach3" :key="'attach_'+i">
                      <span class="el-icon-document"></span>
                      <a :href="item.url">{{item.name}}</a>
                    </div>
                  </div>
                </div>
                <el-upload v-else ref="upload_attach3" :disabled="isReadonly" class="upload-demo" :action="uploadUrl"
                  :auto-upload="false" :show-file-list="false" :on-change="handleChangeFile3" multiple :name="'FILE_CONTENTS'"
                  :data="{bizId:projectId,uploadType:'doc08',prop:'attach3'}">
                  <div slot="trigger">
                    <el-button size="small" :disabled="isReadonly" type="primary" style="width: 200px;">选取文件</el-button>
                    <!--<el-button size="small" :disabled="isReadonly" type="primary" style="width: 100px;">上传</el-button>-->
                  </div>

                  <div class="file_list">
                    <el-row class="file_list_row" v-for="(file,i) in formData.file_list_attach3" :key="'file_'+i">
                      <el-col class="file_list_name">
                        <span class="el-icon-document"></span>
                        <a :href="file.url">{{file.file_name}}</a>
                      </el-col>
                      <el-col v-if="!isReadonly" class="file_list_delete">
                        <el-button size="mini" type="text" @click="handleDeleteFile(file.id,file.file_name,'attach3')">
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
                <el-button v-if="isReadonly" v-show="state==='2'||state==='3'||state==='4'" type="primary" @click="handleApprove">催办评审人审批
                </el-button>
                <div v-else>
                  <el-button v-if="state==='1'" type="primary" @click="onSubmit">保存</el-button>
                  <el-button v-if="state==='1'" type="primary" @click="handleSendToJudge">发起评审</el-button>
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
      <dept_user_index ref="deptUserRef" :isCheckBtn="isCheckBtn" :filterUserList="formData.filterUserList"></dept_user_index>

    </el-dialog>

  </div>
</template>

<script>
  import dept_user_index from "../../project_dept_user/dept_user_index"

  export default {
    name: "requirement_review_report_index",
    props: ['projectId', 'projectType', 'billCode'],
    components: {
      dept_user_index
    },
    data() {
      return {
        /** 校验信息 */
        showMessage: false,

        /** 合同信息 */
        contract_id: '', //合同id
        contractSelect: false, //
        contractList: [], //合同列表

        reviewContentList: [], //项目评审信息-评审内容
        projectOptions: [], //项目列表

        state: '1', //表单状态
        projectTitle: '', //表单抬头
        projectCode: '', //表单编码
        isReadonly: false, //projectType为read时为 true，（add,read）为 false

        /** 人员选择弹框 */
        dialogTitle: '', //dialog标题
        dialogVisible: false,
        selectItem: {}, //dialog弹框时赋值
        isCheckBtn: false, //是否多选
        checkedList: [], //已选人员

        uploadUrl: 'itmsdrm/transfer/business/file/upload', //上传url

        /** 表单参数 */
        formData: {
          /** 项目基本信息 */
          project_id: '', //项目id
          project_id1: '', //项目id
          project_name: '', //项目名称
          project_code: '', //项目编码

          contract_id: '', //合同id
          contract_code: '', //合同编码
          contract_name: '', //合同名称

          supplier: '', //实施单位
          project_manager: '', //项目经理人员
          project_manager_ids: [], //项目经理人员数组
          biz_user_name: '', //项目业务经办人
          biz_user_name_ids: [], //项目业务经办人员数组
          msg_user_name: '', //项目信息经办人
          msg_user_name_ids: [], //项目信息经办人员数组
          sign_date: '', //签字日期
          meet_time: '', //会议时间
          meet_address: '', //评审会议地点

          filterUserList: [], //选择人员需过滤的人员

          /** 评审委员 */
          judge_name: '', //评委
          judge_name_ids: [], //评委人员数组

          /** 项目评审信息 */
          review_items: [], //选择的评审内容
          improve_content_input: '', //存在的问题及建议改进措施
          improve_content: [], //存在的问题及建议改进措施数组

          is_judge: '1', //项目评审结论

          /** 工作改进 */
          is_check: 'N', //是否需要验证
          check_users: '', //验证人员
          check_users_ids: [], //验证人员数组
          check_msg: '', //改进措施验证

          /** 附件 */
          file_list_attach1: [], //附件-需求分析报告
          file_list_attach3: [], //附件-其它文档
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
          biz_user_name: [{
            required: true,
            message: '请选择项目业务经办',
          }],
          msg_user_name: [{
            required: true,
            message: '请选择项目信息经办',
          }],
          sign_date: [{
            required: true,
            message: '请选择签字日期',
          }],
          meet_time: [{
            required: true,
            message: '请选择会议时间',
          }],
          meet_address: [{
            required: true,
            message: '请输入评审会议地点',
          }],
          judge_name: [{
            required: true,
            message: '请选择评委',
          }],
          review_items: [{
            required: true,
            message: '请选择评审内容',
          }],
          improve_content: [{
            required: true,
            message: '请输入存在的问题及建议改进措施',
          }],
          check_users: [{
            required: true,
            message: '请选择验证人员',
          }],
          file_list_attach1: [{
            required: true,
            message: '请上传需求分析报告',
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
          return
        }
        this.formData.biz_user_name = '';
        this.formData.biz_user_name_ids = [];
        this.formData.msg_user_name = '';
        this.formData.msg_user_name_ids = [];
        this.formData.project_manager = '';
        this.formData.project_manager_ids = [];

        this.contractList.map(el => {
          if (el.id === val) {
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

      if (this.projectType === 'add' || this.projectType === 'edit') {
        this.isReadonly = false;
      } else {
        this.isReadonly = true;
      }
      this.getProjectListData();
      this.getDictList('REQ_REVIEW_CONTENT');

      if (this.projectType !== 'add') {
        this.getFormData();
      }
    },
    methods: {
      /** 数据字典 评审内容 */
      getDictList(_type) {
        this.getSysDictList(_type, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            if (_type === 'REQ_REVIEW_CONTENT') {
              this.reviewContentList = result_data.data_list[0].category_data;
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
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
      /** 根据表单id 获取表单信息 */
      getFormData() {
        let obj = {};
        obj.params = {
          id: this.projectId
        };
        // obj.serviceRoot = 'project/requireReviewByIdQuery';
        obj.serviceRoot = 'project/requireReviewQuery';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;
            // console.log(result_data)
            this.state = result_data.state;
            this.formData.project_id = result_data.project_id;
            this.formData.project_name = result_data.project_name;
            this.formData.project_code = result_data.project_code;
            if (this.formData.project_code === '' || this.formData.project_code === null) {
              this.formData.project_id1 = ''
            } else {
              this.formData.project_id1 = result_data.project_id;
            }
            this.formData.supplier = result_data.supplier_name;
            this.formData.project_manager = result_data.project_manager.length === 0 ? '' : result_data.project_manager[
              0].user_name;
            this.formData.project_manager_ids = result_data.project_manager.length === 0 ? [] : result_data.project_manager;
            this.formData.meet_address = result_data.meet_address;
            this.formData.sign_date = result_data.sign_date;
            this.formData.meet_time = result_data.meet_time;
            this.formData.is_check = result_data.need_check;
            this.formData.contract_code = result_data.contract_code;
            this.formData.contract_name = result_data.contract_name;
            this.multi_contract = result_data.multi_contract;

            this.getContractList(this.formData.project_id, 'search', result_data.contract_id);

            result_data.items.map(el => {
              this.formData.review_items.push(el.content_id)
            });

            this.formData.improve_content = result_data.improve_content;

            this.formData.biz_user_name = '';
            this.formData.biz_user_name_ids = [];
            result_data.biz_user.map(el => {
              this.formData.biz_user_name += el.user_name + '；';
              this.formData.biz_user_name_ids.push(el)
            });
            if (this.formData.biz_user_name.length > 0) {
              this.formData.biz_user_name = this.formData.biz_user_name.substring(0, this.formData.biz_user_name.length -
                1);
            }

            this.formData.msg_user_name = '';
            this.formData.msg_user_name_ids = [];
            result_data.msg_user.map(el => {
              this.formData.msg_user_name += el.user_name + '；';
              this.formData.msg_user_name_ids.push(el);
            });
            if (this.formData.msg_user_name.length > 0) {
              this.formData.msg_user_name = this.formData.msg_user_name.substring(0, this.formData.msg_user_name.length -
                1);
            }

            this.formData.judge_name = '';
            this.formData.judge_name_ids = [];
            result_data.users.map(el => {
              this.formData.judge_name += (el.dept_name ? (el.dept_name + '/') : '') + el.user_name + '；';
              this.formData.judge_name_ids.push(el);
            });
            if (this.formData.judge_name.length > 0) {
              this.formData.judge_name = this.formData.judge_name.substring(0, this.formData.judge_name.length - 1);
            }

            this.formData.check_msg = '';
            this.formData.check_users = '';
            this.formData.check_users_ids = [];
            result_data.check_users.map((el, i) => {
              el.check_msg = el.check_msg || '';

              if (el.check_msg !== '') {
                this.formData.check_msg += el.check_msg + '<br>';
              }

              this.formData.check_users += (el.dept_name ? (el.dept_name + '/') : '') + el.user_name + '；';
              this.formData.check_users_ids.push(el);
            });
            if (this.formData.check_users.length > 0) {
              this.formData.check_users = this.formData.check_users.substring(0, this.formData.check_users.length -
                1);
            }

            result_data.attach.map(el => {
              el.name = el.file_name;
              el.status = 'success';
              if (el.upload_type === 'doc11') {
                el.prop = 'attach1';
                this.formData['file_list_' + el.prop].push(el);
              } else if (el.upload_type === 'doc08') {
                el.prop = 'attach3';
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
      /** 文件上传 需求分析报告*/
      handleChangeFile1(file, fileList) {
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
            uploadType: 'doc11',
            prop: 'attach1'
          });
          this.$refs.upload_attach1.clearFiles();
        }).catch(() => {
          this.$refs.upload_attach1.clearFiles();
        })
      },
      /** 文件上传 其它文档*/
      handleChangeFile3(file, fileList) {
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
            prop: 'attach3'
          });
          this.$refs.upload_attach3.clearFiles();
        }).catch(() => {
          this.$refs.upload_attach3.clearFiles();
        })
      },
      /** 文件上传接口 */
      handleSaveFile(params) {
        this.$refs.formRef.clearValidate();
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
        });

      },
      /** 增加存在的问题及建议改进措施 */
      handleAddSuggest() {
        let content = this.formData.improve_content_input.trim();
        if (content === '') {
          this.$message({
            message: '请输入存在的问题及建议改进措施',
            type: 'warning'
          });
          return
        }
        this.formData.improve_content.push({
          content_text: content
        });
        this.formData.improve_content_input = '';
      },
      /** 删除存在的问题及建议改进措施 */
      handleRemoveSuggest(i) {
        this.formData.improve_content.splice(i, 1);
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
        if (prop === 'judge_name') {
          this.formData.filterUserList = [];
          this.formData.filterUserList = this.formData.filterUserList.concat(this.formData.biz_user_name_ids);
          this.formData.filterUserList = this.formData.filterUserList.concat(this.formData.msg_user_name_ids);
        } else if (prop === 'biz_user_name' || prop === 'msg_user_name') {
          this.formData.filterUserList = [];
          this.formData.filterUserList = this.formData.filterUserList.concat(this.formData.judge_name_ids);
        } else {
          this.formData.filterUserList = [];
        }
        this.isCheckBtn = checkItem;
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
        } else {
          checkList.map((el, i) => {
            if (this.selectItem.prop === 'project_manager' || this.selectItem.prop === 'biz_user_name' || this.selectItem
              .prop === 'msg_user_name') {
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
          if (checkStr.length > 0) {
            checkStr = checkStr.substr(0, checkStr.length - 1);
          }
        }

        this.formData[this.selectItem.prop] = checkStr;
        this.formData[this.selectItem.prop + '_ids'] = arrList;
      },
      /** 表单保存 */
      saveFormData() {
        this.formData.filterUserList = [];
        this.formData.filterUserList = this.formData.filterUserList.concat(this.formData.biz_user_name_ids);
        this.formData.filterUserList = this.formData.filterUserList.concat(this.formData.msg_user_name_ids);
        if (this.formData.filterUserList.length > 0) {
          let filter = false;
          this.formData.filterUserList.map(el => {
            this.formData.judge_name_ids.map(ele => {
              if (el.user_id === ele.user_id) {
                filter = true;
                return;
              }
            })
          });

          if (filter) {
            this.$message({
              type: 'warning',
              message: '经办人不允许被选为评委，请重新选择评委！'
            })
            return
          }

        }

        let stateId = this.$parent.$parent.$parent.getStateObj(this.state).id;

        if (this.formData.is_check === 'N') {
          this.formData.check_users = '';
          this.formData.check_users_ids = []
        }

        let improve_content = [];
        this.formData.improve_content.map(el => {
          if (el.content_text.trim() !== '') {
            improve_content.push(el);
          }
        });

        let param = {
          id: this.projectId,
          is_check: this.formData.is_check,
          improve_content: improve_content,
          check_user: this.formData.check_users_ids,
          supplier: this.formData.supplier.trim(),
          project_id: this.formData.project_id,
          project_manager: this.formData.project_manager_ids.length === 0 ? '' : this.formData.project_manager_ids[0]
            .user_id,
          biz_user_name: this.formData.biz_user_name_ids,
          msg_user_name: this.formData.msg_user_name_ids,
          meet_address: this.formData.meet_address.trim(),
          meet_time: this.formData.meet_time === '' || this.formData.meet_time === null ? '' : this.appDateFormat(
            this.formData.meet_time, 'yyyy-mm-dd'),
          users: this.formData.judge_name_ids,
          state: stateId,
          sign_date: this.formData.sign_date === '' || this.formData.sign_date === null ? '' : this.appDateFormat(
            this.formData.sign_date, 'yyyy-mm-dd'),
          contents: [],
          contract_id: this.contract_id,
          multi_contract: this.contractList.length > 1 ? 'Y' : 'N'
        };
        this.formData.review_items.map(el => {
          param.contents.push({
            content_id: el
          })
        });

        let obj = {};
        obj.params = param;
        obj.baseURL = '/itmsdrm';
        obj.serviceRoot = 'project/requireReviewSave';
        this.$parent.$parent.$parent.toolLoading();
        this.requestDrmService(obj, this).then(res => {
          let message = '';
          let type = 'info';
          this.$parent.$parent.$parent.toolLoadClose();
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
            this.state = '1';
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
              this.$message({
                type: type,
                message: message
              })
            }
          } else {
            this.$message({
              type: type,
              message: message
            })
          }
        }).catch(err => {
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
          this.$parent.$parent.$parent.handleApprove(this.projectId, this.billCode);
        }).catch(() => {});
      },
    }
  }
</script>

<style scoped>

</style>

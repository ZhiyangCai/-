<!-- 质保期验收申请单 edit by xyy  -->
<template>
  <div id="safety_acceptance_application_report">
    <div class="project_form">
      <div class="project_title">{{ projectTitle }}质保期验收申请单</div>
      <div>
        <el-form
          :model="formData"
          :rules="rules"
          ref="formRef"
          size="small"
          :show-message="showMessage"
          label-position="right"
          label-width="160px"
        >
          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="12">
                <div class="head">项目基本信息：</div>
              </el-col>
              <el-col :span="12" class="head_right">{{ projectCode }}</el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="16">
              <el-form-item label="项目名称：" prop="project_name">
                <el-input
                  v-if="isReadonly"
                  v-model="formData.project_name"
                  :disabled="isReadonly"
                ></el-input>
                <el-select
                  v-else
                  v-model="formData.project_id"
                  filterable
                  placeholder="请选择项目名称"
                  @change="handleSelectProject"
                  style="width: 100%;"
                  :disabled="isReadonly"
                >
                  <el-option
                    v-for="(item, i) in projectOptions"
                    :key="item.project_id + i"
                    :label="item.project_name"
                    :value="item.project_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目编号：" prop="project_code">
                <el-input
                  v-if="isReadonly"
                  v-model="formData.project_code"
                  :disabled="isReadonly"
                ></el-input>
                <el-select
                  v-else
                  v-model="formData.project_id1"
                  filterable
                  placeholder="请选择项目编号"
                  @change="handleSelectProject"
                  style="width: 100%;"
                  :disabled="isReadonly"
                >
                  <el-option
                    v-for="(item, i) in projectOptions"
                    :key="item.project_id + i"
                    :label="item.project_code"
                    :value="item.project_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="合同名称：" prop="contract_id">
                <el-select
                  v-model="formData.contract_id"
                  filterable
                  placeholder="请选择合同名称"
                  style="width: 100%;"
                  :disabled="isReadonly"
                  @change="handleSelectContract"
                >
                  <el-option
                    v-for="(item, i) in contractList"
                    :key="item.id + i"
                    :label="item.contract_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号：" prop="contract_code">
                <el-input
                  v-model="formData.contract_code"
                  :disabled="isReadonly"
                  readonly
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="实施单位：" prop="supplier">
                <el-input
                  v-model="formData.supplier"
                  clearable
                  placeholder="请输入实施单位"
                  :disabled="isReadonly"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目类别：" prop="sys_type">
                <el-select
                  v-model="formData.sys_type"
                  filterable
                  placeholder="请选择项目类别"
                  style="width: 100%;"
                  :disabled="isReadonly"
                  @change="handleAcceptChange"
                >
                  <el-option
                    v-for="item in acceptList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="实施单位项目经理：" prop="project_manager">
                <el-row>
                  <el-col
                    :style="{
                      width: isReadonly ? '100%' : 'calc(100% - 30px)'
                    }"
                  >
                    <div style="position: relative;">
                      <el-input
                        v-model="formData.project_manager"
                        :disabled="isReadonly"
                        readonly
                        placeholder="请选择项目经理"
                      ></el-input>
                      <span
                        v-if="formData.project_manager != '' && !isReadonly"
                        class="clear_input_item"
                        @click="handleUserDelete('project_manager')"
                      >
                        <span class="el-icon-circle-close"></span>
                      </span>
                    </div>
                  </el-col>
                  <el-col
                    v-if="!isReadonly"
                    style="width: 30px;text-align: right;"
                  >
                    <i
                      class="el-icon-circle-plus add_user_img"
                      @click="
                        handleAddUsers('project_manager', '项目经理', false)
                      "
                    ></i>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="验收时间：" prop="project_start_date">
                <el-date-picker
                  v-model="formData.project_start_date"
                  type="date"
                  placeholder="请选择验收时间"
                  :disabled="isReadonly"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="质保到期时间：" prop="project_end_date">
                <el-date-picker
                  v-model="formData.project_end_date"
                  type="date"
                  placeholder="请选择质保到期时间"
                  :disabled="isReadonly"
                ></el-date-picker>
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
            <el-col
              :style="{ width: isReadonly ? '100%' : 'calc(100% - 40px)' }"
            >
              <el-form-item label="项目业务经办人：" label-width="250px">
                <div
                  v-if="isReadonly & (projectType === 'read')"
                  class="sign_div"
                >
                  <span v-for="(dept_name, i) in formData.biz_user_name_ids">
                    <span>
                      <span
                        >{{ dept_name.dept_name }}/{{
                          dept_name.user_name
                        }}</span
                      >
                      <span
                        v-if="dept_name.sign === 'Y'"
                        class="el-icon-check sign_item"
                      ></span>
                      <span v-if="i !== formData.biz_user_name_ids.length - 1"
                        >；</span
                      >
                    </span>
                  </span>
                </div>
                <div v-else style="position: relative;">
                  <el-input
                    v-model="formData.biz_user_name"
                    :disabled="isReadonly"
                    readonly
                    placeholder="请选择项目业务经办人"
                  ></el-input>
                  <span
                    v-if="formData.biz_user_name != '' && !isReadonly"
                    class="clear_input_item"
                    @click="handleUserDelete('biz_user_name')"
                  >
                    <span class="el-icon-circle-close"></span>
                  </span>
                </div>
              </el-form-item>
            </el-col>
            <el-col
              v-if="!isReadonly"
              style="width:40px;padding-left: 10px;line-height: 32px;"
            >
              <i
                class="el-icon-circle-plus add_user_img"
                @click="handleAddUsers('biz_user_name', '项目业务经办', true)"
              ></i>
            </el-col>

            <el-col
              :style="{ width: isReadonly ? '100%' : 'calc(100% - 40px)' }"
            >
              <el-form-item
                label="项目信息经办人："
                prop="msg_user_name"
                label-width="250px"
              >
                <div
                  v-if="isReadonly & (projectType === 'read')"
                  class="sign_div"
                >
                  <span v-for="(dept_name, i) in formData.msg_user_name_ids">
                    <span
                      >{{ dept_name.dept_name }}/{{ dept_name.user_name }}</span
                    >
                    <span
                      v-if="dept_name.sign === 'Y'"
                      class="el-icon-check sign_item"
                    ></span>
                    <span v-if="i !== formData.msg_user_name_ids.length - 1"
                      >；</span
                    >
                  </span>
                </div>
                <div v-else style="position: relative;">
                  <el-input
                    v-model="formData.msg_user_name"
                    :disabled="isReadonly"
                    readonly
                    placeholder="请选择项目信息经办人"
                  ></el-input>
                  <span
                    v-if="formData.msg_user_name != '' && !isReadonly"
                    class="clear_input_item"
                    @click="handleUserDelete('msg_user_name')"
                  >
                    <span class="el-icon-circle-close"></span>
                  </span>
                </div>
              </el-form-item>
            </el-col>
            <el-col
              v-if="!isReadonly"
              style="width: 40px;padding-left: 10px;line-height: 32px;"
            >
              <i
                class="el-icon-circle-plus add_user_img"
                @click="
                  handleAddUsers('msg_user_name', '项目信息经办人', false)
                "
              ></i>
            </el-col>
          </el-row>

          <el-row v-if="isReadonly && projectType === 'read'">
            <el-col
              :span="24"
              v-for="(item, i) in itemList"
              :key="item.code + i"
            >
              <el-form-item
                :label="item.text + '：'"
                label-width="250px"
                required
              >
                <div class="sign_div">
                  <span v-for="(user, ii) in item.user_list">
                    <span>
                      <span>{{ user.dept_name }}/{{ user.user_name }}</span>
                      <span
                        v-if="user.sign === 'Y'"
                        class="el-icon-check sign_item"
                      ></span>
                      <span v-if="ii != item.user_list.length - 1">；</span>
                    </span>
                  </span>
                </div>
              </el-form-item>
              <el-form-item :label="item.text + '意见：'" label-width="250px">
                <div class="sign_suggest_div">
                  <div v-for="(user, ii) in item.user_list">
                    <div
                      class="sign_suggest_msg"
                      v-if="user.sign === 'Y'"
                      v-show="user.message !== ''"
                    >
                      <span>{{ user.user_name }}：</span>
                      <span>{{ user.message }}</span>
                      <span class="sign_date_padding"
                        >签字日期：{{
                          user.sign_date | filterDateFormat(".")
                        }}</span
                      >
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="24">
                <div class="head">系统功能清单：</div>
              </el-col>
            </el-row>
          </div>
          <el-row class="operator_manual">
            <el-col class="manual_label">操作说明：</el-col>
            <el-col class="manual_item1">
              <el-row>
                <el-col class="manual_item_col1">
                  <div class="manual_item_circle">1</div>
                </el-col>
                <el-col class="manual_item_col2">
                  <div class="manual_item_step">步骤一</div>
                  <div>选择签字模版</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="manual_item2">
              <el-row>
                <el-col class="manual_item_col1">
                  <div class="manual_item_circle">2</div>
                </el-col>
                <el-col class="manual_item_col2">
                  <div class="manual_item_step">步骤二</div>
                  <div>新增功能清单（注：最多至第三级菜单）</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="manual_item3">
              <el-row>
                <el-col class="manual_item_col1">
                  <div class="manual_item_circle">3</div>
                </el-col>
                <el-col class="manual_item_col2">
                  <div class="manual_item_step">步骤三</div>
                  <div>为各功能模块选择确认用户</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="manual_item1">
              <el-row>
                <el-col class="manual_item_col1">
                  <div class="manual_item_circle">4</div>
                </el-col>
                <el-col class="manual_item_col2">
                  <div class="manual_item_step">步骤四</div>
                  <div>推送到相关人员确认</div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row style="padding-top: 30px;">
            <el-col :span="18">
              <el-form-item label="" prop="sign_type">
                <label slot="label">
                  <span>签字模版：</span>
                  <el-button size="small" type="text" @click="handleShowModel">
                    <span
                      class="el-icon-question"
                      style="color: #999999;font-size: 16px;"
                    ></span>
                  </el-button>
                </label>

                <el-radio-group
                  v-model="formData.sign_type"
                  style="padding-top: 3px;"
                  :disabled="isReadonly"
                >
                  <el-radio label="2">汇总签字</el-radio>
                  <el-radio label="1">分功能签字</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col
              v-if="!isReadonly"
              :span="6"
              style="text-align: right;padding-top:8px;"
            >
              <el-button
                size="mini"
                type="primary"
                @click="handleAddUsers('func_list', '系统功能清单', true)"
                >选择确认人
              </el-button>
            </el-col>
          </el-row>

          <div class="func_list_item">
            <!-- 分开签字 start-->
            <div v-if="formData.sign_type === '1'">
              <el-table
                v-if="isReadonly"
                size="small"
                :data="treeData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                default-expand-all
                border
                :row-class-name="tableRowClassName"
                :tree-props="{
                  children: 'func_list',
                  hasChildren: 'hasChildren'
                }"
              >
                <el-table-column
                  label="功能清单"
                  header-align="center"
                  prop="func_name"
                  width="300"
                >
                  <template slot-scope="scope">
                    <div>{{ scope.row.func_name }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="用户确认签字" header-align="center">
                  <template slot-scope="scope">
                    <div>
                      <div
                        v-for="(user, i) in scope.row.users"
                        style="float: left;display: flex;"
                      >
                        <span>{{ user.dept_name }}/</span>
                        <span>{{ user.user_name }}</span>
                        <span
                          v-if="user.sign === 'Y'"
                          class="el-icon-check sign_item"
                        ></span>
                        <span v-if="i !== scope.row.users.length - 1">；</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <div v-else style="border: 1px solid #EBEEF5;">
                <div class="custom-tree-node custom-tree-node-head">
                  <div style="width: 60px;">
                    <el-checkbox
                      v-model="checkedAll"
                      :indeterminate="isIndeterminate"
                      @change="handleCheckAll"
                    ></el-checkbox>
                  </div>
                  <div style="width: 290px;">
                    <span class="rule_item" style="padding-right: 5px;">*</span
                    ><span>功能清单</span>
                  </div>
                  <div style="width: calc(100% - 510px)">
                    <span class="rule_item" style="padding-right: 5px;">*</span
                    ><span>确认人员</span>
                  </div>
                  <div style="width: 150px;padding-left: 10px;">操作</div>
                </div>
                <el-tree
                  ref="treeRef"
                  :data="treeData"
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                  :props="defaultProps"
                  @check-change="handleCheckChange"
                >
                  <div class="custom-tree-node" slot-scope="{ node, data }">
                    <div
                      :style="{ width: 300 - 18 * (data.level - 1) + 'px' }"
                      style="padding: 0 5px;"
                    >
                      <el-input
                        size="mini"
                        v-model="data.func_name"
                        :placeholder="data.placeholder"
                        clearable
                      ></el-input>
                    </div>
                    <div
                      class="custom-tree-node-middle"
                      :style="{
                        width:
                          'calc(100% - ' + (462 - 18 * (data.level - 1)) + 'px'
                      }"
                    >
                      <div
                        v-for="(user, i) in data.users"
                        :key="user.user_id + i"
                        style="float: left;display: flex;"
                      >
                        <span>{{ user.dept_name }}/</span>
                        <span>{{ user.user_name }}</span>
                        <!--                        <el-button size="mini" type="text" @click="handleDeleteTreeUser(data.users,i)">-->
                        <!--                          <span class="el-icon-close"></span>-->
                        <!--                        </el-button>-->
                        <span v-if="i !== data.users.length - 1">；</span>
                      </div>
                    </div>
                    <div style="width: 150px;padding-left: 10px;">
                      <el-button
                        type="text"
                        size="mini"
                        @click="handleAddTreeData('1', data)"
                        >新增同级</el-button
                      >
                      <el-button
                        type="text"
                        size="mini"
                        v-if="data.level !== 3"
                        @click="handleAddTreeData('2', data)"
                        >新增子级
                      </el-button>
                      <el-button
                        type="text"
                        size="mini"
                        @click="handleDeleteTreeData(data, node)"
                        v-if="
                          (!data.func_list || data.func_list.length === 0) &&
                            treeLength !== 1
                        "
                      >
                        <span class="rule_item">删除</span>
                      </el-button>
                    </div>
                  </div>
                </el-tree>
              </div>
            </div>
            <!-- 分开签字 end-->

            <!-- 汇总签字 start-->
            <div v-if="formData.sign_type === '2'">
              <el-table
                v-if="isReadonly"
                size="small"
                :data="treeData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                default-expand-all
                border
                :row-class-name="tableRowClassName"
                :span-method="objectSpanMethod"
                :tree-props="{
                  children: 'func_list',
                  hasChildren: 'hasChildren'
                }"
              >
                <el-table-column
                  label="功能清单"
                  header-align="center"
                  width="300"
                >
                  <template slot-scope="scope">
                    <div>{{ scope.row.func_name }}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="用户确认签字"
                  header-align="center"
                  class-name="sign_merge_item"
                >
                  <template slot-scope="scope">
                    <div>
                      <div
                        v-for="(user, i) in formData.func_user_list"
                        style="float: left;display: flex;"
                      >
                        <span>{{ user.dept_name }}/</span>
                        <span>{{ user.user_name }}</span>
                        <span
                          v-if="user.sign === 'Y'"
                          class="el-icon-check sign_item"
                        ></span>
                        <span v-if="i !== formData.func_user_list.length - 1"
                          >；</span
                        >
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <el-table
                v-else
                ref="multipleTable"
                size="small"
                :data="treeData"
                row-key="id"
                default-expand-all
                border
                style="width: 100%;margin-bottom: 20px;"
                :row-class-name="tableRowClassName"
                :span-method="objectSpanMethod"
                :tree-props="{
                  children: 'func_list',
                  hasChildren: 'hasChildren'
                }"
              >
                <el-table-column header-align="center" width="350">
                  <template slot="header" slot-scope="scope">
                    <div>
                      <span class="rule_item">*</span>
                      <span>功能清单</span>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <div style="width: 100%;">
                      <el-input
                        v-model="scope.row.func_name"
                        size="mini"
                        :placeholder="scope.row.placeholder"
                        clearable
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  label="用户确认签字"
                  header-align="center"
                  class-name="sign_merge_item"
                >
                  <template slot="header" slot-scope="scope">
                    <div>
                      <span class="rule_item">*</span>
                      <span>确认人员</span>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <div>
                      <div
                        v-for="(user, i) in formData.func_user_list"
                        style="float: left;display: flex;"
                      >
                        <span>{{ user.dept_name }}/</span>
                        <span>{{ user.user_name }}</span>
                        <!--                        <el-button size="mini" type="text" @click="handleDeleteTreeUser(formData.func_user_list,i)">-->
                        <!--                          <span class="el-icon-close"></span>-->
                        <!--                        </el-button>-->
                        <span v-if="i !== formData.func_user_list.length - 1"
                          >；</span
                        >
                      </div>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  v-if="!isReadonly"
                  label="操作"
                  width="200px"
                  header-align="center"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="mini"
                      @click="handleAddTreeData('1', scope.row)"
                      >新增同级</el-button
                    >
                    <el-button
                      type="text"
                      size="mini"
                      @click="handleAddTreeData('2', scope.row)"
                      v-if="scope.row.level !== 3"
                    >
                      新增子级
                    </el-button>
                    <el-button
                      size="mini"
                      type="text"
                      v-if="
                        (!scope.row.func_list ||
                          scope.row.func_list.length === 0) &&
                          treeLength !== 1
                      "
                      @click="handleDeleteTreeData(scope.row)"
                      ><span class="rule_item">删除</span>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 汇总签字 end-->
          </div>

          <!-- 附件 -->
          <div class="project_basic_msg">
            <el-row class="project_row_title">
              <el-col :span="24">
                <div class="head">附件：</div>
              </el-col>
            </el-row>
          </div>

          <el-row>
            <el-col :span="16">
              <el-form-item label="质保期验收报告：">
                <div v-if="isReadonly && projectType === 'read'">
                  <span
                    class="attach_no_data"
                    v-if="formData.file_list_attach.length === 0"
                    >暂无</span
                  >
                  <div v-else>
                    <div
                      class="download_file_name"
                      v-for="(item, i) in formData.file_list_attach"
                      :key="'attach_' + i"
                    >
                      <span class="el-icon-document"></span>
                      <a :href="item.url">{{ item.name }}</a>
                    </div>
                  </div>
                </div>
                <el-upload
                  v-else
                  ref="upload_attach"
                  :disabled="isReadonly"
                  class="upload-demo"
                  :action="uploadUrl"
                  :auto-upload="false"
                  :show-file-list="false"
                  :name="'FILE_CONTENTS'"
                  multiple
                  :data="{
                    bizId: projectId,
                    uploadType: 'doc05',
                    prop: 'attach'
                  }"
                  :on-change="handleChangeFile"
                >
                  <div slot="trigger">
                    <el-button
                      size="small"
                      :disabled="isReadonly"
                      type="primary"
                      style="width: 200px;"
                      >选取文件</el-button
                    >
                  </div>

                  <div class="file_list">
                    <el-row
                      class="file_list_row"
                      v-for="(file, i) in formData.file_list_attach"
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
                            handleDeleteFile(file.id, file.file_name, 'attach')
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

            <el-col :span="16">
              <el-form-item label="其他文档：">
                <div v-if="isReadonly && projectType === 'read'">
                  <span
                    class="attach_no_data"
                    v-if="formData.file_list_attach1.length === 0"
                    >暂无</span
                  >
                  <div v-else>
                    <div
                      class="download_file_name"
                      v-for="(item, i) in formData.file_list_attach1"
                      :key="'attach_' + i"
                    >
                      <span class="el-icon-document"></span>
                      <a :href="item.url">{{ item.name }}</a>
                    </div>
                  </div>
                </div>
                <el-upload
                  v-else
                  ref="upload_attach1"
                  :disabled="isReadonly"
                  class="upload-demo"
                  :action="uploadUrl"
                  :auto-upload="false"
                  :show-file-list="false"
                  :name="'FILE_CONTENTS'"
                  multiple
                  :data="{
                    bizId: projectId,
                    uploadType: 'doc08',
                    prop: 'attach1'
                  }"
                  :on-change="handleChangeFile1"
                >
                  <div slot="trigger">
                    <el-button
                      size="small"
                      :disabled="isReadonly"
                      type="primary"
                      style="width: 200px;"
                      >选取文件</el-button
                    >
                  </div>

                  <div class="file_list">
                    <el-row
                      class="file_list_row"
                      v-for="(file, i) in formData.file_list_attach1"
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
                            handleDeleteFile(file.id, file.file_name, 'attach1')
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

          <!-- 底部按钮 -->
          <el-row
            style="border-top: 2px solid #E4E7ED;padding-top: 20px;margin-top: 20px;"
          >
            <el-col :span="24">
              <el-form-item style="text-align: center;" label-width="0">
                <el-button
                  v-if="isReadonly"
                  v-show="state === '2' || state === '3' || state === '4'"
                  type="primary"
                  @click="handleApprove"
                  >催办确认人审批
                </el-button>
                <div v-else>
                  <el-button
                    type="primary"
                    v-if="state === '1'"
                    @click="onSubmit"
                    >保存</el-button
                  >
                  <el-button
                    type="primary"
                    v-if="state === '1'"
                    @click="handleSendToJudge"
                    >推送到确认人</el-button
                  >
                </div>
              </el-form-item>
            </el-col>
          </el-row>
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

    <el-dialog
      class="no_footer"
      :visible.sync="dialogVisible1"
      width="90%"
      :modal-append-to-body="false"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div slot="title">
        <el-row>
          <el-col style="width: calc(100% - 100px);padding-left: 15px;"
            >签字模板示例</el-col
          >
          <el-col style="width: 100px;text-align: right;padding-right: 15px;">
            <span
              class="el-dialog__close el-icon el-icon-close active"
              style="padding:5px;font-weight: bold;"
              @click="dialogVisible1 = false"
            ></span>
          </el-col>
        </el-row>
      </div>
      <div style="height: 100%;overflow: auto">
        <el-row style="padding: 10px;">
          <el-col
            :span="12"
            style="padding: 0 10px;border-right: 1px solid lightgray;"
          >
            <img src="@/assets/imgs/sign_model_head1.png" style="width: 100%" />
            <img src="@/assets/imgs/sign_model1.png" style="width: 100%" />
          </el-col>
          <el-col :span="12" style="padding: 0 10px;">
            <img src="@/assets/imgs/sign_model_head2.png" style="width: 100%" />
            <img src="@/assets/imgs/sign_model2.png" style="width: 100%;" />
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dept_user_index from "../../project_dept_user/dept_user_index";

export default {
  name: "safety_acceptance_application_report",
  props: ["projectId", "projectType", "billCode"],
  components: {
    dept_user_index
  },
  data() {
    let rowId1 = this.$parent.$parent.$parent.randomString();
    return {
      /** 校验信息 */
      showMessage: false,

      /** 签字模版 弹框 */
      dialogVisible1: false,

      /** 树状图 */
      checkedAll: false, //分功能签字-是否全选
      isIndeterminate: false, //分功能签字-多选框
      treeData: [
        {
          //功能清单树状data
          id: rowId1,
          pid: "0", //父级id
          func_name: "", //树状label
          level: 1, //树状等级
          placeholder: "请输入一级功能名称",
          users: [], //确认人
          func_list: [] //树状参数children
        }
      ],
      defaultProps: {
        children: "func_list",
        label: "func_name"
      },
      treeLength: 1, //树状菜单长度

      /** 合同信息 */
      contractSelect: false,
      contract_id: "", //合同id
      contractList: [], //项目基本信息 - 合同列表

      projectOptions: [], //项目基本信息 - 项目列表
      acceptList: [], //项目基本信息 - 项目类别

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

      uploadUrl: "itmsdrm/transfer/api/dsm/file/upload", //上传url

      itemList: [
        //四项交接人
        {
          text: "可编译源代码完整性验证确认人",
          code: "1"
        },
        {
          text: "源代码功能性验证确认人",
          code: "2"
        },
        {
          text: "软件运维交接确认人",
          code: "3"
        },
        {
          text: "系统运维交接确认人",
          code: "4"
        }
      ],
      /** 表单参数 */
      formData: {
        /** 项目基本信息 */
        project_id: "", //项目id
        project_id1: "", //项目id
        project_name: "", //项目名称
        project_code: "", //项目编码

        contract_id: "", //合同id
        contract_name: "", //合同名称
        contract_code: "", //合同编码

        supplier: "", //实施单位
        sys_type: "", //项目类别
        project_manager: "", //实施单位项目经理
        project_manager_ids: [], //实施单位项目经理数组
        project_start_date: "", //验收时间
        project_end_date: "", //质保到期时间

        sign_type: "2", //签字模板，默认 汇总签字=2 (分功能签字=1)
        func_user_list: [], //汇总签字人员数组

        biz_user_name: "", //项目业务经办
        biz_user_name_ids: [], //项目业务经办数组
        msg_user_name: "", //项目信息经办
        msg_user_name_ids: [], //项目信息经办数组

        /** 附件 */
        file_list_attach: [], //附件 - 质保期验收报告
        file_list_attach1: [], //附件 - 其它文档
        upload_list_attach: [] //正在选择的上传文件
      },
      /** 表单校验 */
      rules: {
        project_name: [
          {
            required: true,
            message: "请选择项目名称"
          }
        ],
        project_code: [
          {
            required: true,
            message: "请选择项目编号"
          }
        ],
        contract_id: [
          {
            required: true,
            message: "请选择合同名称"
          }
        ],
        contract_code: [
          {
            required: true,
            message: "请在合同名称重新选择合同"
          }
        ],
        supplier: [
          {
            required: true,
            message: "请输入实施单位"
          }
        ],
        project_manager: [
          {
            required: true,
            message: "请选择项目经理"
          }
        ],
        sys_type: [
          {
            required: true,
            message: "请选择项目类别"
          }
        ],
        biz_user_name: [
          {
            required: true,
            message: "请选择项目业务经办人"
          }
        ],
        msg_user_name: [
          {
            required: true,
            message: "请选择项目信息经办人"
          }
        ],
        project_end_date: [
          {
            required: true,
            message: "请选择质保到期时间"
          }
        ],
        project_start_date: [
          {
            required: true,
            message: "请选择验收时间"
          }
        ],
        sign_type: [
          {
            required: true,
            message: "请选择签字模板"
          }
        ]
      }
    };
  },
  watch: {
    /** 监控 表单状态 */
    state(val) {
      if (val !== "1") {
        this.isReadonly = true;
      }
    },
    /** 监控 合同id */
    contract_id(val) {
      this.formData.contract_id = val;
      if (this.contractSelect) {
        return;
      }
      this.formData.project_manager = "";
      this.formData.project_manager_ids = [];

      this.formData.biz_user_name = "";
      this.formData.biz_user_name_ids = [];
      this.formData.msg_user_name = "";
      this.formData.msg_user_name_ids = [];

      this.contractList.map(el => {
        if (el.id === val) {
          this.formData.contract_code = el.contract_code;
          this.formData.contract_name = el.contract_name;
          this.formData.supplier = el.supplier_name || "";

          this.formData.biz_user_name_ids = el.biz_users;
          this.formData.msg_user_name_ids = el.info_users;

          if (el.pm_users.length === 1) {
            this.formData.project_manager_ids = el.pm_users;
            el.pm_users.map((el, i) => {
              this.formData.project_manager += el.user_name;
            });
          }

          el.biz_users.map(ele => {
            this.formData.biz_user_name += ele.user_name + "；";
          });

          if (this.formData.biz_user_name_ids.length > 0) {
            this.formData.biz_user_name = this.formData.biz_user_name.substring(
              0,
              this.formData.biz_user_name.length - 1
            );
          }

          el.info_users.map(ele => {
            this.formData.msg_user_name += ele.user_name + "；";
          });

          if (this.formData.msg_user_name_ids.length > 0) {
            this.formData.msg_user_name = this.formData.msg_user_name.substring(
              0,
              this.formData.msg_user_name.length - 1
            );
          }
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
        return;
      }

      this.getTreeData();
    }
  },
  mounted() {
    this.projectTitle = this.$parent.$parent.$parent.projectTitle;
    this.formData.sys_type = "1";

    if (this.projectType === "add" || this.projectType === "edit") {
      this.isReadonly = false;
    } else {
      this.isReadonly = true;
    }
    this.acceptList = this.$parent.$parent.$parent.acceptList;
    this.getProjectListData();
    if (this.projectType !== "add") {
      this.getFormData();
    }
  },
  methods: {
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
    /** 项目基本信息-项目选择 change */
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
    /** 项目基本信息-合同选择 change */
    handleSelectContract(val) {
      this.contractSelect = false;
      this.contract_id = val;
    },
    /** 项目基本信息-获取合同列表  */
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
    /** 项目基本信息-项目类别 change  */
    handleAcceptChange(val) {
      if (val === "1") {
        this.projectCode = "XX3-JL15";
      } else if (val === "2") {
        this.projectCode = "XX3-JL16";
      }
    },
    /** 项目基本信息-根据合同获取默认功能清单  */
    getTreeData() {
      let obj = {};
      obj.params = {
        contract_id: this.contract_id,
        project_id: this.formData.project_id
      };
      obj.serviceRoot = "project/userConfirmedSignFunc";
      this.requestDrmService(obj, this).then(res => {
        if (res.resultCode === "0") {
          const result_data = JSON.parse(res.resultData);
          result_data.func_list = result_data.func_list || [];
          this.treeData = [];

          if (result_data.func_list.length === 0) {
            let rowId1 = this.$parent.$parent.$parent.randomString();
            const treeOne = [
              {
                id: rowId1,
                pid: "0",
                func_name: "",
                level: 1,
                users: [],
                func_list: [],
                placeholder: "请输入一级功能名称"
              }
            ];
            this.treeData = this.treeData.concat(treeOne);
          } else {
            this.treeData = this.treeData.concat(result_data.func_list);
          }
          this.treeLength = this.getTreeDataMenu().length;
        }
      });
    },
    /** 根据表单id 获取表单信息 */
    getFormData() {
      let obj = {};
      obj.params = {
        id: this.projectId
      };
      obj.serviceRoot = "project/qualityAssuranceQuery";
      obj.baseURL = "/itmsdrm";
      this.requestDrmService(obj, this)
        .then(res => {
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData).map;
            this.state = result_data.state;
            this.formData.project_id = result_data.project_id;
            this.formData.project_code = result_data.project_code;
            if (
              this.formData.project_code === "" ||
              this.formData.project_code === null
            ) {
              this.formData.project_id1 = "";
            } else {
              this.formData.project_id1 = result_data.project_id;
            }
            this.formData.project_name = result_data.project_name;
            this.formData.supplier = result_data.supplier;
            this.formData.project_start_date = result_data.project_start_date;
            this.formData.project_end_date = result_data.project_end_date;
            this.formData.project_manager = result_data.project_manager_name;
            this.formData.project_manager_ids = [
              {
                user_name: result_data.project_manager_name,
                user_id: result_data.project_manager_id
              }
            ];

            this.formData.sys_type = result_data.sys_type;

            this.formData.contract_code = result_data.contract_code;
            this.formData.contract_name = result_data.contract_name;
            this.multi_contract = result_data.multi_contract;

            this.formData.sign_type = result_data.sign_type;

            this.getContractList(
              this.formData.project_id,
              "search",
              result_data.contract_id
            );

            if (result_data.sign_type === "2") {
              this.formData.func_user_list = result_data.confirm_users.filter(
                item => item.user_type === "4"
              );
            }

            let checkUser = result_data.confirm_users.filter(
              item => item.user_type === "3"
            );

            this.itemList.map((el, i) => {
              el.user_list =
                checkUser.filter(item => item.code === el.code) || [];
            });

            this.formData.biz_user_name = "";
            this.formData.biz_user_name_ids = [];
            this.formData.msg_user_name = "";
            this.formData.msg_user_name_ids = [];
            result_data.confirm_users.map(el => {
              if (el.user_type === "1") {
                //信息经办人
                this.formData.msg_user_name +=
                  (el.dept_name ? el.dept_name + "/" : "") +
                  el.user_name +
                  "；";
                this.formData.msg_user_name_ids.push(el);
              } else if (el.user_type === "2") {
                //业务经办人
                this.formData.biz_user_name +=
                  (el.dept_name ? el.dept_name + "/" : "") +
                  el.user_name +
                  "；";
                this.formData.biz_user_name_ids.push(el);
              }
            });

            if (this.formData.biz_user_name.length > 0) {
              this.formData.biz_user_name = this.formData.biz_user_name.substring(
                0,
                this.formData.biz_user_name.length - 1
              );
            }

            if (this.formData.msg_user_name.length > 0) {
              this.formData.msg_user_name = this.formData.msg_user_name.substring(
                0,
                this.formData.msg_user_name.length - 1
              );
            }

            this.formData.file_list_attach = [];
            this.formData.file_list_attach1 = [];

            result_data.attach.map(el => {
              el.name = el.file_name;
              el.status = "success";
              if (el.upload_type === "doc05") {
                el.prop = "attach";
                this.formData["file_list_" + el.prop].push(el);
              } else if (el.upload_type === "doc08") {
                el.prop = "attach1";
                this.formData["file_list_" + el.prop].push(el);
              }
            });

            this.treeData = result_data.func_list;
            this.treeLength = this.getTreeDataMenu().length;

            if (result_data.func_list.length === 0) {
              let rowId1 = this.$parent.$parent.$parent.randomString();
              this.treeData = [
                {
                  id: rowId1,
                  pid: "0",
                  func_name: "",
                  level: 1,
                  placeholder: "请输入一级功能名称",
                  users: [],
                  func_list: []
                }
              ];
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /** 功能清单-操作-删除按钮 */
    handleDeleteTreeUser(data, index) {
      data.splice(index, 1);
    },
    /** 签字模板-显示 */
    handleShowModel() {
      this.dialogVisible1 = true;
    },
    /** 功能清单 - table - 一级菜单背景置蓝 */
    tableRowClassName({ row, rowIndex }) {
      if (row.level === 1) {
        return "first_level_cell";
      } else {
        return "";
      }
    },
    /** 功能清单 - table - 合并单元格 */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex === 0) {
          return {
            rowspan: this.treeLength,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    /** 功能清单 - tree - 全选 */
    handleCheckAll(val) {
      let checkedKeys = [];
      this.treeData.map(el => {
        if (el.level === 1) {
          checkedKeys.push(el.id);
        }
      });
      if (val) {
        this.$refs.treeRef.setCheckedKeys(checkedKeys);
      } else {
        this.$refs.treeRef.setCheckedKeys([]);
      }
    },
    /** 功能清单 - tree - 多选 */
    handleCheckChange(data, node, leafNode) {
      let checkNodeData = this.$refs.treeRef.getCheckedNodes();
      let checkedLength = 0;
      let treeNodeLength = 0;
      checkNodeData.map(el => {
        if (el.level === 1) {
          checkedLength++;
        }
      });

      this.treeData.map(el => {
        if (el.level === 1) {
          treeNodeLength++;
        }
      });
      let checkAll = checkedLength === treeNodeLength;
      this.checkedAll = checkAll;
      this.isIndeterminate =
        checkedLength > 0 && checkedLength < treeNodeLength;
    },
    /** 功能清单 - tree - 删除 **/
    handleDeleteTreeData(rowData, node) {
      if (this.formData.sign_type === "1") {
        const parent = node.parent;
        const children = parent.data.func_list || parent.data;
        const index = children.findIndex(d => d.id === rowData.id);
        children.splice(index, 1);
      } else if (this.formData.sign_type === "2") {
        this.treeDataDelete(this.treeData, rowData);
      }

      this.treeLength = this.getTreeDataMenu().length;
    },
    /** 递归删除某个功能菜单 **/
    treeDataDelete(treeArr, rowData) {
      if (treeArr.length > 0) {
        treeArr.map((el, i) => {
          if (el.id === rowData.id) {
            treeArr.splice(i, 1);
          } else if (el.func_list) {
            this.treeDataDelete(el.func_list, rowData);
          }
        });
      }
    },
    /** 功能菜单 - 操作 -新增按钮 _type='1'新增同级 _type='2'新增子级 **/
    handleAddTreeData(_type, rowData) {
      if (rowData.func_name.trim() === "") {
        this.$message({
          type: "warning",
          message: "请先输入功能名称"
        });
        return;
      }
      let rowId = this.$parent.$parent.$parent.randomString();
      let params = {
        func_name: "",
        id: rowId,
        users: []
      };

      if (_type === "1") {
        //新增同级
        if (rowData.pid) {
          params.pid = rowData.pid;
        }

        params.level = rowData.level;
        if (rowData.level === 1) {
          params.pid = "0";
          params.func_list = [];
          params.placeholder = "请输入一级功能名称";
          this.treeData.push(params);
        } else {
          if (rowData.level === 2) {
            params.func_list = [];
            params.placeholder = "请输入二级功能名称";
          } else if (rowData.level === 3) {
            params.placeholder = "请输入三级功能名称";
          }

          this.treeData.map(el => {
            if (el.id === rowData.pid) {
              el.func_list = el.func_list || [];
              el.func_list.push(params);
              return;
            }
            if (el.func_list) {
              el.func_list.map(ele => {
                if (ele.id === rowData.pid) {
                  ele.func_list = ele.func_list || [];
                  ele.func_list.push(params);
                  return;
                }
              });
            }
          });
        }
      } else if (_type === "2") {
        //新增子级
        params.pid = rowData.id;
        params.level = rowData.level + 1;

        if (params.level === 2) {
          params.func_list = [];
          params.placeholder = "请输入二级功能名称";
        } else if (params.level === 3) {
          params.placeholder = "请输入三级功能名称";
        }
        if (!rowData.func_list) {
          rowData.func_list = [];
        }
        rowData.func_list.push(params);
      }
      this.treeLength = this.getTreeDataMenu().length;
    },
    /** 功能菜单 tree 数组将子级转换到一级**/
    getTreeDataMenu() {
      let result = [];
      result = result.concat(this.treeData);
      this.treeData.map(el => {
        if (el.func_list) {
          result = result.concat(el.func_list);
          el.func_list.map(ele => {
            if (ele.func_list) {
              result = result.concat(ele.func_list);
            }
          });
        }
      });
      return result;
    },
    /** 附件 - 文件删除 */
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
    /** 附件 - 文件上传 质保期验收报告 */
    handleChangeFile(file, fileList) {
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
            uploadType: "doc05",
            prop: "attach"
          });
          this.$refs.upload_attach.clearFiles();
        })
        .catch(() => {
          this.$refs.upload_attach.clearFiles();
        });
    },
    /** 附件 - 文件上传 其他文档 */
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
            uploadType: "doc08",
            prop: "attach1"
          });
          this.$refs.upload_attach1.clearFiles();
        })
        .catch(() => {
          this.$refs.upload_attach1.clearFiles();
        });
    },
    /** 附件 - 文件上传接口 */
    handleSaveFile(params) {
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
    /** 附件 - 文件上传成功后赋值 */
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
    },
    /** 选择人员弹框 */
    handleAddUsers(prop, name, checkItem = true) {
      this.checkedList = [];
      if (prop === "func_list") {
        //功能清单选人
        let warning = false;
        if (this.formData.sign_type === "1") {
          //分开签字
          let checkedUser = this.$refs.treeRef.getCheckedNodes();
          let func_users = [];
          if (checkedUser.length === 0) {
            this.$message({
              type: "warning",
              message: "请至少选择一个功能清单"
            });
            return;
          }
          checkedUser.map(el => {
            if (el.func_name.trim() === "") {
              warning = true;
              return;
            }
            if (el.users) {
              el.users.map(ele => {
                func_users.push({
                  user_id: ele.user_id,
                  user_name: ele.user_name || "",
                  dept_id: ele.dept_id || "",
                  dept_name: ele.dept_name || ""
                });
              });
            }
          });
          if (warning) {
            this.$message({
              type: "warning",
              message: "请先输入功能名称"
            });
            return;
          }
          let res = new Map();
          this.checkedList = func_users.filter(
            arr => !res.has(arr.user_id) && res.set(arr.user_id, 1)
          );
        } else if (this.formData.sign_type === "2") {
          //汇总签字
          let func_arr = this.getTreeDataMenu();
          warning =
            func_arr.filter(item => item.func_name.trim() === "").length > 0;

          if (warning) {
            this.$message({
              type: "warning",
              message: "请先输入功能名称"
            });
            return;
          }

          this.checkedList = this.formData.func_user_list;
        }
      } else {
        this.checkedList = this.formData[prop + "_ids"];
      }
      this.selectItem.name = name;
      this.selectItem.prop = prop;
      this.isCheckBtn = checkItem;
      this.dialogTitle = name + "人员选择";

      this.dialogVisible = true;
    },
    /** 选择人员确认 */
    cascadeSubmit(checkList, isCheck) {
      this.dialogVisible = false;
      let checkStr = "";
      let arrList = [];
      if (checkList.length === 0) {
        this.formData[this.selectItem.prop] = checkStr;
        this.formData[this.selectItem.prop + "_ids"] = arrList;
      } else {
        checkList.map((el, i) => {
          if (this.selectItem.prop === "project_manager") {
            checkStr += el.name + "；";
          } else {
            checkStr += el.deptName + "/" + el.name + "；";
          }
          arrList.push({
            user_id: el.userId,
            user_name: el.name,
            dept_id: el.parentId || "",
            dept_name: el.deptName || ""
          });
        });
        checkStr = checkStr.substr(0, checkStr.length - 1);
      }

      if (this.selectItem.prop === "func_list") {
        if (this.formData.sign_type === "1") {
          //分开签字
          let checkedUser = this.$refs.treeRef.getCheckedNodes();
          checkedUser.map(el => {
            el.users = arrList;
          });
          this.$refs.treeRef.setCheckedKeys([]);
        } else if (this.formData.sign_type === "2") {
          //汇总签字
          this.formData.func_user_list = arrList;
        }
      } else {
        this.formData[this.selectItem.prop] = checkStr;
        this.formData[this.selectItem.prop + "_ids"] = arrList;
      }
    },
    /** 表单保存 */
    saveFormData() {
      let stateId = this.$parent.$parent.$parent.getStateObj(this.state).id;
      let param = {
        id: this.projectId,
        project_id: this.formData.project_id,
        contract_id: this.contract_id,
        multi_contract: this.contractList.length > 1 ? "Y" : "N",
        state: stateId,
        supplier: this.formData.supplier.trim(),
        sys_type: this.formData.sys_type,
        project_end_date:
          this.formData.project_end_date === "" ||
          this.formData.project_end_date === null
            ? ""
            : this.appDateFormat(this.formData.project_end_date, "yyyy-mm-dd"),
        project_start_date:
          this.formData.project_start_date === "" ||
          this.formData.project_start_date === null
            ? ""
            : this.appDateFormat(
                this.formData.project_start_date,
                "yyyy-mm-dd"
              ),
        project_manager_id:
          this.formData.project_manager_ids.length === 0
            ? ""
            : this.formData.project_manager_ids[0].user_id,
        biz_user: this.formData.biz_user_name_ids,
        msg_user: this.formData.msg_user_name_ids,
        sign_type: this.formData.sign_type,
        confirm_user:
          this.formData.sign_type === "1" ? [] : this.formData.func_user_list,
        func_list: this.treeData
      };

      let obj = {};
      obj.params = param;
      obj.baseURL = "/itmsdrm";
      obj.serviceRoot = "project/qualityAssuranceSave";
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
    /** 保存 按钮 */
    onSubmit() {
      this.showMessage = false;
      // this.state = '1';
      this.$refs.formRef.clearValidate();
      this.checkProjectSelect("1");
    },
    /** 推送至审核人员 按钮 */
    handleSendToJudge() {
      this.showMessage = true;
      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (this.formData.project_manager_ids.length > 1) {
            this.$message({
              type: "warning",
              message: "实施单位项目经理只能为一人，请重新选择"
            });
            return;
          }
          if (this.formData.msg_user_name_ids.length > 1) {
            this.$message({
              type: "warning",
              message: "信息经办人只能为一人，请重新选择"
            });
            return;
          }
          if (this.treeData.length === 0) {
            this.$message({
              type: "warning",
              message: "请先填写功能清单并选择确认人员"
            });
            return;
          }
          let func_arr = this.getTreeDataMenu();
          let warning =
            func_arr.filter(item => item.func_name.trim() === "").length > 0;
          if (warning) {
            this.$message({
              type: "warning",
              message: "请先填写功能清单并选择确认人员"
            });
            return;
          }
          if (this.formData.sign_type === "1") {
            //分开
            let no_user_type = false;
            this.treeData.map(el => {
              if (el.func_list && el.func_list.length > 0) {
                el.func_list.map(ele => {
                  if (ele.func_list && ele.func_list.length > 0) {
                    ele.func_list.map(elee => {
                      if (elee.users && elee.users.length === 0) {
                        no_user_type = true;
                        return;
                      }
                    });
                  } else {
                    if (ele.users && ele.users.length === 0) {
                      no_user_type = true;
                      return;
                    }
                  }
                });
              } else {
                if (el.users && el.users.length === 0) {
                  no_user_type = true;
                  return;
                }
              }
            });

            if (no_user_type) {
              this.$message({
                type: "warning",
                message: "请选择功能清单确认人员"
              });
              return;
            }
          } else if (this.formData.sign_type === "2") {
            //汇总
            if (this.formData.func_user_list.length === 0) {
              this.$message({
                type: "warning",
                message: "请选择功能清单确认人员"
              });
              return;
            }
          }

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
    /** 催办 按钮 */
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
#safety_acceptance_application_report {
  height: 100%;
  overflow: auto;
}

#safety_acceptance_application_report .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

#safety_acceptance_application_report .operator_manual {
  background-color: #f2f2f2;
  color: #606266;
}

#safety_acceptance_application_report .manual_label {
  width: 130px;
  padding-left: 20px;
  line-height: 100px;
}

#safety_acceptance_application_report .manual_item1 {
  width: calc(25% - 80px);
  padding-top: 35px;
}

#safety_acceptance_application_report .manual_item2 {
  width: calc(25% + 60px);
  padding-top: 35px;
}

#safety_acceptance_application_report .manual_item3 {
  width: calc(25% - 50px);
  padding-top: 35px;
}

#safety_acceptance_application_report .manual_item_col1 {
  width: 40px;
}

#safety_acceptance_application_report .manual_item_col2 {
  width: calc(100% - 40px);
  font-size: 13px;
}

#safety_acceptance_application_report .manual_item_circle {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  background-color: #7fea8c;
  color: white;
  font-size: 18px;
}

#safety_acceptance_application_report .manual_item_step {
  font-size: 16px;
  line-height: 30px;
}
</style>

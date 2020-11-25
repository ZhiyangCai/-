<!-- 人员选择组件 edit by xuyy -->
<template>
  <div id="dept_user_index">
    <div class="dept_user_main">
      <el-row style="height: 100%">
        <el-col :class="{ dept_show: panelShow, dept_hide: !panelShow }">
          <div
            class="panel_header"
            style="display: flex;"
            :style="{ height: panelShow ? '30px' : 'calc(100% - 3px)' }"
          >
            <div v-show="panelShow" style="width: calc(100% - 30px)">
              组织机构
            </div>
            <div
              style="text-align: right;width: 30px;cursor: pointer;"
              @click="handlePanel"
            >
              <span
                :class="{
                  'el-icon-d-arrow-left': panelShow,
                  'el-icon-d-arrow-right': !panelShow
                }"
                style="font-weight: bold;color:#409EFF;"
              ></span>
            </div>
          </div>

          <div class="panel_main" v-show="panelShow">
            <el-tree
              ref="tree"
              :props="props"
              :data="treeData"
              :load="lazyLoad"
              :lazy="props.lazy"
              node-key="id"
              highlight-current
              @node-click="handleCheck"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <i v-if="node.isLeaf" class="icon iconfont icon-filetexto"></i>
                <span v-else>
                  <i
                    v-if="node.expanded"
                    class="icon iconfont icon-folderopen"
                  ></i>
                  <i v-else class="icon iconfont icon-folder"></i>
                </span>
                {{ node.label }}
              </span>
            </el-tree>
          </div>
        </el-col>

        <el-col
          :class="{ user_dept_show: panelShow, user_dept_hide: !panelShow }"
          style="padding: 0 5px;"
        >
          <div class="panel_header search_bar">
            <span>姓名或工号：</span>
            <div
              style="width: calc(100% - 260px);min-width: 150px;padding-right: 5px;"
            >
              <el-input
                v-model="searchInput"
                size="mini"
                placeholder="请输入姓名或工号"
                clearable
                @clear="handleClear"
              ></el-input>
            </div>
            <el-button size="mini" @click="handleSearch">
              <span class="icon iconfont icon-icon-GIS_tongjichaxun"></span>查询
            </el-button>
            <el-button size="mini" type="primary" @click="cascadeSubmit"
              ><span class="icon iconfont icon-floppy-o"></span>保存
            </el-button>
            <el-button size="mini" @click="handleClose"
              ><span class="icon iconfont icon-close"></span>关闭</el-button
            >
          </div>
          <div class="panel_main">
            <el-table
              v-loading="loading"
              size="mini"
              :data="tableData1"
              border
              style="width: 100%"
              :height="tableHeight"
            >
              <el-table-column
                show-overflow-tooltip
                prop="userId"
                label="人员工号"
                width="80"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="name"
                label="人员名称"
                width="80"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="deptName"
                label="所属部门"
              ></el-table-column>
              <el-table-column label="添加" width="60" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleUserAdd(scope.row)"
                  >
                    <span
                      class="icon iconfont icon-V"
                      style="font-size: 13px;"
                    ></span
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>

        <el-col class="select_user">
          <div class="panel_header">已选人员</div>
          <div class="panel_main">
            <el-table
              size="mini"
              :data="tableData2"
              border
              style="width: 100%"
              :height="tableHeight"
            >
              <el-table-column
                show-overflow-tooltip
                type="index"
                width="40"
                align="center"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="userId"
                label="人员工号"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="name"
                label="人员名称"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="deptName"
                label="所属部门"
              ></el-table-column>
              <el-table-column label="移除" width="60" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleUserRemove(scope.row)"
                  >
                    <span
                      class="icon iconfont icon-close"
                      style="color: red;"
                    ></span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "dept_user_index",
  props: ["isCheckBtn", "filterUserList"],
  data() {
    return {
      panelShow: true, //组织结构panel显示状态 true 显示 false 隐藏

      searchInput: "", //搜索条件  姓名或工号
      loading: false, //接口加载状态 true 加载中 ，false 加载完

      dept_id: "", //部门id
      id: "20420000", //部门id，默认为20420000

      tableData1: [], //查询到的人员
      tableData2: [], //已选人员
      tableHeight: window.innerHeight * 0.8 - 80, //table 高度
      props: {
        //树状菜单属性
        value: "id",
        label: "text",
        isLeaf: "isLeaf",
        lazy: true
      },
      treeData: [], //树状菜单 data
      firstResolve: "" //第一次树状菜单 懒加载的resolve
    };
  },
  mounted() {
    this.setTable();
    window.onresize = () => {
      this.tableHeightChange();
    };
  },
  methods: {
    /** table 高度设置 */
    tableHeightChange() {
      this.tableHeight = window.innerHeight * 0.8 - 80;
    },
    /** 组织结构 panel 显示/隐藏 事件 */
    handlePanel() {
      this.panelShow = !this.panelShow;
    },
    /** 添加 事件 */
    handleUserAdd(rowData) {
      if (this.filterUserList) {
        if (this.filterUserList.length > 0) {
          let filter = false;
          this.filterUserList.map(el => {
            if (el.user_id === rowData.userId) {
              filter = true;
            }
          });
          if (filter) {
            this.$message({
              type: "warning",
              message: "经办人不允许被选为评委，请重新选择！"
            });
            return;
          }
        }
      }
      if (this.isCheckBtn) {
        //多选
        let exist = false;
        this.tableData2.map(el => {
          if (el.userId === rowData.userId) {
            exist = true;
          }
        });
        if (!exist) {
          this.tableData2.unshift(rowData);
        }
      } else {
        //单选
        this.tableData2 = [];
        this.tableData2.push(rowData);
      }
    },
    /** 已选人员 移除 事件 */
    handleUserRemove(rowData) {
      this.tableData2.map((el, i) => {
        if (el.userId === rowData.userId) {
          this.tableData2.splice(i, 1);
        }
      });
    },
    /** 已选人员 赋值 */
    setTable() {
      this.searchInput = "";
      this.tableData1 = [];
      this.dept_id = "";
      let tableList = this.$parent.$parent.checkedList;
      this.tableData2 = [];
      tableList.map(el => {
        this.tableData2.push({
          userId: el.user_id,
          name: el.user_name,
          deptName: el.dept_name || "",
          parentId: el.dept_id || ""
        });
      });
    },
    /** 组织结构 node-click 获取组织机构下人员 */
    handleCheck(data, nodes, node) {
      if (this.dept_id === data.id) {
        return;
      }
      this.tableData1 = [];
      this.dept_id = data.id;
      this.getUserTable();
    },
    /** tree 懒加载 */
    lazyLoad(node, resolve) {
      if (node.level === 0) {
        this.firstResolve = resolve;
        this.getDeptUserTree(resolve);
      } else {
        if (node.isLeaf) {
          resolve([]);
        } else {
          this.id = node.data.id;
          this.getDeptUserTree(resolve);
        }
      }
    },
    /** 搜索条件 清空 */
    handleClear() {
      this.getUserTable();
    },
    /** 搜索条件 查询 */
    handleSearch() {
      this.getUserTable();
    },
    /** 获取用户信息 */
    getUserTable() {
      if (this.searchInput.trim() === "" && this.dept_id === "") {
        return;
      }
      this.loading = true;
      let obj = {};
      //obj.serviceRoot = "project/findUserByText";
      obj.serviceRoot = "prodsm/WorkLetter/WorkLetterFindUserByText";
      obj.params = {
        // id: this.dept_id,
        // text: this.searchInput.trim()
        data: {
          row: [{ id: this.dept_id, text: this.searchInput.trim() }]
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
      obj.baseURL = "/itmsdrm";
      this.tableData1 = [];
      this.requestDrmService(obj, this)
        .then(res => {
          this.loading = false;
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData);
            this.tableData1 = result_data.users;
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message({
            type: "error",
            message: "获取数据失败"
          });
          console.log(err);
        });
    },
    /** 获取组织结构 */
    getDeptUserTree(resolve, _type) {
      this.loading = true;
      let obj = {};
      //obj.serviceRoot = "project/data_tree";
      obj.serviceRoot = "prodsm/WorkLetter/WorkLetterDeptTree";
      obj.params = {
        // id: this.id,
        // text: this.searchInput
        data: {
          row: [{ id: this.id }]
        },
        head: {
          msg_code: "WorkLetterDeptTree",
          msg_id: "WorkLetterDeptTree",
          request_time: "",
          source_sys: "prodsm",
          service_class: "WorkLetter",
          target_sys: "MOBILE",
          user_id: "admin",
          user_key: "admin"
        }
      };
      obj.baseURL = "/itmsdrm";
      console.log("我传递的参数：------", obj.params);
      this.requestDrmService(obj, this)
        .then(res => {
          this.loading = false;
          if (res.resultCode === "0") {
            let result_data = JSON.parse(res.resultData);
            if (_type) {
              this.treeData = result_data.content;
              return;
            }
            console.log(
              "组织机构树:----" + JSON.stringify(JSON.parse(res.resultData))
            );
            resolve(result_data.content);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message({
            type: "error",
            message: "获取数据失败"
          });
          console.log(err);
        });
    },
    /** 关闭人员选择窗口 */
    handleClose() {
      this.$parent.$parent.dialogVisible = false;
    },
    /** 人员选择 保存 按钮事件*/
    cascadeSubmit() {
      this.$parent.$parent.cascadeSubmit(this.tableData2, this.isCheckBtn);
    }
  }
};
</script>

<style scoped>
#dept_user_index {
  height: 100%;
}

#dept_user_index .dept_user_main {
  height: 100%;
}

#dept_user_index .dept_show {
  padding-left: 1px;
  width: 25%;
  height: 100%;
}

#dept_user_index .dept_hide {
  padding-left: 1px;
  width: 30px;
  height: 100%;
}

#dept_user_index .user_dept_show {
  width: 40%;
  height: 100%;
}

#dept_user_index .user_dept_hide {
  width: calc(65% - 30px);
  height: 100%;
}

#dept_user_index .select_user {
  padding-right: 1px;
  width: 35%;
  height: 100%;
}

#dept_user_index .panel_header {
  line-height: 30px;
  border: 1px solid #dcdfe6;
  font-size: 13px;
  border-radius: 3px;
  background: #f7f7f7;
  padding: 0 5px;
  height: 30px;
  font-weight: 700;
  color: #575765;
}

#dept_user_index .search_bar {
  display: flex;
  min-width: 400px;
}

#dept_user_index .panel_main {
  border: 1px solid #dcdfe6;
  height: calc(100% - 35px);
  overflow: auto;
}

#dept_user_index .custom-tree-node {
  font-size: 12px;
}

#dept_user_index .custom-tree-node i {
  font-size: 14px;
}
</style>

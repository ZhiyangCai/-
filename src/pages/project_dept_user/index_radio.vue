<template>
  <div id="project_dept_user_radio">
    <el-row style="line-height: 40px;padding: 0 50px;">
      <el-col style="width: calc(100% - 80px);">
        <el-input v-model="searchInput" size="mini" placeholder="请输入手机号、人员名称或工号" clearable></el-input>
      </el-col>
      <el-col style="width: 80px;text-align: right;">
        <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
      </el-col>
    </el-row>

    <el-cascader-panel class="dept_user" ref="cascadeRef" v-model="selectList" :options="options"
                       :props="props"></el-cascader-panel>
  </div>
</template>

<script>
  export default {
    name: "project_dept_user_radio",
    props: ['isCheckBtn', 'num'],
    data() {
      let that = this;
      return {
        userCode: this.GLOBAL.userCode,
        dept_name: '',
        dept_code: '',
        id: '20420000',
        props: {
          multiple: false,
          value: 'id',
          label: 'text',
          lazy: true,
          lazyLoad(node, resolve) {
            that.resolve = resolve;
            if (!that.isSearch) {
              if (node.level != 0 && node.data.type === "dept") {
                that.id = node.value;
                that.getDeptUserTree(node.level, resolve);
              } else {
                resolve([])
              }
            }
          }
        },
        options: [],
        selectList: '',
        checkList: [],
        searchInput: '',
        isSearch: false,
        resolve: null
      };
    },
    watch: {
      num(val) {
        this.selectList = ''
      },
    },
    mounted() {
      this.getDeptUserTree(0);
    },
    methods: {
      handleSearch() {
        if (this.searchInput.trim() === '') {
          this.isSearch = false;
        } else {
          this.isSearch = true;
        }
        this.id = '20420000';
        this.getDeptUserTree(0, this.resolve);
      },
      getDeptUserTree(level, resolve) {
        let obj = {};
        // obj.params = {id: this.id, dept_name: this.dept_name, dept_code: this.dept_code};
        // obj.serviceRoot = 'department/deptUserTree';
        obj.serviceRoot = 'project/data_tree';
        obj.params = {id: this.id, text: this.searchInput};
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);

            result_data.nodeList.map(el => {
              if (el.type === "dept") {
                el.leaf = false
              } else if (el.type === "user") {
                el.leaf = true
              }
            });
            if (this.isSearch) {
              this.props.lazy = false;
              this.options = result_data.nodeList;
            } else {
              if (level === 0) {
                this.props.lazy = true;
                if (resolve) {
                  resolve(result_data.nodeList);
                  return
                }
                this.options = result_data.nodeList;

              } else {
                resolve(result_data.nodeList)
              }
            }

          }
        }).catch(err => {
          console.log(err)
        })
      },
      cascadeSubmit() {
        this.checkList = this.$refs.cascadeRef.getCheckedNodes();
        this.$parent.$parent.cascadeSubmit(this.checkList, this.isCheckBtn);
      }
    }
  }
</script>

<style>
  #project_dept_user_radio {
    height: 100%;
  }

  #project_dept_user_radio .dept_user {
    height: calc(100% - 40px);
    /*height: 100%;*/
  }

  /*#project_dept_user .el-cascader-panel {*/
  /*  height: 100%;*/
  /*}*/

  #project_dept_user_radio .el-cascader-menu__wrap {
    height: 100%;
  }
</style>

<template>
  <div id="project_dept_user">
    <!--    <el-row style="line-height: 40px;padding: 0 10px;">-->
    <!--      <el-col style="width: calc(100% - 80px);">-->
    <!--        <el-row>-->
    <!--          <el-col :span="12" style="padding-left: 15px;">-->
    <!--            <el-input v-model="dept_name" size="mini" placeholder="请输入部门名称或人员姓名" clearable></el-input>-->
    <!--          </el-col>-->
    <!--          <el-col :span="12" style="padding-left: 15px;">-->
    <!--            <el-input v-model="dept_code" size="mini" placeholder="请输入部门id或人员id" clearable></el-input>-->
    <!--          </el-col>-->
    <!--        </el-row>-->
    <!--      </el-col>-->
    <!--      <el-col style="width: 80px;text-align: right">-->
    <!--        <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>-->
    <!--      </el-col>-->
    <!--    </el-row>-->

    <el-cascader-panel class="dept_user" ref="cascadeRef" v-model="selectList" :options="options"
                       :props="props"></el-cascader-panel>
  </div>
</template>

<script>
  export default {
    name: "project_dept_user",
    props: ['isCheckBtn', 'num'],
    data() {
      let that = this;
      return {
        userCode: this.GLOBAL.userCode,
        dept_name: '',
        dept_code: '',
        id: '20420000',
        props: {
          multiple: true,
          value: 'id',
          label: 'text',
          lazy: true,
          lazyLoad(node, resolve) {
            if (node.level != 0 && node.data.type === "dept") {
              that.id = node.value;
              that.getDeptUserTree(node.level, resolve);
            } else {
              resolve([])
            }
          }
        },
        options: [],
        selectList: [],
        checkList: [],
      };
    },
    watch: {
      num(val) {
        this.selectList = [];
        // this.props.multiple = this.isCheckBtn;
        // if (this.isCheckBtn) {
        //   this.selectList = [];
        // } else {
        //   this.selectList = ''
        // }
      },
    },
    mounted() {
      this.getDeptUserTree(0);
    },
    methods: {
      handleSearch() {
        this.id = '20420000';
        this.getDeptUserTree(0);
      },
      getDeptUserTree(level, resolve) {
        let obj = {};
        obj.params = {id: this.id, dept_name: this.dept_name, dept_code: this.dept_code};

        obj.serviceRoot = 'department/deptUserTree';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            result_data.content.map(el => {
              if (el.type === "dept") {
                el.leaf = false
              } else if (el.type === "user") {
                el.leaf = true
              }
            });
            if (level === 0) {
              this.options = result_data.content;
            } else {
              resolve(result_data.content)
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
  #project_dept_user {
    height: 100%;
  }

  #project_dept_user .dept_user {
    /*height: calc(100% - 40px);*/
    height: 100%;
  }

  /*#project_dept_user .el-cascader-panel {*/
  /*  height: 100%;*/
  /*}*/

  #project_dept_user .el-cascader-menu__wrap {
    height: 100%;
  }
</style>

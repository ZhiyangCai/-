<!-- 验收申请单(code=6) edit by xuyy -->
<template>
  <div id="acceptance_application_form">
    <div class="project_form1">
      <table style="width: 100%;">
        <tr>
          <td>
            <div class="project_title1" v-html="projectTitle"></div>
          </td>
          <td class="qrcode_td">
            <qrcode></qrcode>
          </td>
        </tr>
      </table>
      <div class="project_code1" style="text-align: right;">{{projectCode}}</div>
      <div class="form_table">
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td class="td_label">项目名称</td>
            <td>
              <div class="td_text">{{project_name}}</div>
            </td>
            <td class="td_label">项目编号</td>
            <td>
              <div class="td_text">{{project_code}}</div>
            </td>
          </tr>
          <tr>
            <td class="td_label">合同名称</td>
            <td>
              <div class="td_text">{{contract_name}}</div>
            </td>
            <td class="td_label">合同编号</td>
            <td>
              <div class="td_text" :style="{'min-width':print?'110px':'140px'}">{{contract_code}}</div>
            </td>
          </tr>
          <tr>
            <td class="td_label">实施单位</td>
            <td>
              <div class="td_text">{{supplier}}</div>
            </td>
            <td class="td_label">项目经理</td>
            <td>
              <div class="td_text">{{project_manager}}</div>
            </td>
          </tr>
          <tr>
            <td class="td_label">项目起始时间</td>
            <td>
              <div class="td_text">{{start_date}}</div>
            </td>
            <td class="td_label">验收申请时间</td>
            <td>
              <div class="td_text">{{acceptance_date}}</div>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <div class="td_text text_bold" style="text-align: center;">主要实施内容与完成情况</div>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <div class="td_text" style="min-height: 230px;" v-html="content"></div>
            </td>
          </tr>
        </table>

        <table border="0" cellpadding="0" cellspacing="0" style="border-top-width: 0;">
          <tr v-if="accept_type==='1'">
            <td class="td_label" style="width: 100px;">项目业务经办人</td>
            <td>
              <div class="td_text">
                <span v-for="(user,i) in biz_user">
                  <span v-show="user.user_name!=null" v-if="user.user_name!=''">
                    <span>{{user.user_name}}</span>
                    <span v-if="!(i===biz_user.length-1)">；</span>
                  </span>

              </span>
              </div>
            </td>
            <td class="td_label" style="width: 100px;">项目信息经办人</td>
            <td>
              <div class="td_text">
                <span v-for="(user,i) in msg_user">
                  <span v-show="user.user_name!=null" v-if="user.user_name!=''">
                    <span>{{user.user_name}}</span>
                    <span v-if="!(i===msg_user.length-1)"><br></span>
                  </span>

              </span>
              </div>

            </td>
          </tr>
          <tr v-else-if="accept_type==='2'">
            <td class="td_label">项目信息经办</td>
            <td colspan="3">
              <div class="td_text">
                <span v-for="(user,i) in msg_user">
                  <span v-show="user.user_name!=null" v-if="user.user_name!=''">
                    <span>{{user.user_name}}</span>
                    <span v-if="!(i===msg_user.length-1)"><br></span>
                  </span>

              </span>
              </div>
            </td>
          </tr>
          <tr style="text-align: center">
            <td class="td_label">事项</td>
            <td colspan="2" class="td_text text_bold">要点</td>
            <td class="td_text text_bold" style="width: 100px;">确认签字</td>
          </tr>
          <tr v-for="(el,i) in itemList" :key="'item_'+i">
            <td style="height: 50px">
              <div class="td_text text_bold" style="text-align: center;">{{el.text}}</div>
            </td>
            <td colspan="2">
              <div class="td_text">{{el.user_msg}}</div>
            </td>
            <td>
              <div class="td_text">
                 <span v-for="(user,ii) in el.user_list" :key="'user_'+user.user_id+ii">
                   {{user.user_name}}
                 <span v-if="ii!=el.user_list.length-1">；</span>
              </span>
              </div>
            </td>
          </tr>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
  import qrcode from '@/components/qrcode/index'//二维码生成组件

  export default {
    name: "acceptance_application_form",
    props: ['projectId', 'code'],
    components: {
      qrcode
    },
    data() {
      return {
        /** 表单抬头 */
        projectTitle: '',//表单抬头head
        projectCode: '',//表单编码
        project_title: '验收申请单',//表单类型
        print: false,//是否打印单页面

        acceptList: [],//验收类别列表
        accept_type: '',//验收类别type
        accept_value: '',//验收类别value

        /** 项目基本信息 */
        project_name: '',//项目名称
        project_code: '',//项目编号
        contract_code: '',//合同编号
        contract_name: '',//合同名称
        multi_contract: 'N',//是否多合同

        supplier: '',//实施单位
        project_manager: '',//项目经理
        start_date: '',//项目起始时间
        acceptance_date: '',//验收申请时间
        content: '',//主要实施内容与完成情况

        msg_user: [],//项目信息经办人
        biz_user: [],//项目业务经办人
        itemList: [//四项交接人
          {text: '可编译源代码完整性验证', code: '1'},
          {text: '源代码功能性验证', code: '2'},
          {text: '软件运维交接', code: '3'},
          {text: '系统运维交接', code: '4'},
        ],

      }
    },
    mounted() {
      if (this.$route.name === 'projectPrint') {
        this.print = true
      } else {
        this.print = false
      }
      this.getFormData();
    },
    methods: {
      /** 根据表单id 获取表单信息 */
      getFormData() {
        this.project_title = this.$parent.getProjectTitle(this.code).title;
        this.$parent.loadingFun();
        let obj = {};
        obj.params = {id: this.projectId};
        obj.serviceRoot = 'project/acceptanceByIdQuery';
        obj.baseURL = '/itmsdrm';
        this.requestDrmService(obj, this).then(res => {
          this.$parent.loadingCloseFun();
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData).map;
            this.project_name = result_data.project_name;
            this.project_code = result_data.project_code;
            this.supplier = result_data.supplier_name;
            this.project_manager = result_data.project_manager[0].user_name;
            this.start_date = this.appDateFormat(result_data.start_date, 'yyyy年mm月dd日');
            this.acceptance_date = this.appDateFormat(result_data.acceptance_date, 'yyyy年mm月dd日');
            this.content = result_data.print_content;
            this.accept_type = result_data.accept_type;
            this.biz_user = result_data.biz_user;
            this.msg_user = result_data.msg_user;

            this.contract_name = result_data.contract_name;
            this.contract_code = result_data.contract_code;
            this.multi_contract = result_data.multi_contract;
            // this.itemList = result_data.items;

            this.itemList.map((el, i) => {
              el.user_list = [];
              el.user_msg = '';
              if (el.code === '1') {
                // el.user_list = result_data.checkUsers[0].checkUser1 || [];
                if (result_data.checkUsers[0].checkUser1) {
                  result_data.checkUsers[0].checkUser1.map(ele => {
                    if (ele.sign === 'Y') {
                      el.user_list.push(ele);
                      if (ele.content != null) {
                        if (ele.content != '') {
                          el.user_msg += ele.content + '；'
                        }
                      }
                    }
                  });
                }
              } else if (el.code === '2') {
                // el.user_list = result_data.checkUsers[0].checkUser2 || [];
                if (result_data.checkUsers[0].checkUser2) {
                  result_data.checkUsers[0].checkUser2.map(ele => {
                    if (ele.sign === 'Y') {
                      el.user_list.push(ele);
                      if (ele.content != null) {
                        if (ele.content != '') {
                          el.user_msg += ele.content + '；'
                        }
                      }
                    }
                  })
                }

              } else if (el.code === '3') {
                // el.user_list = result_data.checkUsers[0].checkUser3 || [];
                if (result_data.checkUsers[0].checkUser3) {
                  result_data.checkUsers[0].checkUser3.map(ele => {
                    if (ele.sign === 'Y') {
                      el.user_list.push(ele);
                      if (ele.content != null) {
                        if (ele.content != '') {
                          el.user_msg += ele.content + '；'
                        }
                      }
                    }
                  })
                }

              } else if (el.code === '4') {
                // el.user_list = result_data.checkUsers[0].checkUser4 || [];
                if (result_data.checkUsers[0].checkUser4) {
                  result_data.checkUsers[0].checkUser4.map(ele => {
                    if (ele.sign === 'Y') {
                      el.user_list.push(ele);
                      if (ele.content != null) {
                        if (ele.content != '') {
                          el.user_msg += ele.content + '；'
                        }
                      }
                    }
                  })
                }
              }

              if (el.user_msg.length > 0) {
                el.user_msg = el.user_msg.substring(0, el.user_msg.length - 1);
              }
            });
            if (result_data.accept_type === '1') {
              this.projectCode = 'XX3-JL12';
            } else if (result_data.accept_type === '2') {
              this.projectCode = 'XX3-JL13';
            }
            this.getDictList('ACCEPT_TYPE');

          }
        }).catch(err => {
          console.log(err);
        })
      },
      /** 获取验收类别列表 */
      getDictList(_type) {
        this.getSysDictList(_type, this).then(res => {
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            this.acceptList = result_data.data_list[0].category_data;
            this.acceptList.map(el => {
              if (el.code === this.accept_type) {
                this.accept_value = '(' + el.value + ')';
              }
            });
            this.projectTitle = this.$parent.projectTitle + this.project_title + '<br>' + this.accept_value;
          }
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped>

</style>

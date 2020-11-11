<template>
  <div id="print_pdf_index">

    <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" id="print_content">
      <iframe scrolling="auto" frameborder="0" width="100%" :src="hrefUrl" style="height: calc(100% - 4px);"></iframe>
    </div>

  </div>
</template>

<script>
  (function() {

    if (!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
      let hkey_path;
      hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
      try {
        let RegWsh = new ActiveXObject("WScript.Shell");
        RegWsh.RegWrite(hkey_path + "header", "");
        RegWsh.RegWrite(hkey_path + "footer", "");
      } catch (e) {}

    }
  })();

  export default {
    name: 'print_pdf_index',
    data() {
      return {
        projectId: '', //表单id
        fileId: '', //附件id
        hrefUrl: '', //pdf显示url

        loading: true,
      }
    },
    mounted() {
      this.projectId = this.$route.query.projectId;

      this.getPdfId();
    },
    methods: {
      getPdfId() {
        let obj = {};
        obj.serviceRoot = 'project/getGdPdfByMainId';
        obj.params = {
          main_id: this.projectId
        };
        this.requestDrmService(obj, this).then(res => {
          this.loading = false;
          if (res.resultCode === '0') {
            let result_data = JSON.parse(res.resultData);
            this.fileId = result_data.store_file_id;
            this.getPdf();
          } else {
            this.$message({
              type: 'warning',
              message: 'pdf获取失败，请稍后再试！'
            });
          }
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: 'pdf获取失败，请稍后再试！'
          });
        })

      },
      getPdf() {
        let baseUrl = '';
        let rootUrl = '';
        if (process.env.NODE_ENV === 'development') { //开发环境
          baseUrl = '/bpi';
          // rootUrl = '/itpm/business/file/download?module=preview&fileId=' + this.fileId;
          rootUrl = '/transfer/business/file/download?module=preview&fileId=' + this.fileId;
        } else { //生产环境

          if (this.GLOBAL.wxNormal === 'true') {
            if (this.GLOBAL.isNormal === 'false') { //测试环境
              rootUrl =
                'https://weixintest.hbtobacco.cn/hbwebchat/itms_mobile/business/file/remote/download?module=preview&fileId=' +
                this.fileId;
            } else {
              rootUrl =
                'https://weixin.hbtobacco.cn/hbwebchat/itms_mobile/business/file/remote/download?module=preview&fileId=' +
                this.fileId;
            }

          } else {
            rootUrl = '/transfer/business/file/download?module=preview&fileId=' + this.fileId;
          }

        }

        let url = baseUrl + rootUrl;

        this.hrefUrl = `static/pdfjs-2.2.228-dist/web/viewer.html?file=${encodeURIComponent(url)}`
      }
    }

  }
</script>

<style scoped media="print">
  #print_pdf_index {
    height: 100%;
    padding: 0 10px;
  }

  #print_content {
    position: relative;
    height: 100%;
  }

  .print_content_item {
    height: 100%;
  }

  #print_pdf_index .print_btn {
    border-top: 2px solid #E4E7ED;
    text-align: center;
    padding-top: 10px;
  }

  @page {
    size: auto;
    margin: 0mm;
  }

  @media print {}
</style>

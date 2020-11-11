<!-- 二维码 -->
<template>
  <div id="qrcode_index">
    <div class="qrcodeCon">
      <div id="qrcode" ref="qrcode"></div>
    </div>
    <div class="qrcode_sign">使用手机企业微信扫一扫</div>
  </div>
</template>

<script>
  import QRCode from "qrcodejs2";

  export default {
    name: "qrcode_index",
    data() {
      return {
        url: ''
      }
    },
    mounted() {
      let http;

      if (this.GLOBAL.isNormal === 'true') {//正式环境ip
        http = 'https://weixin.hbtobacco.cn/hbwebchat/itms_mobile/itms/index.html';
      }else if(this.GLOBAL.isNormal=='false'){//测试环境ip
        http = 'https://weixintest.hbtobacco.cn/hbwebchat/itms_mobile/itms/index.html';
      }

      let qrcode_route = this.$route;
      this.url = http + '#' + qrcode_route.path + '?projectId=' + qrcode_route.query.projectId + '&code=' +
        qrcode_route.query.code;

      this.$nextTick(() => {
        this.qrcode();
      });
    },
    methods: {
      qrcode() {
        let qrcode = new QRCode("qrcode", {
          width: 110, // 二维码宽度，单位像素
          height: 110, // 二维码高度，单位像素
          text: this.url, // 生成二维码的链接
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
        });
      }

    }
  }
</script>

<style scoped>
  #qrcode_index {
    width: 140px;
  }

  #qrcode_index .qrcode_sign {
    font-size: 12px;
    text-align: center;
  }

  .qrcodeCon {
    width: 110px;
    height: 110px;
    padding: 5px 0;
    margin: auto;
  }

  #qrcode_index #qrcode {
    width: 100%;
    height: 100%;
  }

  /*生成的二维码里面的img标签宽高自适应*/
  #qrcode img {
    width: 100%;
    height: 100%;
  }

  /*一开始生成的canvas也要进行宽高自适应*/
  #qrcode canvas {
    width: 100%;
    height: 100%;
  }
</style>

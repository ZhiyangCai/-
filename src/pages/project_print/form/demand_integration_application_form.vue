<!-- 集成需求申请单 打印单 edit by xyy -->
<template>
  <div id="demand_integration_application_form">

  </div>
</template>

<script>
  import qrcode from '@/components/qrcode/index'

  export default {
    name: "demand_integration_application_form",
    props: ['projectId', 'code'],
    components: {
      qrcode
    },
  }
</script>

<style scoped>

</style>

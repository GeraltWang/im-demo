<template>
  <div class="login">
    <a-card title="登录" :bordered="false" hoverable>
      
    </a-card>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,128L48,154.7C96,181,192,235,288,218.7C384,203,480,117,576,117.3C672,117,768,203,864,234.7C960,267,1056,245,1152,218.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  </div>
</template>
<script setup>

</script>
<style lang="less" scoped>
.login {
  height: 100vh;
  .ant-card {
    position: absolute;
    width: 40%;
    height: 40%;
    border-radius: 10px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  svg {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>

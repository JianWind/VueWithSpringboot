<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>Sign in</span>
    </div>
    <el-input placeholder="请输入内容" v-model="username" class="fix_width" clearable >
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-input placeholder="请输入内容" v-model="password" class="fix_width" clearable >
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-button type="success" size="medium" class="fix_width">Sign in</el-button>
  </el-card>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped>
  .box-card {
    width: 340px;
    text-align: center;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-180px;
    margin-top:-100px;
  }
  .fix_width {
    width: 260px;
  }
</style>

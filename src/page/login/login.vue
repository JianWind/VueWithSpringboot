<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>Sign in</span>
    </div>
    <el-row :gutter="20" class="tab-nav" t23-ype="flex" justify="center" align="center">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="account">
          <el-input placeholder="请输入内容" v-model="form.account" class="fix_width" clearable >
          </el-input>
        </el-form-item>
        <div style="margin: 20px 0;"></div>
        <el-form-item prop="password">
        <el-input placeholder="请输入内容" v-model="form.password" class="fix_width" clearable >
        </el-input>
        </el-form-item>
        <div style="margin: 20px 0;"></div>
        <el-button type="success" size="medium" class="fix_width" :loading="isRequesting" @click.native="doLogin">Sign in</el-button>
      </el-form>
    </el-row>
  </el-card>
</template>

<script>
import cacheData from '@/assets/plugin/cacheData'
export default {
  name: 'login',
  create () {
    sessionStorage.clear()
  },
  methods: {
    handleTabNavClick (item, index) {
      this.activeIndex = index
    },
    // 请求数据
    doLogin () {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        this.isRequesting = true
        this.$http.post(this.API.doLogin, this.form).then(response => {
          debugger
          this.isRequesting = false
          if (!response.data.success) return
          this.loginSuccess(response.data)
        }).catch(_ => {
          this.isRequesting = false
        })
      })
    },
    // 登录成功
    loginSuccess (data) {
      let routes = cacheData(data.data)
      debugger
      console.log(routes)
      this.$router.addRoutes(routes)
      sessionStorage.removeItem('default-active')
      this.$router.push({name: 'main'})
    }
  },
  data () {
    return {
      API: {
        doLogin: '/LoginController/login',
        getUser: '/getUser' // 查登录用户信息
      },
      form: {
        account: 'admin',
        password: 'admin'
      },
      rules: {
        account: [
          { required: true, message: '请输入account地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      },
      routesArr: [],
      isRequesting: false
    }
  }
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
    margin-top:-250px;
  }
  .fix_width {
    width: 260px;
  }
</style>

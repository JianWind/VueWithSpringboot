<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="formData">
        <el-form-item>
          <el-input v-model="formData.query" placeholder="姓名/手机号等条件" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getListData()" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddEdit()" icon="el-icon-plus">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 列表开始 -->
    <el-table :data="queryResult" style="width: 100%;" stripe border highlight-current-row v-loading="listLoading">
      <el-table-column label="姓名" prop="jUserName" >
      </el-table-column>
      <el-table-column label="账户" prop="jUserAccount" align="center" >
      </el-table-column>
      <el-table-column label="年龄" prop="jUserAge" >
      </el-table-column>
      <el-table-column label="性别" prop="jUserGender" >
      </el-table-column>
      <el-table-column label="电话" prop="jUserMobile" >
      </el-table-column>
      <el-table-column label="邮箱" prop="jUserEmail">
       </el-table-column>
      <el-table-column label="微信" prop="jUserWechat">
      </el-table-column>
      <el-table-column label="状态" prop="jValidaStatus">
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleAddEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--底部-->
    <el-col :span="24" class="toolbar">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageNum" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </el-col>

    <!--对话框-->
    <el-dialog :title="addEditTitle" :visible.sync="addEditFormVisible" :close-on-click-modal="true" :before-close="addEditFormOnClose">
      <el-form :model="formData" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="姓名" prop="jUserName">
          <el-input v-model="formData.jUserName" />
        </el-form-item>
        <el-form-item label="账户" prop="jUserAccount">
          <el-input v-model="formData.jUserAccount" />
        </el-form-item>
        <el-form-item v-if="currentFormDataIndex == -1" label="密码" prop="jUserPwd">
          <el-input v-model="formData.jUserPwd" />
        </el-form-item>
        <span v-else></span>
        <el-form-item label="年龄" prop="jUserAge">
          <el-input v-model="formData.jUserAge" />
        </el-form-item>
        <el-form-item label="电话" prop="jUserMobile">
          <el-input v-model="formData.jUserMobile" />
        </el-form-item>
        <el-form-item label="邮箱" prop="jUserEmail">
          <el-input v-model="formData.jUserEmail" />
        </el-form-item>
        <el-form-item label="微信" prop="jUserWechat">
          <el-input v-model="formData.jUserWechat" />
        </el-form-item>
        <el-form-item label="性别" prop="jUserGender">
          <el-select class="fix_width" v-model="formData.jUserGender" placeholder="请选择" >
            <el-option
              v-for="item in jUserGender"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="jValidaStatus">
          <el-select class="fix_width" v-model="formData.jValidaStatus" placeholder="请选择" >
            <el-option
              v-for="item in jValidaStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addEditFormOnClose">取消</el-button>
        <el-button type="primary" @click.native="addEditSubmit" :loading="addEditSubmitLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data () {
    return {
      rules: {
        fUserName: [
          {required: true, message: '姓名不能为空'}
        ],
        fUserMobile: [
          {required: true, message: '电话不能为空'}
        ],
        fUserSex: [
          {required: true, message: '性别不能为空'}
        ],
        fValidaStatus: [
          {required: true, message: '状态不能为空'}
        ],
        fUserAccount: [
          {required: true, message: '账号不能为空'}
        ],
        fUserPwd: [
          {required: true, message: '密码不能为空'}
        ]
      },
      jUserGender: [{
        value: '',
        label: '请选择'
      }, {
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      jValidaStatus: [{
        value: '',
        label: '请选择'
      }, {
        value: '0',
        label: '禁用'
      }, {
        value: '1',
        label: '启用'
      }],
      API: {
        prefix: `/UserController`,
        getUserPages: `/getUserPages`, // get分页列表
        insertJSysUser: `/insertJSysUser`, // 新增资源
        updateJSysUser: `/updateJSysUser` // 新增资源
      },
      addEditFormLoading: false, //
      listLoading: false, // 载入tableData
      addEditSubmitLoading: false, // 按钮点击后
      resetPwd: false, // 重置密码界面是否显示
      addEditFormVisible: false, // 新增界面是否显示
      dialogFormVisible: false, // 角色分配界面是否显示
      currentFormDataIndex: -1, // 新增：-1，编辑：>-1
      // fIsBuyState: false, // 新增，修改Boolean
      formData: {}, // 提交
      pagination: { // 分页
        pageNum: 1,
        pageSizes: [10, 20, 30, 50],
        pageSize: 10,
        total: 1
      },
      queryData: { // 查询
        pageNum: Number,
        pageSize: Number
      },
      queryResult: [
        // { // 查询返回结果
        // resCode: '001',
        // validStat: '启用',
        // resCateg: '系统资源',
        // fResName: '定义系统资源',
        // fResBuy: '否',
        // price: '1.0'
        // }
      ]
    }
  },
  computed: {
    addEditTitle () {
      return this.currentFormDataIndex > -1 ? '编辑' : '新增'
    }
  },
  methods: {
    formatAPI (_obj = {}) {
      for (let k of Object.keys(this.API)) {
        _obj[k] = `${this.API.prefix + this.API[k]}`
      }
      return _obj
    },
    // pageSize
    handleSizeChange (num) {
      this.pagination.pageSize = this.queryData.pageSize = num
      this.getListData()
    },
    // 当前page
    handleCurrentChange (num) {
      this.pagination.pageNum = this.queryData.pageNum = num
      this.getListData()
    },
    // 查询
    getListData () {
      this.listLoading = true
      this.queryData.pageNum = this.pagination.pageNum
      this.queryData.pageSize = this.pagination.pageSize
      debugger
      this.$http.post(this.API.getUserPages, this.queryData).then(response => {
        this.queryResult = response.data.data.pag
        this.pagination.total = parseInt(response.data.data.total)
        this.listLoading = false
      }).catch((response) => {
        console.error(response)
        this.listLoading = false
        this.$message.error('操作失败')
      })
    },

    // 显示新增编辑界面
    handleAddEdit ($index = 'empty') {
      let _index = $index === 'empty' ? 0 : $index
      let _data = this.queryResult[_index]

      if ($index === 'empty') {
        this.currentFormDataIndex = -1
        this.formData = {
          jId: '',
          jUserName: '',
          jUserMobile: '',
          jUserWechat: '',
          jUserGender: '',
          jUserEmail: '',
          jUserAccount: '',
          jUserPwd: '',
          jUserAge: '',
          jValidaStatus: ''
        }
      } else {
        this.currentFormDataIndex = _index
        this.formData = _data
      }
      _data.fUserPwd = this.fUserPwd
      this.addEditFormVisible = true
    },

    // 新增
    addEditSubmit () {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        this.$confirm('确认提交吗？', '提示', {}).then(() => {
          this.addEditSubmitLoading = true
          // NProgress.start()
          let _url = this.currentFormDataIndex > -1 ? this.API.updateTNlmSysUser : this.API.insertJSysUser
          let _data = this.formData
          let param = {
            jId: _data.jId,
            jUserName: _data.jUserName,
            jUserMobile: _data.jUserMobile,
            jUserWechat: _data.jUserWechat,
            jUserGender: _data.jUserGender,
            jUserEmail: _data.jUserEmail,
            jUserAccount: _data.jUserAccount,
            jUserPwd: _data.jUserPwd,
            jUserAge: _data.jUserAge,
            jValidaStatus: _data.jValidaStatus
          }
          this.$http.post(_url, param).then((response) => {
            let result = response.data.data
            if (result > 0) {
              this.addEditSubmitLoading = false
              this.addEditFormOnClose()
              this.$message({ message: '操作成功', type: 'success', duration: 1500 })
              if (this.currentFormDataIndex > -1) {
                Object.assign(this.queryResult[this.currentFormDataIndex], this.formData)
              } else {
                this.getListData()
              }
            } else {
              this.addEditSubmitLoading = false
              this.$message.error('操作失败')
            }
          }).catch((response) => {
            this.addEditSubmitLoading = false
            console.error(response)
            this.$message.error('操作失败')
          })
        })
      })
    },
    // 关闭新增编辑弹窗
    addEditFormOnClose () {
      this.addEditFormVisible = false
    },
    // 关闭新增编辑弹窗
    handleCloseReset () {
      this.resetPwd = false
    },
    handleCloseRole () {
      this.dialogFormVisible = false
    },
    init () {
      this.API = this.formatAPI()
      this.getListData()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
</style>

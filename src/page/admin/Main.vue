<template>
    <el-container class="container">
      <el-header class="header">
        <el-row type="flex" justify="space-between" align="center" style="height: inherit;display:table;">
          <el-aside class="trans-left-menu" :width="isCollapse?width.small:width.full">
            <el-row class="logo">
              <i class="el-icon-menu" @click="isCollapse=!isCollapse"/>
              <span class="logo-text">后台管理系统</span>
            </el-row>
          </el-aside>
          <el-col class="trans-left-menu-right">
            <el-row class="heder-right" type="flex" justify="space-between" align="middle">
              <div class="heder-right-breadcrumb">
                <i class="el-icon-location"></i>
                <el-breadcrumb separator-class="el-icon-arrow-right" v-if="breadcrumbData.length>0">
                  <el-breadcrumb-item  v-for="item in breadcrumbData" :key="item">{{item}}</el-breadcrumb-item>
                  <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                  <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
                </el-breadcrumb>
              </div>
              <el-row class="heder-right-user-nav" type="flex" justify="space-between" align="middle" style="height: inherit;float:right;display:table;">
                <el-tooltip
                  v-for="(item, index) in titleButtonData"
                  :key="`titleButton${index}`"
                  class="item"
                  effect="dark"
                  :content="item.tip"
                  placement="bottom"
                  @click.native="item.onClick">
                  <a href="javascript:void(0)"><i :class="item.icon"/></a>
                </el-tooltip>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </el-header> <el-container class="app-container-body">
      <el-row class="clearfix" type="flex" justify="space-between" align="center" style="width:100%;height: inherit;">
        <el-col class="trans-left-menu" :style="{width: isCollapse?width.small:width.full}">
          <left-menu
            class="trans-left-menu left-menu"
            v-if="treeData"
            :data="treeData"
            :collapse="isCollapse"
            :default-active="defaultActive"
            :default-openeds="defaultOpeneds"
            @select="handleSelect"/>
        </el-col>
        <el-col class="app-main" :style="{overflow: 'auto', width: `calc(100% - ${isCollapse?width.small:width.full})`}">
          <!-- <transition name="el-fade-in"> -->
          <router-view class="main-box"/>
          <!-- </transition> -->
        </el-col>
      </el-row>
    </el-container>
    </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      treeData: state => state.resourceData
    }),
    isRootPath: function () {
      return /^\/admin\/main$/.test(this.$route.fullPath)
    },
    defaultActive: function () { // 默认选中的导航菜单
      return this.isRootPath ? '' : this.fullPathData[0].murl
    },
    defaultOpeneds: function () { // 默认展开的导航菜单
      return this.isRootPath ? [] : this.fullPathData.map(item => item.murl).reverse()
    },
    breadcrumbData: function () { // 顶部面包屑导航
      return this.isRootPath ? ['首页'] : this.fullPathData.map(item => item.label).reverse()
    }
  },
  data () {
    return {
      isCollapse: false,
      collapsed: false,
      systemName: 'Jane',
      userName: 'Jane',
      menus: [],
      titleButtonData: [{
        tip: '账号',
        icon: 'el-icon-mobile-phone',
        onClick: () => {
          this.$message('模块开发中...')
        }
      }, {
        tip: '退出',
        icon: 'el-icon-close',
        onClick: () => {
          this.logout()
        }
      }],
      width: {
        small: '64px',
        full: '230px'
      }
    }
  },
  methods: {
    initMenu () {
      for (let i in this.$router.options.routes) {
        let root = this.$router.options.routes[i]
        if (root.hidden) {
          continue
        }
        let children = []
        for (let j in root.children) {
          let item = root.children[j]
          if (item.hidden) {
            continue
          }
          children.push(item)
        }

        if (children.length < 1) {
          continue
        }

        this.menus.push(root)
        root.children = children
      }
    },
    // 退出
    logout () {
      this.$confirm('确定要退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.utils.logout()
        this.$message({
          type: 'success',
          message: '已退出登录!'
        })
      })
    },
    // 选择左侧导航菜单
    handleSelect (...arg) {
      if (arg[0] === this.$route.fullPath) return
      if (arg[2]) {
        this.fullPathData = this.getFullPath(this.treeData, arg[0])
        sessionStorage.setItem('defaultActive', arg[0])
        this.$router.push({name: arg[0]})
      }
    },
    // 全路径
    getFullPath (data, path) {
      for (let i in data) {
        if (data[i].murl === path) {
          // console.log('叶子节点已找到 => ', {label: data[i].label, murl: data[i].murl})
          return [{label: data[i].label, murl: data[i].murl}]
        } else {
          let _r = this.getFullPath(data[i].children, path)
          if (Array.isArray(_r) && _r.length) {
            // console.log('父级节点已找到 => ', {label: data[i].label, murl: data[i].murl})
            return [..._r, {label: data[i].label, murl: data[i].murl}]
          }
        }
      }
    }
  },
  mounted: function () {
    this.initMenu()
  }
}
</script>

<style scoped lang="scss">
  $width: 100%;
  $height: 100%;
  $background-color: #545c64;
  $header-color: #fff;
  $header-height: 60px;
  $dur: .3s;
  .app-container {
    width: 100%;
    height: 100vh;
    .header {
      padding: 0;
      height: $header-height !important;
      border-bottom: 1px solid #d2d2d2;
      .logo {
        height: inherit;
        line-height: $header-height;
        color: #fff;
        background-color: #4291D7;
        white-space: nowrap;
        overflow: hidden;
        i {
          margin-left: 20px;
          margin-right: 18px;
          width: 24px;
          text-align: center;
          vertical-align: middle;
        }
        .logo-text {
          font-size: 16px;
          vertical-align: middle;
        }
      }
      .heder-right {
        display: table;
        width: 100%;
        height: inherit;
        font-size: 26px;
        .heder-right-breadcrumb {
          display: table;
          float: left;
          margin-left: 20px;
          height: inherit;
          > * {
            display: table-cell;
            vertical-align: middle;
          }
          .el-icon-location {
            padding-right: 5px;
            font-size: 16px;
          }
        }
        .heder-right-user-nav {
          display: table;
          float: right;
          height: inherit;
          > a {
            display: table-cell;
            vertical-align: middle;
          }
        }
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 0 30px;
          height: 100%;
          font-size: 16px;
          color: #2c3e50;
          cursor: pointer;
          transition: color .3s ease, background-color .3s ease;
          &:hover {
            color: #fff;
            background-color: #4291D7;
          }
          &:after {
            content: '';
            position: absolute;
            right: -1px;
            top: 30%;
            bottom: 30%;
          }
          &:last-child {
            &:after {
              right: 0;
              border-right: 0;
            }
          }
        }
      }
    }
    .app-container-body {
      height: calc(100vh - #{$header-height});
      .app-main {
        float: right;
        height: inherit;
        transition: width $dur cubic-bezier(0.42, 0, 0.58, 1);
        .main-box {
          padding: 20px;
          height: calc(100% - 40px);
        }
      }
    }
  }

    .trans-left-menu {
      position: relative;
      display: table-cell;
      float: left;
      height: inherit;
      transition: width $dur cubic-bezier(0.42, 0, 0.58, 1);
    }
    .trans-left-menu-right {
      display: table-cell;
      float: none;
      height: inherit;
    }
</style>

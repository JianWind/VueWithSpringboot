<template>
  <section>
    <el-container class="container">
      <!--左边-->
      <el-aside :width="collapsed? '66px' : '200px' ">
        <el-container>
          <el-header style="height:38px;">
            <el-row >
              <el-col :span="24"  >
                <div class="layout lay_a" @click="collapsed=!collapsed" >
                  <el-aside class="trans-left-menu head" :width="collapsed?'64px':'198px'">
                    <i style="color:fff!important" class="el-icon-menu" />
                    <span class="logo-text" v-show="collapsed?false:true">后台管理系统</span>
                  </el-aside>
                </div>
                <!--<div class="layout" style="vertical-align: unset;padding-left: 1rem;">
                  <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 0.7rem;">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                  </el-breadcrumb>
                </div>-->
              </el-col>
            </el-row>
          </el-header>
          <el-main>
            <el-menu :default-active="$route.path" :collapse="collapsed" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <template v-for="(item,index) in menus">
                <el-submenu :index="index+''" v-if="!item.leaf">
                  <template slot="title"><i :class="item.iconCls"></i><span v-if="!collapsed">&nbsp;{{item.name}}</span></template>
                  <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" @click="$router.push(child.path)">{{child.name}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
              </template>
            </el-menu>
          </el-main>
        </el-container>
      </el-aside>
      <!--内容-->
      <el-container>
        <!--页眉-->
        <el-header class="header">
          <el-row>
            <el-col :span="18" class="header-title">
              <span v-if="collapsed" class="system-name">{{systemName}}</span>
              <span v-else class="menu-button" @click.prevent="collapsed=!collapsed">
              <i class="fa fa-align-justify"></i>
            </span>
            </el-col>
            <el-col :span="6"><span class="el-dropdown-link userinfo-inner">你好：{{userName}}</span></el-col>
          </el-row>
        </el-header>
        <!--中间-->
        <el-main class="main">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </section>
</template>

<script>
let data = () => {
  return {
    collapsed: false,
    systemName: 'Jane',
    userName: 'Jane',
    menus: []
  }
}
let initMenu = function () {
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
}
export default {
  data: data,
  methods: {
    initMenu
  },
  mounted: function () {
    this.initMenu()
  }
}
</script>

<style scoped="scoped"
       lang="scss">
  $width: 100%;
  $height: 100%;
  $background-color: #545c64;
  $header-color: #fff;
  $header-height: 60px;
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .el-aside {
      .el-header {
        line-height: $header-height;
        background-color: $background-color;
        color: #fff;
        text-align: center;
      }
      .el-container {
        height: $height;
        .el-main {
          padding: 0;
        }
      }
    }
    .main {
      width: $width;
      height: $height;
    }
    .menu-button {
      width: 14px;
      cursor: pointer;
    }
    .userinfo-inner {
      cursor: pointer;
    }
    .el-menu {
      height: $height;
    }
    .header {
      background-color: $background-color;
      color: #fff;
      text-align: center;
      line-height: $header-height;
      padding: 0;
      .header-title {
        text-align: left;
        span {
          padding: 0 20px;
        }
      }
    }
    .system-name {
      font-size: large;
      font-weight: bold;
    }
  }
</style>

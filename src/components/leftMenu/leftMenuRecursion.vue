<template>
<el-menu-item :index="`${data.murl}`" v-if="!isLeaf(data.children)">
  <i :class="data.micon?data.micon:'vip-icon-manage'"></i>
  <span>{{data.label}}</span>
</el-menu-item>
<el-submenu :index="`${data.murl}`" v-else-if="isLeaf(data.children)">
  <template slot="title">
    <i :class="data.micon?data.micon:'vip-icon-manage'"></i>
    <span>{{data.label}}</span>
  </template>
  <left-menu-recursion :key="`recursion${sitem.murl}`" :data="sitem" v-for="sitem in data.children"/>
</el-submenu>
</template>

<script>
export default {
  name: 'left-menu-recursion',
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {
    isLeaf (val) {
      return Array.isArray(val) && val.length
    }
  }
}
</script>

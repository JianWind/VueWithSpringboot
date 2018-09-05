<template>
  <el-menu
    :collapse="collapse"
    :default-active="defaultActive"
    class=""
    background-color="#142541"
    text-color="#fff"
    active-text-color="#d1bd35"
    @select="menuOnSelect">
    <left-menu-recursion
      v-for="(item, index) in data"
      :key="`root${index}`"
      :data="item"
      />
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import leftMenuRecursion from './leftMenuRecursion'
export default {
  name: 'leftMenu',
  components: {
    leftMenuRecursion
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array
    },
    defaultActive: {
      type: String,
      default: ''
    },
    defaultOpeneds: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created () {
    // this.defaultActive = sessionStorage.getItem('default-active') || ''
  },
  mounted () {
    // this.navTreeData = this.resourceData
  },
  methods: {
    menuOnSelect (...arg) {
      this.$emit('select', ...arg)
    }
  },
  computed: {
    ...mapState({
      resourceData: state => state.resourceData
    })
  }
}
</script>

<style lang="scss" scoped>

</style>

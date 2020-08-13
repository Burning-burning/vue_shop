<template>
  <div >
    <div class='collapse' @click = "collapseBtn">|||</div>
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff"
      :unique-opened="true"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      :default-active="activePath"
      >
      <el-submenu :index="'/'+item.path" v-for="item in menuList" :key = "item.id">
        <template slot="title">
          <i :class="objIcon[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click = "itemClick('/'+subItem.path)">
            <i class="el-icon-menu"></i>
            <span>{{subItem.authName}}</span>
          </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getMenu } from '../../../network/home.js'
export default {
  data () {
    return {
      menuList: [],
      objIcon: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        102: 'iconfont icon-danju',
        101: 'iconfont icon-shangpin',
        145: 'iconfont icon-baobiao'

      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenu()
    this.activePath = window.sessionStorage.getItem('active')
  },
  methods: {
    async getMenu () {
      const res = await getMenu()
      if (res.meta.status === 200) {
        this.menuList = res.data
        this.$store.dispatch('menuList', this.menuList)
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    collapseBtn () {
      this.isCollapse = !this.isCollapse
      this.$emit('collapseBtn', this.isCollapse)
    },
    itemClick (path) {
      this.activePath = path
      window.sessionStorage.setItem('active', path)
    }
  }

}
</script>
<style lang="less" scoped>
.iconfont{
  margin-right: 10px;
}
.el-menu{
  border-right: none;
}
.collapse{
  font-size: 15px;
  text-align: center;
  letter-spacing: 6px;
  cursor: pointer;
  color: #4a5064;

}

</style>

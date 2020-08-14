<template>
  <div class=''>
    <breadcrumb :menu="$store.state.menuList[2]" :item="2"></breadcrumb>
    <el-button type="primary" @click = "addCategory">添加分类</el-button>
    <tree-table :data = "categoryList" :columns = "columns" class="tree" :show-index="true" index-text="#" :expand-type="false" :selection-type="false" border :show-row-hover="false">
      <template slot = "isOk" scope="scope">
        <i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color: green"></i>
        <i style="color: red" class="el-icon-error" v-else></i>

      </template>
       <template slot = "order" scope="scoped" >
        <el-tag type ="primary" v-if="scoped.row.cat_level===0">一级</el-tag>
        <el-tag type="success" v-else-if="scoped.row.cat_level===1">二级</el-tag>
        <el-tag type = "warning" v-else>三级</el-tag>

      </template>

      <template slot = "opt">
        <el-button type="primary" icon="el-icon-edit">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
      </template>
    </tree-table>

        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[3, 5, 8, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <add-cate-dialog :isAddCateVisible="isAddCateVisible" @isVisible = "isVisible" :parentCate="parentCate" @isVisibleSuccess="isVisibleSuccess"></add-cate-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../../../components/common/breadcrumb/Breadcrumb'
import { getCategory, getParentCate } from '../../../network/goods.js'
import AddCateDialog from './AddCateDialog'
export default {

  data () {
    return {
      type: 3,
      pagenum: 1,
      pagesize: 5,
      categoryList: [],
      isAddCateVisible: false,
      parentCate: [],
      total: 0,
      columns: [{
        label: '分类名称',
        prop: 'cat_name'
      }, {
        label: '是否有效',
        type: 'template',
        template: 'isOk'
      }, {
        label: '排序',
        type: 'template',
        template: 'order'
      }, {
        label: '操作',
        type: 'template',
        template: 'opt'
      }
      ]
    }
  },
  created () {
    this.getCategory()
  },
  components: {
    Breadcrumb,
    AddCateDialog
  },
  methods: {
    async getCategory () {
      const res = await getCategory(this.type, this.pagenum, this.pagesize)
      if (res.meta.status === 200) {
        this.categoryList = res.data.result
        this.total = res.data.total
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    handleSizeChange (newSize) {
      this.pagesize = newSize
      this.getCategory()
    },
    handleCurrentChange (newPage) {
      this.pagenum = newPage
      this.getCategory()
    },
    async addCategory () {
      const mm = 2

      const res = await getParentCate(mm)
      if (res.meta.status === 200) {
        this.parentCate = res.data
      } else {
        this.$message.error(res.meta.msg)
      }

      this.isAddCateVisible = true
    },
    isVisible () {
      this.isAddCateVisible = false
    },
    isVisibleSuccess () {
      this.getCategory()
      this.isAddCateVisible = false
    }
  }

}
</script>
<style scoped>
.tree{
  margin-top: 15px
}
</style>

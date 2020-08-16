<template>
  <div class=''>
    <breadcrumb :menu="$store.state.menuList[2]" :item="0"></breadcrumb>
     <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input clearable @clear="clearData" placeholder="请输入内容" v-model="query"  class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click = "serach"></el-button>
        </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click = 'addGoods'>添加商品</el-button>
        </el-col>
      </el-row>
       <el-table
          style="margin-top: 15px;width: 100%"
          stripe
           border
          :data="goodsList"
         >
          <el-table-column type='index'>

          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
>
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="商品价格（元）"
            width="95px"
>
          </el-table-column>
          <el-table-column
            prop="goods_weight"
            label="商品重量"
            width="70px"
>
          </el-table-column>
           <el-table-column
           prop="add_time"
            label="创建时间"
            width="140px">
            <template v-slot="scope">
              {{$moment(scope.row.add_time).format('YYYY-MM-DD hh:mm:ss')}}
            </template>
          </el-table-column>
           <el-table-column
            label="操作"
            width="130px">
                <template v-slot="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click ="deleteThing(scope.row.goods_id)"></el-button>
            </template>
          </el-table-column>
       </el-table>
        <el-pagination
        background
        style="margin-top: 15px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[3, 5, 8, 10]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '../../../components/common/breadcrumb/Breadcrumb'
import { getList, deleteThing } from '../../../network/list.js'
export default {
  data: function () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 10,
      goodsList: [],
      total: 0

    }
  },
  components: {
    Breadcrumb
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await getList(this.query, this.pagenum, this.pagesize)
      if (res.meta.status === 200) {
        res.data.goods.forEach(item => {
          item.add_time = new Date(item.add_time)
          item.upd_time = new Date(item.upd_time)
        })
        this.goodsList = res.data.goods
        this.total = res.data.total
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    handleSizeChange (newSize) {
      this.pagesize = newSize
      this.getList()
    },
    handleCurrentChange (newPage) {
      this.pagenum = newPage
      this.getList()
    },
    serach () {
      this.getList()
    },
    clearData () {
      this.getList()
    },
    addGoods () {
      this.$router.push('/goods/add')
    },
    async deleteThing (id) {
      const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (result === 'confirm') {
        const res = await deleteThing(id)
        if (res.meta.status === 200) {
          this.$message.success(res.meta.msg)
          this.getList()
        } else {
          this.$message.error(res.meta.msg)
        }
      } else {
        this.$message.info('已取消删除')
      }
    }
  }

}
</script>
<style scoped>

</style>

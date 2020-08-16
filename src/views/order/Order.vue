<template>
  <div class=''>
    <breadcrumb :menu="$store.state.menuList[3]" :item="0"></breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容"  class="input-with-select">

    <el-button slot="append" icon="el-icon-search"></el-button></el-input>
        </el-col>
      </el-row>

      <el-table
      border
      stripe
        :data="orderList"
        style="width: 100%;margin-top: 15px">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          prop="order_number"
          label="订单编号">
        </el-table-column>
        <el-table-column
          prop="order_price"
          label="订单价格">
        </el-table-column>
        <el-table-column
          label="是否付款">
          <template v-slot="scope">
            <el-tag type="danger" v-if="scope.row.pay_status===0">未付款</el-tag>
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_send"
          label="是否发货">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="下单时间">
          <template v-slot="scope">
            {{$moment(scope.row.create_time * 1000).format('YYYY-MM-DD hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template>
              <el-button type="primary" icon="el-icon-edit" size="mini" @click = 'updateAddress'></el-button>
              <el-button type="success" icon="el-icon-location" size="mini" @click = "wuliu"></el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top:15px"
      >
    </el-pagination>

    </el-card>
    <el-dialog
    @close="handleClose"
  title="修改地址"
  :visible.sync="isUpdateVisible"
  width="50%">
  <el-form :model="updateFormModel" :rules="updateFormRules" ref="updateFormRefs" label-width="100px" class="demo-ruleForm">
  <el-form-item label="省市区/县" prop="address1">
     <el-cascader
    v-model="updateFormModel.address1"
    :options="cityData"
></el-cascader>
  </el-form-item>
  <el-form-item label="详细地址" prop="address2">
    <el-input v-model="updateFormModel.address2"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="updateAddress = false">取 消</el-button>
    <el-button type="primary" @click="updateAddress = false">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="物流信息"
  :visible.sync="isVisible"
  width="50%">
   <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in wuliuList"
      :key="index"
      :timestamp="activity.time">
      {{activity.context}}
    </el-timeline-item>
  </el-timeline>

</el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../../components/common/breadcrumb/Breadcrumb'
import { getOrderList, getWuliu } from '../../network/order.js'
import cityData from './citydata'
export default {
  data () {
    return {
      orderList: [],
      query: '',
      wuliuList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      isVisible: false,
      isUpdateVisible: false,
      cityData,
      updateFormModel: {
        address1: [],
        address2: ''
      },
      updateFormRules: {
        address1: [{
          required: true, message: '请选择省市区/县', trigger: 'blur'
        }],
        address2: [{
          required: true, message: '请填写详细地址', trigger: 'blur'
        }]
      }
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
    async getOrderList () {
      const res = await getOrderList(this.query, this.pagenum, this.pagesize)
      if (res.meta.status === 200) {
        this.orderList = res.data.goods
        this.total = res.data.total
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    handleSizeChange (newSize) {
      this.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange (newPage) {
      this.pagenum = newPage
      this.getOrderList()
    },
    updateAddress () {
      this.isUpdateVisible = true
    },
    handleClose () {
      this.$refs.updateFormRefs.resetFields()
    },
    async wuliu () {
      const res = await getWuliu()
      if (res.meta.status === 200) {
        console.log(res)
        this.wuliuList = res.data
      }
      this.isVisible = true
    }

  },
  created () {
    this.getOrderList()
  }

}
</script>
<style scoped>
.el-cascader{
  width: 100%
}
</style>

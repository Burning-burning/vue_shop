<template>
  <div class=''>
      <el-breadcrumb separator="/" >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card style="margin-top: 15px">
       <el-alert
       :closable="false"
        title="添加商品信息"
        type="info"
        center
        show-icon>
      </el-alert>
      <el-steps align-center :space="200" :active="activeIndex-0" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
       <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-form label-position="top" :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" class="demo-ruleForm">

     <el-tabs v-model="activeIndex" :tab-position="tabPosition"  :before-leave="switchTab" @tab-click="tabChange">
      <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addForm.goods_name "></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="addForm.goods_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="addForm.goods_weight" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="addForm.goods_number" type="number"></el-input>
          </el-form-item>
           <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              v-model="addForm.goods_cat"
              :options="cateList"
              :props="pageProps"
              @change="handleChange"></el-cascader>
          </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1">
        <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
           <el-checkbox-group v-model="item.attr_vals">
            <el-checkbox :label="cb" border v-for="(cb, index) in item.attr_vals" :key="index"></el-checkbox>

          </el-checkbox-group>
        </el-form-item>
      </el-tab-pane>

      <el-tab-pane label="商品属性" name="2">
        <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
          <el-input v-model="item.attr_vals"></el-input>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="3">
        <el-upload
          :on-success="handleSuccess"
          class="upload-demo"
          action="http://127.0.0.1:8888/api/private/v1/upload"
          :headers="setHead"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="4">
        <quill-editor v-model="addForm.goods_introduce"></quill-editor>
        <el-button @click="addGoods" type="primary" style="margin-top: 15px">添加商品</el-button>
      </el-tab-pane>
    </el-tabs>
    </el-form>
    </el-card>
          <el-dialog
        title="图片预览"
        :visible.sync="dialogVisible"
        width="50%"
      >
  <img :src="imagepath" style="width: 100%"/>

</el-dialog>

  </div>
</template>

<script>
import { getCategory, getParam, addGoods } from '../../../network/add.js'
export default {
  created () {
    this.getCategory()
  },
  data () {
    return {
      tabPosition: 'left',
      activeIndex: '0',
      cateList: [],
      setHead: {
        Authorization: window.sessionStorage.getItem('token')
      },
      imagepath: '',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      dialogVisible: false,
      pageProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'

      },
      manyTableData: [],
      onlyTableData: [],
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    cateId () {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      } else {
        return null
      }
    }
  },
  methods: {
    handleChange () {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    async getCategory () {
      const res = await getCategory()
      if (res.meta.status === 200) {
        this.cateList = res.data
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    switchTab (activaName, oldActiveName) {
      console.log(activaName, oldActiveName)
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    async tabChange () {
      if (this.activeIndex === '1') {
        const res = await getParam(this.cateId, 'many')
        if (res.meta.status === 200) {
          res.data.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
          })
          console.log(res.data)
          this.manyTableData = res.data
        } else {
          this.$message.error(res.meta.msg)
        }
      } else if (this.activeIndex === '2') {
        const res = await getParam(this.cateId, 'only')
        if (res.meta.status === 200) {
          res.data.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
          })
          console.log(res.data)
          this.onlyTableData = res.data
        } else {
          this.$message.error(res.meta.msg)
        }
      }
    },
    addGoods () {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          const form = JSON.parse(JSON.stringify(this.addForm))

          form.goods_cat = form.goods_cat.join(',')
          this.manyTableData.forEach(item => {
            const info = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals.join(',')
            }
            this.addForm.attrs.push(info)
          })
          this.onlyTableData.forEach(item => {
            const info = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals
            }
            this.addForm.attrs.push(info)
          })
          form.attrs = this.addForm.attrs
          console.log(form)
          const res = await addGoods(form.goods_name, form.goods_cat, form.goods_price, form.goods_number, form.goods_weight, form.goods_introduce, form.attrs, form.pics)
          if (res.meta.status === 201) {
            this.$message.success(res.meta.msg)
            this.$router.push('/goods')
          } else {
            this.$message.error(res.meta.msg)
          }
        } else {
          this.$message.error('请输入数据')
        }
      })
    },
    handlePreview (file) {
      console.log(file)
      this.imagepath = file.response.data.url
      this.dialogVisible = true
    },
    handleRemove (file) {
      console.log(file)
      const removePath = file.response.data.tmp_path
      const index = this.addForm.pics.findIndex(item => item.pic === removePath)
      this.addForm.pics.splice(index, 1)
      console.log(this.addForm)
    },
    handleSuccess (response) {
      const picInfo = {
        pic: response.data.tmp_path
      }
      this.addForm.pics.push(picInfo)
    }
  }

}
</script>
<style lang='less' scoped>
.el-steps{
  margin: 15px 0;
}
.el-checkbox{
  margin: 0 10px 0 0 !important
}

</style>

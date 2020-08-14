<template>
<div>
  <el-card>
  <el-row>
    <el-col>
      <el-button type="primary">添加角色</el-button>
    </el-col>
  </el-row>
  <el-table
      :data="roleList"
      style="width: 100%;margin-top: 15px"
      border
      stripe
      >
      <el-table-column
        type="expand">
        <template v-slot="scope">

          <el-row style="display: flex;align-items: center" class = 'itemTag' v-for="(item1,i1) in scope.row.children" :key="item1.id" :class = "['bdbottom',i1===0?'bdtop':'']">
            <el-col :span='5' >
              <el-tag type="primary" @close="closeTag(scope.row, item1.id)" closable>{{item1.authName}}</el-tag>
              <i class="el-icon-caret-right"></i>

            </el-col>
            <el-col :span="19">
              <el-row style="display: flex;align-items: center" class = 'itemTag' v-for="(item2, i2) in item1.children" :key="item2.id" :class="[i2!==0?'bdtop':'']">
                <el-col :span="6">
                  <el-tag type="success" @close="closeTag(scope.row, item2.id)" closable>{{item2.authName}}</el-tag>
                   <i class="el-icon-caret-right"></i>

                </el-col>
                <el-col :span="18">
                  <el-tag closable @close="closeTag(scope.row, item3.id)" class = 'itemTag' type="warning" v-for="item3 in item2.children" :key="item3.id">{{item3.authName}}</el-tag>

                </el-col>
              </el-row>

            </el-col>
          </el-row>

        </template>
      </el-table-column>
      <el-table-column
        label="#"
        type="index">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述">
      </el-table-column>
      <el-table-column

        label="操作">
        <template v-slot="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          <el-button size="mini" type="warning" icon="el-icon-setting" @click= "setRights(scope.row)">分配权限</el-button>

        </template>
      </el-table-column>

    </el-table>

</el-card>
<set-rights-dialog :id="id" :isSetVisible = 'isVisible' :rightsList="rightsList" @isSetDialog="isSetDialog" :defKeys="defKeys"></set-rights-dialog>
</div>

</template>

<script>
import { getRoles, deleteRights, getAllRights } from '../../../network/power.js'
import SetRightsDialog from './SetRightsDialog'
export default {
  data () {
    return {
      roleList: [],
      isVisible: false,
      rightsList: [],
      defKeys: [],
      id: ''
    }
  },
  components: {
    SetRightsDialog
  },
  created () {
    this.getRoles()
  },
  methods: {
    async getRoles () {
      const res = await getRoles()
      if (res.meta.status === 200) {
        this.roleList = res.data
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    isSetDialog () {
      this.defKeys = []
      this.getRoles()
      this.isVisible = false
    },
    getDefKeys (node, arr) {
      if (!node.children) {
        arr = arr.push(node.id)
      } else {
        node.children.forEach(node => {
          this.getDefKeys(node, arr)
        })
      }
      return arr
    },
    async setRights (role) {
      this.id = role.id
      const res = await getAllRights()
      if (res.meta.status === 200) {
        this.rightsList = res.data
      } else {
        this.$message.error(res.meta.msg)
      }
      this.getDefKeys(role, this.defKeys)

      this.isVisible = true
    },
    async closeTag (role, rightId) {
      const result = await this.$confirm('此操作将永久删除权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (result === 'confirm') {
        const res = await deleteRights(role.id, rightId)
        if (res.meta.status === 200) {
          role.children = res.data
        } else {
          this.$message.error(res.meta.msg)
        }
      } else {
        this.$message.info('该删除操作已取消')
      }
    }
  }

}
</script>
<style scoped>
.itemTag{
  margin: 7px;

}

.bdtop{
  border-top: 1px solid #eee;

}
.bdbottom{
  border-bottom: 1px solid #eee;
}
</style>

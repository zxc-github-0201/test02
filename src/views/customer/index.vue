<template>
    <div id="app" class="app-container" >
       <h3>顾客管理</h3>
       <!-- 搜索 -->

       <!-- 按钮 -->
        <!-- <el-button type="primary" size="small" @click="addHandler()">增加</el-button> -->
        <!-- <el-button type="danger" size="small" @click="batchDelete()">批量删除</el-button> -->
        <!-- /按钮 -->
        <!-- 表格 -->
        <el-table    
        :data="list" 
        stripe
        style="width: 100%" 
        >
        <el-table-column align="center" 
          type="selection"
          width="55"
          prop="id">
        </el-table-column>
        <el-table-column
          align="center"
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="telephone"
          label="手机号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot = "scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="updateHandler(scope.row)"
              >编辑</el-button>
              <el-button
              size="mini"
              icon="el-icon-share"
              @click="tocustomerdetails(scope.row)"
              >详情</el-button>
              <!-- <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteById(scope.row.id)"
              >删除</el-button>  -->
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格 -->
      <!-- 模态框 -->
      <el-dialog title="修改信息" :visible="dialogFormVisible" @close="dialogClose()"  align="center">
        <div style="margin: 20px;"></div>
          <el-form  label-width="100px" >
            <el-form-item label="姓名" align="left">
              <el-input v-model="customer_info.username" style="width:50%" > </el-input>
            </el-form-item>
            <el-form-item label="手机号" align="left">
              <el-input v-model="customer_info.telephone" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="状态" align="left">
              <el-select v-model="customer_info.status" placeholder="请选择">
              <el-option value = "启用">
                启用
              </el-option> 
              <el-option value = "禁用">
                禁用
              </el-option> 
            </el-select>
            </el-form-item>
            <!-- 上传头像 -->
          <!-- <el-upload
            action="http://120.55.194.134:5588/customer/saveOrUpdate"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="1">
            <i class="el-icon-plus"></i>
          </el-upload> -->
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogClose()">取 消</el-button>
          <el-button type="primary" @click="dialogClose(),AddHandler()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import {mapState,mapActions} from 'vuex'
export default {
    components:{
        Pagination   
    },
    data(){
      return{}
    },
    computed:{
        ...mapState('customer',['list','total,listQuery','dialogFormVisible','multipleSelection','customer_info'])
   
    },
    created(){
        this.fetchData()
    },
    methods:{
      tocustomerdetails(row){
        this.$router.push({name:'customerdetails',params:{row:row}})
        // this.$router.push({name:'productdetails',params:{row:row}})


      },
        ...mapActions('customer',['fetchData','updateHandler','dialogClose','AddHandler','addHandler','findCustomerById',])
    }
}
</script>
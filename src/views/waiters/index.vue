<template>
<div class="app-container">
  <h3>员工管理</h3>
   <el-button type="primary" size="small" @click="addHandlerl()">新增</el-button>
   <el-button type="danger" size="small" @click="toBatchDelete()">批量删除</el-button>
   <el-table
    v-loading="loading"
    :data="list"
    stripe
    style="width: 100%" 
    @selection-change="handleSelectionChange"
    >
    <el-table-column
    align="center"
      type="selection"
      width="55"
      prop="id">
    </el-table-column>
    <el-table-column
    align="center"
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
    align="center"
      prop="telephone"
      label="手机号">
    </el-table-column>
    <el-table-column
    align="center"
      prop="idCard"
      label="身份证号">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template v-slot = "scope">
        <el-button
          size="mini"
          @click="UpdateHandler(scope.row)"
          >编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteById(scope.row.id)"
          >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!-- 分页 -->
    <template>
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="fetchData" />
    </template>
<!-- 模态框 -->
<el-dialog :title="title" 
 :visible="dialogFormVisible"
 @close="dialogClose()"
 width="40%"
>
  <el-form  :model="waiter_info" label-width="120px" :rules="rules" ref="waiterForm" >
  <el-form-item label="用户名:" prop="username" > 
    <el-input v-model="waiter_info.username" style="width:70%" ></el-input>
  </el-form-item>
  <el-form-item label="手机号:" prop="telephone">
    <el-input v-model.number= "waiter_info.telephone" style="width:70%"></el-input>
  </el-form-item>
  <el-form-item label="身份证号:" prop="idCard">
    <el-input v-model="waiter_info.idCard" style="width:70%"></el-input>
  </el-form-item>
  </el-form>
    <!-- <p>用户名: <el-input v-model="waiter_info.username"></el-input>  
    <p>手机号: <el-input v-model="waiter_info.telephone" ></el-input>
    <p>身份证号: <el-input v-model="waiter_info.idCard" ></el-input> -->
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogClose('waiterForm')">取 消</el-button>
    <el-button type="primary" @click="submitHandler('waiterForm')">确 定</el-button>
  </div>
</el-dialog>
<!-- /分页 -->
<!-- 确认框 -->
<el-dialog
  title="警告"
  :visible="dialogVisible"
  width="30%"
  @close="edialogClose()"
  >
  <span>确认删除么?</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="edialogClose(),ewedialogClose()">取 消</el-button>
    <el-button type="primary" @click="edialogClose(),tobatchDelete()">确 定</el-button>
  </span>
</el-dialog>
<!-- /确认框 -->

</div>
</template>
<script>
import Pagination from '@/components/Pagination'
import {mapState,mapActions} from 'vuex'
export default {
  components: { Pagination },
  data(){
    return{
    rules:{
      username:[
        // required字段不能为空,trigger:trigger类型为blur的功能是文本框失去焦点才会触发
        // trigger类型为change的功能是文本框在输入内容时触发
        // trigger类型也可以同时使用blur和change，功能结合上面两个的功能
        {required:true,message:"请输入姓名",trigger:"blur"},
        {min:2,max:6,message:"姓名的字数应该为2~6位",trigger:"blur"}
      ],
      telephone:[
        {required:true,message:"请输入手机号",trigger:"blur"},
        {type: 'number', message: '必须为数字值',trigger:"change"},
        // {min:6,max:11,message:"请输入正确的手机号",trigger:"blur"},
        
      ],
      idCard:[
        {required:true,message:"请输入身份证号",trigger:"blur"},
        {min:18,max:18,message:"请输入正确的身份证号",trigger:"blur"},
        
      ],
    },
    dialogVisible:false,//确认框隐藏
    }
  },  
  //在仓库中的数据,获取时,必须卸载computed中
  computed:{
    ...mapState('waiters',['list','total','listQuery','dialogFormVisible','waiter_info','multipleSelection','loading','title']),
  },
  created(){
    this.fetchData()
  },
  methods:{  
    addHandlerl(){
      if(this.$refs.waiterForm){
      this.$refs.waiterForm.resetFields()
      }
      this.addHandler()
    },
    submitHandler(formName){
      //在提交之前执行校验
      console.log(formName)
      console.log(this.$refs[formName])
      this.$refs[formName].validate((valid)=>{
        console.log(valid)
        if(valid){
          this.AddHandler()
          // this.$refs.waiterForm.resetFields();
        }else{
          return false
        }
      })      
   },
  
   //清除表单验证对的结果
  UpdateHandler(row){
    if(this.$refs.waiterForm){
      this.$refs.waiterForm.resetFields();
    }
     
     this.updateHandler(row)
   },
   //批量删除前弹出警告框
    toBatchDelete(){
      this.dialogVisible=true
   },
    // 警告框关闭
    edialogClose(){
      this.dialogVisible=false
    },
    //点击警告框的确认按钮批量删除
    tobatchDelete(){
      this.batchDelete()
    },
    //点击取消提示取消删除
    ewedialogClose(){
      this.$notify({
                    title:'取消',
                    message:'批量删除取消',
                    type:'error',
                    duration: 2000,//显示两秒
                })
    },
    ...mapActions('waiters',['fetchData','addHandler','dialogClose','AddHandler','batchDelete','deleteById','updateHandler','handleSelectionChange']),
  }
  
}
</script>
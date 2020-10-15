<template>
    <div class="app-container">
        <h3>顾客详情</h3>    
        <el-row>
            <el-col style="display:inline-block;width:50%">
                <!-- 按钮组 -->
                <el-button type="primary" size="small" @click="tocustomer()">返回</el-button>
                <!-- /按钮组 -->
            </el-col>  
        </el-row>
    
    <!-- 表格 -->
     <el-table    
        :data="row" 
        style="width: 100%" 
        >
       
        <el-table-column
          align="center"
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
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
          prop="password"
          label="密码"
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
     </el-table>
     <el-table    
        :data="row" 
        style="width: 100%" 
        >
       
        <el-table-column
          align="center"
          prop="qq"
          label="QQ"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="province"
          label="省份"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="city"
          label="城市"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="money"
          label="余额"
          width="180">
        </el-table-column>
        
     </el-table>
    <!-- /表格 -->
    </div>    
</template>
<script>

export default {
    data(){
        return{
           row:[this.$route.params.row],
        }
    },
    created(){
      
    },
    computed:{
       
    },
    methods:{
        tocustomer(){
            this.$router.go(-1)
        }
    }
}
</script>


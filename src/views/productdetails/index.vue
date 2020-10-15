<template>
    <div class="app-container">
        <h3>产品详情</h3>    
        <el-row>
            <el-col style="display:inline-block;width:50%">
                <!-- 按钮组 -->
                <el-button type="primary" size="small" @click="toproduct()">返回</el-button>
                <!-- /按钮组 -->
            </el-col>  
        </el-row>
    
    <!-- 表格 -->
    <el-table
        style="width: 100%" 
        :data="row"
    >
            <el-table-column prop="id"  label="编号" width="180"> </el-table-column>
           <el-table-column prop="name" label="产品名称"  width="180"> </el-table-column>
            <el-table-column prop="price"  label="价格" width="100"> </el-table-column>
            <el-table-column  prop="description" label="描述"></el-table-column>
            <el-table-column align="center" prop="category.name" label="所属栏目"></el-table-column>
    </el-table>
    <el-table
        style="width: 100%" 
        :data="row"
    >
           <el-table-column prop="status" label="状态"  width="180"> </el-table-column>
            <el-table-column prop="photo"  label="照片" width="100"> </el-table-column>
            
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
        toproduct(){
            this.$router.go(-1)
        }
    }
}
</script>


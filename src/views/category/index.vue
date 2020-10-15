<template>
    <div class="app-container">
        <h3>栏目管理</h3>
        <!-- 按钮组 -->
        <el-button type="primary" size="small" @click="toaddHandler()">新增</el-button>
        <el-button type="danger" size="small" style="margin-right:40px" @click="tobatchDelete()">批量删除</el-button>
        
        栏目名称: <template>
                    <el-select 
                    placeholder="请选择" 
                    v-model="selectlist.name"  
                    @change="changeselect"
                    clearable 
                    size="small">
                        <el-option
                         v-for="item in selectlist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        >
                        </el-option>
                    </el-select>
                </template>
        <el-button type="primary" size="small" style="margin-left:30px"  @click="selecthandler()">查询</el-button>
        <!-- /按钮组 -->
        <!-- 表格 -->
        <el-table
            style="width:100%"
            :data="categoryList"
            @selection-change="handleSelectionChange"

        >
        <el-table-column align="center" type="selection" prop="id"  label="编号" width="55" > </el-table-column>
            <el-table-column prop="id"  label="编号" width="180"> </el-table-column>
            <el-table-column prop="name" label="栏目名称"  width="280"> </el-table-column>
            <el-table-column prop="num"  label="序号" > </el-table-column>
            <el-table-column  prop="parentId" label="父栏目"></el-table-column>
            <el-table-column align="center"  label="操作">
                <template v-slot = "scope">
                <el-button type="danger" size="mini" @click="deleteById(scope.row.id)">删除</el-button>
                <el-button type="primary" size= "mini" @click="UpdateHandler(scope.row)">编辑</el-button>
                <el-button size="mini">详情</el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <!-- /表格 -->
         <!-- 分页 -->
        <template>
            <pagination
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="fetchData"  
            />
        </template>
        <!-- /分页 -->
        <!-- 模态框 -->
        <!-- 模态框 -->
        <el-dialog :title="title"
            width="40%"
            :visible="dialogFormVisible"
            @close="toclosedialog()"
        >
        
        <el-form label-width="120px" :model="categorylist">
            <el-form-item label="栏目名称:" prop="name">
                <el-input style="width:70%" v-model="categorylist.name"></el-input>
            </el-form-item>
            <el-form-item label="序号:" prop="num" >
                <el-input style="width:70%" v-model="categorylist.num"></el-input>
            </el-form-item>
            <el-form-item label="父栏目:" prop="parentId">
                <el-input style="width:70%" v-model="categorylist.parentId"></el-input>
            </el-form-item>
            </el-form>
        <div slot="footer" class="dialog-footer">  
            <el-button type="primary" size="small" @click="addHandler(),toclosedialog()">确定</el-button>
            <el-button type="danger" size="small" style="margin-right:40px" @click="toclosedialog()" >取消</el-button>
        </div>
        </el-dialog>
        <!-- /模态框 -->
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { mapActions,mapState} from 'vuex'
export default {
    components: { Pagination },//注册分页组件
    data(){
        return{
            title:"title",
            dialogFormVisible:false
        }
    },
    created(){
        this.fetchData()
        //查找父栏目
        this.findAll()


    },
    computed:{
        ...mapState('category',['categoryList','total','listQuery','categorylist','multipleSelection','categorylist','selectlist'])
    },
    methods:{
        toaddHandler(){
            this.title="新增栏目"
            this.dialogFormVisible=true,
            this.clearcategorylist()
        },
        toclosedialog(){
            this.dialogFormVisible=false
        },
        UpdateHandler(row){
            this.title="编辑栏目"
            this.dialogFormVisible=true,
            this.clearcategorylist(),
            this.updateHandler(row)
        },
        //查询
        selecthandler(){
            this.fetchData()
        },
        ...mapActions('category',['fetchData','addHandler','clearcategorylist','updateHandler','deleteById','tobatchDelete','handleSelectionChange','findAll','changeselect'])
    }
    
}
</script>
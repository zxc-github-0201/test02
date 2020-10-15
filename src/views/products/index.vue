<template>
    <div class="app-container">
        <h3>产品管理</h3>
        <el-row>
            <el-col style="display:inline-block;width:50%">
                <!-- 按钮组 -->
                <el-button type="primary" size="small" @click="toaddHandler()">新增</el-button>
                <el-button type="danger" size="small" style="margin-right:40px" @click="tobatchDelete()">批量删除</el-button>
                <!-- /按钮组 -->
            </el-col>
            <el-col style="display:inline-block;width:50%;text-align:right">
                <!-- 搜索栏 -->
                    <el-form style="width:500px ;margin-right:25px;display:inline-block"> 
                        <el-form-item  style="display:inline-block">
                            产品名称: <el-input v-model="listQuery.name"  placeholder="请输入内容"  size="small" style="width:260px ;margin-right:25px" ></el-input>
                        </el-form-item>
                        <el-form-item style="display:inline-block"> 
                            <el-button type="primary" size="small" @click="handlerquery()">查询</el-button>
                        </el-form-item>
                    </el-form>
                <!-- /搜索栏 -->
            </el-col>
        </el-row>
       
        
        <!-- 表格 -->
        <el-table        
            style="width: 100%" 
            :data="list"
            @selection-change="handleSelectionChange"
            >
            <el-table-column align="center" type="selection" prop="id"  label="编号" width="55"  > </el-table-column>
            <el-table-column prop="id"  label="编号" width="180"> </el-table-column>
            <el-table-column prop="name" label="产品名称"  width="180"> </el-table-column>
            <el-table-column prop="price"  label="价格" width="100"> </el-table-column>
            <el-table-column  prop="description" label="描述"></el-table-column>
            <el-table-column align="center" prop="category.name" label="所属栏目"></el-table-column>
            <el-table-column align="center"  label="操作">
                <template v-slot = "scope">
                <el-button type="danger" size="mini" @click="deleteById(scope.row.id)">删除</el-button>
                <el-button type="primary" size= "mini" @click="UpdateHandler(scope.row)">编辑</el-button>
                <el-button size="mini" @click="toproductdetails(scope.row)">详情</el-button>
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
        <el-dialog :title="title"
            width="40%"
            :visible="dialogFormVisible"
            @close="toclosedialog()"
        >
        <el-form label-width="120px" :model="productlist">
            <el-form-item label="产品名称:" prop="name">
                <el-input style="width:70%" v-model="productlist.name"></el-input>
            </el-form-item>
            <el-form-item label="价格:" prop="price" >
                <el-input style="width:70%" v-model="productlist.price"></el-input>
            </el-form-item>
            <el-form-item label="描述:" prop="description">
                <el-input style="width:70%" v-model="productlist.description"></el-input>
            </el-form-item>
            <el-form-item label="所属栏目:" prop="categoryId">
                <el-select v-model="productlist.categoryId" placeholder="请选择所属栏目">
                <el-option v-for="item in categoryList"
                           :key="item.id" 
                           :label="item.name"
                           :value="item.id"
                >
                </el-option>
                </el-select>
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
        this.categoryfindAll()
    },
    computed:{
        ...mapState('products',['list','total','listQuery','productlist','multipleSelection']),
        ...mapState('category',{
            categoryList:'selectlist'
        })
    },
    methods:{
        //点击新增按钮
        toaddHandler(){
            this.dialogFormVisible=true
            this.title="新增产品"  
            this.clearproductlist()
        },
        //关闭模态框
        toclosedialog(){
            this.dialogFormVisible=false
        },
        // 增加产品
        addHandler(){
            this.addHandler() 
        },
        //点击编辑按钮
        UpdateHandler(row){
            this.title="编辑产品" 
            this.dialogFormVisible=true
            this.updateHandler(row)
        }, 
        //去批量删除
        tobatchDelete(){
            this.batchDelete()
        },
        //查询
        handlerquery(){
            this.fetchData()
        },
        //跳转详情
        toproductdetails(row){
            
            this.$router.push({name:'productdetails',params:{row:row}})
        },
        ...mapActions('products',['fetchData','addHandler','deleteById','updateHandler','clearproductlist','handleSelectionChange','batchDelete']),
         ...mapActions('category',{
             categoryfindAll:'findAll'
         })
    }
}
</script>


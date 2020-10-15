import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {get,post} from '../../utils/axios'
import ElementUI from 'element-ui'
const products = {
    namespaced :true,
    state:{ 
        list:[],//表单中的数据
        total:0,//总数
        listQuery:{
            page:1,//当前页码
            limit:5//一页显示几条
        },
        productlist:{},//模态框输入的值
        multipleSelection:[],//存放批量删除的id数组
    },
    mutations:{
        SETLIST(state,data){
            state.list=data
        },
        SETproductlist(state,data){ 
            state.productlist={...data}
        }
    },
    actions:{
        //分页查询
        fetchData(context){
            post("/product/queryProductCascadeCategory",{
                //因为sql的limit从0开始获取页码
                page:context.state.listQuery.page-1,
                pageSize:context.state.listQuery.limit,
                name:context.state.listQuery.name,
            }).then((resp)=>{  
                
                context.state.total=resp.data.total
                context.commit('SETLIST',resp.data.list)
            }).catch((err)=>{
                console.log(err)
            })
        },
        //清空模态框中的数据
        clearproductlist(context){
            context.commit('SETproductlist',{})
        },
        // 增加产品
        addHandler(context){
            post('/product/saveOrUpdate',context.state.productlist).then((resp)=>{
                ElementUI.Notification({
                    title:"成功",
                    message:"操作成功",
                    type:'success',
                    duration:2000
                });
                context.dispatch('fetchData')
                context.state.productlist={}
            })
        },
        // 编辑产品
        updateHandler(context,row){
            context.commit('SETproductlist',row)
        },
        //删除产品
        deleteById(context,id){
            get("/product/deleteById?id="+id).then((resp)=>{
                context.dispatch('fetchData')
                ElementUI.Notification({
                    title:'成功',
                    message:'删除成功',
                    type:'success',
                    duration:2000
                });
            }).catch((err)=>{
                ElementUI.Notification({ 
                    title:'失败',
                    message:'操作失败',
                    duration:2000
                })
            })
        },
        //多选框选中时会调用这个方法
        handleSelectionChange(context,val){
            console.log(val)//选中时会获得所有选中的数据
            context.state.multipleSelection=[],
            //遍历选中的数据将id放入数组中
            val.forEach(function(item){
                context.state.multipleSelection.push(item.id)
            })
        },
        //批量删除
        batchDelete(context){
            if(context.state.multipleSelection.length!==0){
                post('/product/batchDelete',{ids:context.state.multipleSelection.toString()}).then((resp)=>{
                    ElementUI.Notification({
                        title:'成功',
                        type:'success',
                        message:'批量删除成功',
                        duration:2000,
                    })
                    context.dispatch('fetchData')
                }).catch((err)=>{
                    console.log(err)
                })
            }   
        },
    }
}
export default products

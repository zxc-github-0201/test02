import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {get,post} from '../../utils/axios'
import ElementUI from 'element-ui'
const waiters = { 
    namespaced:true,
    state:{ 
            total: 0,//总数量
            listQuery: {
              page: 1,//当前页码
              limit: 5//一页显示几条
            },
            list:[],
            waiter_info:{},//当前编辑的员工数据
            dialogFormVisible : false  ,//控制模态框是否显示      
            multipleSelection:[],//存放数组 
            loading:true,//加载圈
            title:"",//模态框的标题
    },
    mutations:{
        SETLIST(state,data){
            state.list = data
        },
        SETwaiter_info(state,data){
            state.waiter_info = {...data,telephone:Number(data.telephone)}
        }
    },
    actions:{
        fetchData(context){
            context.state.loading=true
            post("/waiter/query",{
                //因为sql的limit从0开始获取页码
                page:context.state.listQuery.page-1,
                pageSize:context.state.listQuery.limit,
            }).then((resp)=>{
                // console.log(resp)
                // context.state.list = resp.data
                context.state.total = resp.data.total
                context.commit('SETLIST',resp.data.list);
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
                context.state.loading=false
            })
           
        },
        addHandler(context){  
            context.state.title="新增员工"
            context.state.waiter_info={}
            context.state.dialogFormVisible = true;
            
        },
        AddHandler(context){
            
                    post('/waiter/saveOrUpdate',context.state.waiter_info).then((resp)=>{
                                    ElementUI.Notification({
                                        title: '成功',
                                        message: '操作成功',
                                        type: 'success', //成功的样式
                                        duration: 2000//显示两秒
                                    });
                                    context.dispatch('fetchData')
                                    context.dispatch('dialogClose')
                                }).catch(()=>{
                                    ElementUI.Notification.error({
                                        title:'失败',
                                        message:'操作失败',
                                        duration: 2000//显示两秒
                                    })
                                })
                                
            

        },
        dialogClose(context){    
                context.state.dialogFormVisible = false;
                
        },
        deleteById(context,id){ 
            get('/waiter/deleteById?id='+id).then((resp)=>{
                context.dispatch('fetchData')
                ElementUI.Notification({
                    title: '成功',
                    message: '删除成功',
                    type: 'success', //成功的样式
                    duration: 2000//显示两秒
                });
            }).catch((err)=>{
                ElementUI.Notification.error({
                    title:'失败',
                    message:'操作失败',
                    duration: 2000//显示两秒
                })
            })
        },
        updateHandler(context,row){
            context.state.title="修改员工信息"
            context.state.dialogFormVisible = true;   
            context.commit('SETwaiter_info',row)
            console.log(row)         
        },
        handleSelectionChange(context,val){
            context.state.multipleSelection=[],
            val.forEach(function(item){
                context.state.multipleSelection.push(item.id)
            })
            console.log(val)
            console.log(context.state.multipleSelection)
        },//批量删除
        batchDelete(context){
            if(context.state.multipleSelection.length!==0){
                post('/waiter/batchDelete',{ids:context.state.multipleSelection.toString()}).then((resp)=>{
                    ElementUI.Notification({
                    title:'成功',
                    message:'批量删除成功',
                    type:'success',
                    duration: 2000,//显示两秒
                })
                context.dispatch('fetchData')   
            }).catch((err)=>{
                console.log(err)
            })
 
            }
            
        },
    }
    
}
export default waiters
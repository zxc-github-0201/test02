// import { from } from 'core-js/fn/array'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {get,post}from '../../utils/axios' 
import ElementUI from 'element-ui'
// import waiters from '../waiters'
const customer = {
    namespaced:true,    
    state:{
        list:null,//查询的所有
        total:0,//总数量
        listQuery:{
            page:1,//当前页码
            limit:5 //一页显示几条
        },
        customer_info:{},//当前编辑的员工数据
        dialogFormVisible:false,//控制模态框显示隐藏的状态 
        multipleSelection:[],//存放数组

    },
    mutations:{
        SETLIST(state,data){
            console.log(data)
            state.list = [...data]
        },
        setcustomer_info(state,row){
            state.customer_info=row

        }
    },
    actions:{
        fetchData(context){
            post('/customer/query',{
                page:context.state.listQuery.page-1,
                pageSize:context.state.listQuery.limit,
            }).then((resp)=>{
                context.state.total = resp.data.total
                context.commit('SETLIST',resp.data.list);
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 更新了当前编辑的员工数据在状态机里,还没有交给后台,如果刷新就回清空
        updateHandler(context,row){
            context.commit('setcustomer_info',row)
            context.state.dialogFormVisible=true
        },
        dialogClose(context){
            context.state.dialogFormVisible = false
            context.dispatch('fetchData')

        },
        //新增和更新数据时将模态框中的数据上传
        AddHandler(context){
            post('/customer/saveOrUpdate',context.state.customer_info).then((resp)=>{
                context.dispatch('fetchData')
                ElementUI.Notification({
                    title:"成功 ",
                    message:resp.statusText,
                    type:'success'
                })
            })
        },
        //点击新增按钮
        // addHandler(context){
        //     context.state.dialogFormVisible = true
        // }
       
    }
}
export default customer
<template>
  <div class="dashboard-container">
    
    <div class="patrol_area">
    <div id="allmap" style="height:600px;"></div> 
    </div>
    <div class="map" v-loading="loading">
        <el-input placeholder="请输入搜索地址" v-model="mapName" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="mapNameChange"></el-button>
        </el-input>
        <div style="padding:10px 0;" v-if="mapPointName">当前选中：{{mapPointName}}</div>
        <div id="container" style="height: 400px; width: 100%" ref="allmap"></div>
        <div class="map-btn">
          <el-button type="primary" @click="dialogMap = false">确认</el-button>
        </div>
      </div>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  mounted(){
    this.createMpa()
  },
  methods:{
    createMpa(){
         // GL版命名空间为BMapGL
        // 按住鼠标右键，修改倾斜角和角度
	    var map = new BMapGL.Map("allmap");    // 创建Map实例
	    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    	map.enableScrollWheelZoom(true);   
        //开启鼠标滚轮缩放
      var point = new BMapGL.Point(116.404, 39.915);
      var marker = new BMapGL.Marker(point);        // 创建标注   
      map.addOverlay(marker); 
      var myIcon = new BMapGL.Icon("markers.png", new BMapGL.Size(23, 25), {   
    // 指定定位位置。  
    // 当标注显示在地图上时，其所指向的地理位置距离图标左上   
    // 角各偏移10像素和25像素。您可以看到在本例中该位置即是  
    // 图标中央下端的尖角位置。   
    anchor: new BMapGL.Size(10, 25),   
    // 设置图片偏移。  
    // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您  
    // 需要指定大图的偏移位置，此做法与css sprites技术类似。   
    imageOffset: new BMapGL.Size(0, 0 - 25)   // 设置图片偏移   
    });     
        // 创建标注对象并添加到地图  
    var marker = new BMapGL.Marker(point, {icon: myIcon});   
    map.addOverlay(marker); 
    marker.addEventListener("click", function(){   
    alert("您点击了标注");   
    });
   
  }
    
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.BMap_cpyCtrl {
    display: none;
}
.anchorBL {
    display: none;
}
</style>

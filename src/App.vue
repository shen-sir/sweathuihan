<template>
  <div id="app">
    <!-- <img src="./assets/IMG_2549.GIF"> -->
    <router-view :list="list" ></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      list:null
    }
  },
  beforeCreate(){
    
    this.$http.get('http://www.sweathuihan.com/wx/code?code='+window.location.href.split('code=')[1].split('&')[0]).then(response => {
        // get body data
        console.log('========================')
        console.log(response)
        localStorage.openId = response.body.data.openId;
        console.log('========================')

      }, response => {
        // error callback
        alert('失败')
      });
    
  },
  created(){



    // 百度地图API功能
  var map = new BMap.Map("allmap");
  var point = new BMap.Point(116.331398,39.897445);
  map.centerAndZoom(point,12);
  var that = this;
  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      var mk = new BMap.Marker(r.point);
      map.addOverlay(mk);
      map.panTo(r.point);
      // alert('您的位置：'+r.point.lng+','+r.point.lat);
      window.$potision={
        lng:r.point.lng,
        lat:r.point.lat
      };
      that.$http.get('http://www.sweathuihan.com/api/nearby?currentLng='+r.point.lng+'&currentLat='+r.point.lat).then(response => {
        // get body data
        var res = response.body.data.venues;
        for(var i=0;i<res.length;i++){
          res[i].pic = JSON.parse(res[i].pic);
        }
        for(var i=0;i<res.length;i++){
          for(var ii=0;ii<res[i].pic.length;ii++){
            res[i].pic[ii] = 'http://upload.sweathuihan.com/'+res[i].pic[ii];
          }
        }
        // this.someData = response.body;
        that.list = res;
        // console.log(response)

      }, response => {
        // error callback
        alert('失败')
      });
    }
    else {
      alert('failed'+this.getStatus());
    }        
  },{enableHighAccuracy: true})
  //关于状态码
  //BMAP_STATUS_SUCCESS 检索成功。对应数值“0”。
  //BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。
  //BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”。
  //BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。
  //BMAP_STATUS_INVALID_KEY 非法密钥。对应数值“4”。
  //BMAP_STATUS_INVALID_REQUEST 非法请求。对应数值“5”。
  //BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)
  //BMAP_STATUS_SERVICE_UNAVAILABLE 服务不可用。对应数值“7”。(自 1.1 新增)
  //BMAP_STATUS_TIMEOUT 超时。对应数值“8”。(自 1.1 新增)
  //
  //微信config
  this.$http.get('http://sweathuihan.com/wx/config?url='+encodeURIComponent(window.location.href)).then(response => {
        // get body data
        // this.someData = response.body;
        // that.list = response.body.data.venues;
        console.log(response)
        var resbody = JSON.parse(response.body)
        console.log(resbody)

        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxbde5addacdc4f255', // 必填，公众号的唯一标识
            timestamp: resbody.timestamp, // 必填，生成签名的时间戳
            nonceStr: resbody.nonceStr, // 必填，生成签名的随机串
            signature: resbody.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            //朋友圈，微信朋友，QQ空间
        });

      }, response => {
        // error callback
        alert('失败')
      });


  }
}
</script>

<style>
a{
  text-decoration:none;
}
iframe,#allmap{
  display: none;
}
input{
  -webkit-appearance:none;
  outline:none;
}
input:focus{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-user-modify:read-write-plaintext-only;
}
*:focus {outline: none;}
p{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:  100%;
}
html{
  font-size: calc(100vw/3.75);
  height: 100%;
}
body{
  font-size: 0.15rem;
  height: 100%;
}
</style>

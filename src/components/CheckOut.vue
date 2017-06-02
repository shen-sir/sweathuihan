<template>
  <div class="contain">
    <h1>本次训练结果</h1>
    <div class="icon">
      <div class="tex">
            <img class="icon" src="../assets/u1.png" >
            <p class="tit">运动时间</p>
            <img class="line" src="../assets/line.png" >
            <p><strong>{{min}}</strong>/Min</p>
          </div>
          <div class="tex">
            <img class="icon" src="../assets/u2.png" >
            <p class="tit">燃烧卡路里</p>
            <img class="line" src="../assets/line.png" >
            <p><strong>{{Kcal}}</strong>/Cal</p>
          </div>
          <div class="tex">
            <img class="icon" src="../assets/u3.png" >
            <p class="tit">赚取金钱</p>
            <img class="line" src="../assets/line.png" >
            <p><strong>{{money}}</strong>/Rmb</p>
          </div>
    </div>
    <div class="wx">
      {{text}}
    </div>
    <div class="btn">
      {{sharetext}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckOut',
  data () {
    return {
      min:0,
      money:0,
      Kcal:0,
      text:'请分享后到微信中查看奖励',
      sharetext:'点击右上角分享得奖励',
    }
  },
  methods:{
    
  },
  beforeCreate(){
    var that = this;
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
      
      that.$http.get('http://www.sweathuihan.com/api/checkOut?currentLng='+ r.point.lng+ '&currentLat='+ r.point.lat+'&openId=' +localStorage.openId).then(response => {
            // get body data
            console.log(response)
            if(response.body.code == '-6'){
              alert('打卡点超出范围')
            }else if(response.body.code == '-2'){
              alert('场馆状态有误')
            }else if(response.body.code == '-9'){
              alert('您还未签入')
            }else if(response.body.code == '0'){
              console.log(response.body.data.time+ '===time')
              that.min = (Math.floor(response.body.data.time/1000)/60).toFixed(2);
              that.money = response.body.data.money;
              that.Kcal = ((response.body.data.time*2091)/10000000).toFixed(2);
              if(that.min<60){
                that.text = '运动时间超过60分钟才可获得奖励哦~';
                that.sharetext = '点击右上角分享';
              }
            }else{
              alert('未知异常')
            }

          }, response => {
            // error callback
            alert('获取当前状态失败')
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



  },
  created(){
    var that = this;
    alert(typeof wx);
    wx.onMenuShareTimeline({
          title: '震惊！这家伙居然靠身体赚钱！', // 分享标题
          link: 'http://www.sweathuihan.com/dist/index.html#/share?openId='+localStorage.openId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://wx.qlogo.cn/mmopen/CJ35Z2cnZA3A5GESwjNffrKpWybv5OfeiaNZYFP3ibmR4d5j35FvM2IHwG8A0mNh9TYK0XibzibNHhUktGbaCOqyyQ/0', // 分享图标
          success: function () { 
              // 用户确认分享后执行的回调函数
              that.$http.get('http://www.sweathuihan.com/api/shareFinished?openId=' +localStorage.openId).then(response => {
                // get body data
                console.log(response)
                alert('分享到朋友圈成功')
                // alert(JSON.stringify(response))

              }, response => {
                // error callback
                alert('分享告知服务器失败')
              });
          },
          cancel: function () { 
            alert('取消分享')
              // 用户取消分享后执行的回调函数
          }
      });
    wx.onMenuShareAppMessage({
        title: '震惊！这家伙居然靠身体赚钱！', // 分享标题
        desc: '男人看了会沉默，女人看了会流泪！这么累的事情竟然天天去，原来是因为......', // 分享描述
        link: 'http://www.sweathuihan.com/dist/index.html#/share?openId='+localStorage.openId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://wx.qlogo.cn/mmopen/CJ35Z2cnZA3A5GESwjNffrKpWybv5OfeiaNZYFP3ibmR4d5j35FvM2IHwG8A0mNh9TYK0XibzibNHhUktGbaCOqyyQ/0', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            // 用户确认分享后执行的回调函数
            alert('分享到朋友成功')
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
.contain{
  text-align: center;
  color: white;
  overflow-x: hidden;
  height: 100%;
  background: url(../assets/cbg.jpg) center center / cover no-repeat;
  h1{
    margin-top: 2.5rem;
    font-size: .18rem;
    padding-left: .12rem;
    margin-bottom: .3rem;
  }
  .icon{
    .tex{
        /*overflow-x: hidden;*/
        width: 32.1%;
        height: 1.1rem;
        display: inline-block;
        color: white;
        font-size: .15rem;
        text-align: center;
        margin: 0 auto;
        margin-top: .07rem;
        margin-bottom: -.20rem;
        .icon{
          width: .45rem;
          margin-bottom: -0.08rem;
        }
        .tit{
          margin-bottom: -10px;
        }
        .line{
          width: 80%
        }
      }
  }
  .wx{
    /*width: 2.57rem;*/
    display: inline-block;
    padding: 0 .2rem 0 .2rem;
    height: .4rem;
    background: white;
    border-radius: .20rem;
    text-align: center;
    color: black;
    margin: 0 auto;
    margin-top: .60rem;
    line-height: .4rem;
  }
  .btn{
    width: 100%;
    height: .5rem;
    font-size: .2rem;
    background-color: #ff7723;
    color: white;
    text-align: center;;
    line-height: .5rem;
    font-weight: bold;
    position: fixed;
    bottom: 0;
  }
}
</style>

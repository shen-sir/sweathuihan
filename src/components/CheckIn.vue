<template>
  <div class="contain">
    <div class="context">
      <img class="top" src="../assets/p1.png" alt="">
      <div class="bottom">
        <div class="time">
          <h1>{{hour}}:{{min}}:{{second}}<span></span></h1>
        </div>
        <div class="kll">
          <p><span class="fire"></span>燃烧卡路里<span class="line2"></span><strong>{{Kcal}}</strong>/Cal</p>
        </div>
        <!-- <div class="num">
          <div class="tex">
            <img class="icon" src="../assets/u1.png" >
            <p class="tit">运动时间</p>
            <img class="line" src="../assets/line.png" >
            <p><strong>{{allmin}}</strong>/Min</p>
          </div>
          <div class="tex">
            <img class="icon" src="../assets/u2.png" >
            <p class="tit">燃烧卡路里</p>
            <img class="line" src="../assets/line.png" >
            <p><strong>{{Kcal}}</strong>/Kcal</p>
          </div>
          <div class="tex">
            <img class="icon" src="../assets/u3.png" >
            <p class="tit">赚取金钱</p>
            <img class="line" src="../assets/line.png" >
            <p><strong>{{money}}</strong>/Rmb</p>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <router-link   :to="{ path: href, query: {}}"> -->
      <div @click="link" class="stop">{{btn}}</div>
    <!-- </router-link> -->

  </div>
</template>

<script>
export default {
  name: 'CheckIn',
  data () {
    return {
      hour:0,
      min:0,
      second:0,
      allsecond:0,
      Kcal:0,
      btn:'结束健身',
      href:'javascript:;'
    }
  },
  watch:{
   second (val) {
    var that = this;
      this.allsecond++;
      this.Kcal = ((this.allsecond*2125)/10000).toFixed(2);
      if(val == 60){
        // alert('aaaaaa')
        this.second = 0;
        this.min++;
      }
    },
    min (val) {
      if(val == 60){
        this.hour++;
        this.min = 0;
      }
    }
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
      console.log($potision)
      // 正式
      /*'http://www.sweathuihan.com/api/checkIn?currentLng='+r.point.lng + '&currentLat='+r.point.lat + '&openId='+localStorage.openId*/
      // 测试
      /*'http://www.sweathuihan.com/api/checkIn?currentLng='+ 116.456427+ '&currentLat='+ 39.925253+ '&openId='+localStorage.openId*/
      that.$http.get('http://www.sweathuihan.com/api/checkIn?currentLng='+r.point.lng + '&currentLat='+r.point.lat + '&openId='+localStorage.openId).then(response => {

        //****超出打卡距离或场馆状态有误
        if(response.body.code == '-6'){
          alert('打卡点超出距离')
          that.btn = '重新打卡';
          // that.href = '/CheckIn';
          /*that.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbde5addacdc4f255&redirect_uri=http%3a%2f%2fsweathuihan.com%2fdist%2findex.html%23%2fCheckIn&response_type=code&scope=snsapi_base#wechat_redirect';*/
          return
        }else if(response.body.code == '-2'||response.body.code == '-4'||response.body.code == '-7'){
          alert('您还未购卡')
          that.btn = '前往场馆';
          that.href = '/';
        }

        //*****已签入，获取当前状态
        if(response.body.code == '-8'){
          console.log(response.body.code)
          that.$http.get('http://www.sweathuihan.com/api/nearbyAvailable?currentLng='+ r.point.lng+ '&currentLat='+ r.point.lat +'&openId=' +localStorage.openId).then(response => {
            // get body data
            console.log(response)
            //健身的秒数
            let now = Math.floor(response.body.data.now/1000) - Math.floor(response.body.data.venues.check_in_time/1000);
            console.log(now)
            that.allsecond = now;
            that.second = now%60;
            console.log(now)
            //健身的分钟数
            let mint = Math.floor(now/60);
            console.log(mint)
            console.log(mint>60)
            if(mint>60){
               console.log('=======mint>60= 应显示小时=====')
              that.min = mint%60;

              that.hour = parseInt(mint/60);
            }else{
              console.log('======else==不显示小时=====')
              that.min = mint;
            }
            alert(JSON.stringify(response));
            alert('已迁入继续计时')
            that.setInterval();
            // that.href = '/CheckOut';

          }, response => {
            // error callback
            alert('获取当前状态失败')
          });
        }

        //******签入成功
        if(response.body.code == '0'){
          alert(JSON.stringify(response));
          alert('迁入成功开始计时')
          that.setInterval();
          // that.href = '/CheckOut';
        }

      }, response => {
        // error callback
        alert('签入失败')
      });


    }else {
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
  methods:{
    //计时器
    setInterval(){
      var that = this;
      function incrementNumber() {
          that.second++;

      }
      window.intervalId = setInterval(incrementNumber, 1000);
    },
    link(){
      if( this.btn == '结束健身'){
        if(confirm('签退后再次签入则会重新计时，确定签退？')){
          this.$router.push({ path: '/CheckOut', query: { }})
        }
        
      }else if(this.btn == '重新打卡'){
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbde5addacdc4f255&redirect_uri=http%3a%2f%2fsweathuihan.com%2fdist%2findex.html%23%2fCheckIn&response_type=code&scope=snsapi_base#wechat_redirect"
      }else{
        return;
      }
      
    }
    
  },
  created(){
    
    
  },
  beforeMount(){
    
  },
  mounted(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
.contain{
  height: 100%;
  background: url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAKAAD/4QOPaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAyMSA3OS4xNTU3NzIsIDIwMTQvMDEvMTMtMTk6NDQ6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NTU1MmI0ZDctMjY3MC00YWFlLTliZDctMjY3ODA5YjgzODdhIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEzNzBFQzExMzJDRTExRTc5QjRGOTgzMkRDODlCQkJBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEzNzBFQzEwMzJDRTExRTc5QjRGOTgzMkRDODlCQkJBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Y2M3MDUwNGYtYTZmYi00NTU3LTk3NzYtMTU1MTk3ZDgyYTM4IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTFkOGY1MzQtNzEyYi0xMTdhLTk1NWItYWRkZDA5MjkyMmUwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAFBAQGRIZJxcXJzImHyYyLiYmJiYuPjU1NTU1PkRBQUFBQUFERERERERERERERERERERERERERERERERERERERAEVGRkgHCAmGBgmNiYgJjZENisrNkREREI1QkRERERERERERERERERERERERERERERERERERERERERERERERERE/8AAEQgFGALuAwEiAAIRAQMRAf/EAHoAAQEBAQEBAQAAAAAAAAAAAAABAgMEBQYBAQEBAQAAAAAAAAAAAAAAAAABAgMQAQEAAgICAQMEAQQABQUBAAABEQIhMRIDQVFhE3EiMgQUgZGxQvDBUmIjodHh8XIzEQEBAQACAwEAAAAAAAAAAAAAARExQSECElH/2gAMAwEAAhEDEQA/APywDDY1qy1qI7RUitsqioBUVAWBABMKiCYMKAmDCgJgVAQAGQBW40zGlRQAAAAAQAFAAAAAAAARQEFQAAAABFEEAAAAAAABRAAABAAQBUBABAFEAVcsqI0rMUFVFAAAAUVKqUEILECotZAVBBpWVUecBlsa1Za1EdoqRW2VBAKi1AURNrhBcplyvsT8gO2RzmzcoNCAAAIKgMioK3GmY0IKgoogAAAACgAAAAAAAAAAAgqAAAAICKgAAAAAAAACAAIAIqCiKgIAAACgAsVFEVUAUAAAAoVRFiLECotZAAQWKiZUcRRltGtWWtRHaKkVtlUVAEVKCZcPdvjp1teb2c1BgUVW9NnfV5tXfWoOgmTINCKIIqAgArUaYlayIomVAAAAUAAUQBRFAAAAAAAAARUAAAAQEVAAARUAURQEVAEVAAAQAURUARUQAAFRVRVZUFVFAVAFAAKFUQgsQKytQARUEtYarHyKAI0jWrLWoO0VIrbCooCM1pjag52uO3NdLXOoqCgJHXVyrrpQdYuDVQRQEEUBkKgqqysBpWVBVQEUAABQAAFARQAAAAAAAQAAAAEEAAABAAFAAAEFQEFQBFBURQEAARQAABUURQAUAFAAKFUQgRAqNVkBKqVBK555a2rmK2gI0Nastag7RUitsKACOe/ToxtMoPNlMt3RyvArQzkyBa1rswsijvru15vPnCzZB6ZW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) center center / cover no-repeat;
  .context{
    width: 3.31rem;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .top{
      width: 100%;
      margin-bottom: -0.45rem;
    }
    .bottom{
      overflow-x: hidden;
      border-radius: 0 0 .05rem .05rem;
      padding-bottom: .5rem;
      background-color: #343434;
      color: white;
      .time{
        h1{
          margin-top: .7rem;
          text-align: center;
          font-size: .58rem;
          color: white;
          span{
            display: inline-block;
            height: .40rem;
            width: .28rem;
            background: url(../assets/p2.png) center center / contain no-repeat;
          }
        }
      }
      .kll{
        text-align: center;
        font-size: .15rem;
        margin-top: -0.12rem;
        .fire{
          display: inline-block;
          width: .44rem;
          height: .44rem;
          background: url(../assets/u2.png) center center / contain no-repeat;
          vertical-align: middle;
          margin-right: .1rem;
        }
        .line2{
          width: .08rem;
          height: .17rem;
          display:inline-block;
          background: url(../assets/line2.png) center center / contain no-repeat;
          vertical-align: middle;
          margin-top: -0.05rem;
          padding: 0 .07rem;
        }
      }
      .num{
        margin-top: .6rem;
      }
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
  }
  .stop{
    width: 100%;
    height: .50rem;
    position: fixed;
    bottom: 0;
    background-color: #ff7723;
    font-size: .16rem;
    color: white;
    text-align: center;
    line-height: .5rem;
    font-weight: bold;
  }

}
</style>

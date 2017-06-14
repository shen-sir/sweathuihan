<template>
  <div class="contain">
    <!-- <div class="top">
      <img :src="this.$route.query.imgs[0]" class="left">
      <div class="right">
        <p class="name">{{this.$route.query.name}}</p>
        <p class="price">￥{{this.$route.query.money}}</p><span>每次奖励{{this.$route.query.daymoney}}元</span>
      </div>
    </div> -->
    <div class="head">
     <div v-bind:style="{left:style.left+'px',width:style.width+'px'}" class="slider">
      <img @touchstart="start" @touchmove="move" @touchend="end" v-for="item in this.$route.query.imgs" :src="item">
    </div>
  </div>
    <ul class="index">
      <li v-for="(item,index) in this.$route.query.imgs" v-bind:class="{'active':sliderIndex[index]}"></li>
    </ul>
    <p class="price">{{this.$route.query.money}}&nbsp元<span class="text">&nbsp/位</span></p>
    <p class="reward"><span>每次奖励{{this.$route.query.daymoney}}元</span></p>
    <hr class="line">
    <div class="info">
      <div class="left">
        <p class="name">{{this.$route.query.name}}</p>
        <p class="position">{{this.$route.query.location}}</p>
        <!-- <a :href="'tel:'+this.$route.query.phone"><p class="tel">{{this.$route.query.phone}}</p></a> -->
      </div>
      <a :href="'tel:'+this.$route.query.phone">
        <div class="right">
          <img src="../assets/phone.png" >
        </div>
      </a>
    </div>
    <hr class="line">
    <div id="allmap"></div>
    <hr class="line">
    <div class="inp">
      <div class="line">
        <p>手机号</p><input v-model="tel" placeholder="请输入手机号" type="text">
        <input @click="msgcode" class="btn" value="获取验证码" type="button">
        <br> 
        <p>验证码</p><input v-model="code"  placeholder="请输入验证码" type="text">
        <input @click="verification" class="btn" value="提交" type="button">
      </div>
    </div>
    <hr class="line">
    <p class="titel">使用说明</p>
    <ul class="des">
      <li>完成购买后，您将收到确认信息和验证码</li>
      <li>凭验证码到对应场馆换取您的健身卡</li>
      <li>在您未验证健身卡之前可以随时退款</li>
      <li>客服联系方式：通过Sweat挥汗公众号留言或拨打客服电话</li>
    </ul>
    <!-- <div class="context">
        <p class="title">使用流程:</p>
        <p class="text">1.完成购买后，您将收到确认信息和验证码
        <br>2.凭验证码到对应场馆换取您的健身卡
        <br>3.在您未验证健身卡之前可以随时退款
        <br>4.客服联系方式：通过Sweat挥汗公众号留言或拨打客服电话 </p>
        <a :href="'tel:' + this.$route.query.phone"><p class="tel">{{this.$route.query.phone}}</p></a>
    </div> -->
    
    <div @click="pay" class="pay">即刻购买</div>
  </div>
</template>

<script>
export default {
  name: 'pay',
  data () {
    return {
      tel:'',//手机号
      code:'',//验证码
      items: [],
      imglength:this.$route.query.imgs.length,//图片数量
      startPos:null,//取第一个touch的坐标值
      isScrolling:0,//这个参数判断是垂直滚动还是水平滚动
      endPos:null,
      index:0,//当前显示元素的索引
      viewWidth:window.innerWidth,//可见视口宽度
      style:{   //更改的CSS样式
        left:0,//#slider偏移量
        width:window.innerWidth*this.$route.query.imgs.length,//#slider宽度
      },
      sliderIndex:[]
    }
  },
  watch:{
    index(newVal, oldVal){
      this.sliderIndex[oldVal] = false;
      this.sliderIndex[newVal] = true;
    }
  },
  methods:{
    //轮播方法
    start(event){
      // console.log(event)
      var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
      this.startPos = {x:touch.pageX,y:touch.pageY,time:+new Date}; //取第一个touch的坐标值
      this.isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
    },
    move(event){
      // console.log(event)
      //当屏幕有多个touch或者页面被缩放过，就不执行move操作
      if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
      var touch = event.targetTouches[0];
      this.endPos = {
        x:touch.pageX - this.startPos.x,
        y:touch.pageY - this.startPos.y
      };
      this.isScrolling = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1:0; //isScrolling为1时，表示纵向滑动，0为横向滑动
      if(this.isScrolling === 0){
        event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
        this.style.left = -this.index*this.viewWidth + this.endPos.x;
      }
    },
    end(event){
      // console.log(event)
      var duration = +new Date - this.startPos.time; //滑动的持续时间
      if(this.isScrolling === 0){ //当为水平滚动时
        // this.icon[this.index].className = '';
        if(Number(duration) > 10){
          //判断是左移还是右移，当偏移量大于10时执行
          if(this.endPos.x > 10){
            if(this.index !== 0) this.index -= 1;
          }else if(this.endPos.x < -10){
            if(this.index !== this.imglength-1) this.index += 1;
          }
        }
        this.style.left = -this.index*this.viewWidth ;
      }
      //解绑事件
      // this.slider.removeEventListener('touchmove',this,false);
      // this.slider.removeEventListener('touchend',this,false);
      
    },
    //轮播方法结束
    // 发送验证码
    msgcode(){
      this.$http.get('http://www.sweathuihan.com/api/sendCode?phone='+this.tel + '&openId=' +localStorage.openId).then(response => {
        // get body data
        // this.someData = response.body;
        console.log(response)
        if(response.code=='-12'){
          alert('您已注册，直接点击微信即可')
        }

      }, response => {
        // error callback
        alert('失败')
      });
    },
    //提交验证码
    verification(){
      this.$http.get('http://www.sweathuihan.com/api/register?phone='+this.tel + '&code=' + this.code + '&openId=' +localStorage.openId).then(response => {
        // get body data
        // this.someData = response.body;
        console.log(response)

      }, response => {
        // error callback
        alert('失败')
      });
    },
    pay(){
      var that = this;
      this.$http.get('http://www.sweathuihan.com/wx/pay?vid='+this.$route.query.vid + '&openId=' +localStorage.openId).then(response => {
        // get body data
        // this.someData = response.body;
        console.log(response.body.data.result)
        // that.$router.push({ path: '/success', query: {  }})
        wx.chooseWXPay({
            timestamp: response.body.data.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: response.body.data.result.nonceStr, // 支付签名随机串，不长于 32 位
            package: response.body.data.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: response.body.data.result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: response.body.data.result.paySign, // 支付签名
            success: function (res) {
                // 支付成功后的回调函数
                that.$router.push({ path: '/success', query: { }})
                console.log(res)
                that.$http.get('http://www.sweathuihan.com/wx/callback/'+response.body.data.outer_id).then(response => {
                  // get body data
                  console.log(response)
                  that.$router.push({ path: '/success', query: { plan: response }})

                }, response => {
                  // error callback
                  alert('失败')
                });
            }
        });
      }, response => {
        // error callback
        alert('失败')
      });
    }
  },
  created(){
    console.log(this.$route)
    for(let i=0;i<this.imglength;i++){
      // alert(1)
      this.sliderIndex.push(false)
    }
    this.sliderIndex[0] = true;
    //调整滚动条
    document.body.scrollTop = 0;
  },
  mounted(){
    // 百度地图API功能
  var map = new BMap.Map("allmap");
  map.centerAndZoom(new BMap.Point(116.331398,39.897445),19);
  map.enableScrollWheelZoom(true);
  
  // 用经纬度设置地图中心点

      map.clearOverlays(); 
      var new_point = new BMap.Point(this.$route.query.lng,this.$route.query.lat);
      var marker = new BMap.Marker(new_point);  // 创建标注
      map.addOverlay(marker);              // 将标注添加到地图中
      map.panTo(new_point);      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
iframe,#allmap{
  display: block;
}
#allmap{
  height:1.50rem;
  width:100%;
  margin-top: 0.3rem;
  margin-bottom: .3rem;
}
/*#r-result{width:100%; font-size:14px;}*/
div.contain{

  font-family: arial,verdana,Microsoft YaHei,Tahoma,Simsun,sans-serif;
  /*p{
    padding: .05rem 0.2rem;
  }*/
  height: 100%;

  /***********/
  .head{
    overflow-x: hidden;
  }
  div.slider{
    transition: all 0.5s;
    position: relative;
    height: 2.23rem;
    img{
      width: 100vw;
      height: 2.23rem;
      float: left;
    }
  }
  ul.index{
      margin: 0;
      padding: 0;
      position: absolute;
      list-style-type:none;
      left: 50%;
      top: 1.9rem;
      transform: translate(-50%,0);
      li{
        float: left;
        border:1px solid white;
        background-color: rgba(255, 255, 255, 0.23);
        width: .04rem;
        height: .04rem;
        border-radius: 100%;
        margin-right: .1rem;
      }
      .active{
        border:1px solid black;
        background-color: rgba(255, 255, 255, 1);
      }
    }
  .price{
    padding: .05rem 0.2rem;
    font-size: .22rem;
    color: #ff3939;
    margin-top: .15rem;
    .text{
      font-size: .13rem;
    }
  }
  .reward{
    padding: .05rem 0.2rem;
    span{
      border: 1px solid #ff8e44;
      display: inline-block;
      margin: 0 auto;
      color: #ff8e44;
      padding: 0 .1rem;
      border-radius: .03rem;
      font-size: .13rem;
    }
    
  }
  hr.line{
    /*display: inline-block;*/
    width: 90%;
    margin-top: .2rem;
    /*color: #e6e6e6;*/
    border:none;
    border-top: 1px solid #e6e6e6;
  }
  .info{
    margin-top: .3rem;
    padding-bottom: .08rem;
    .left{
      display: inline-block;
      width: 70%;
      .name{
        color: #1a1a1a;
        padding: 0rem 0.2rem;
        font-size: .17rem;
      }
      .position{
        color: #63666b;
        padding: 0rem 0.2rem;
      }
      a{
        color: #63666b;
        p{
          padding: 0rem 0.2rem;
        }
      }
    }
    .right{
      display: inline-block;
      border-left: 1px solid #d8d8d8;
      vertical-align: top;
      height: .4rem;
      width: .65rem;
      margin-top: .1rem;
      padding-left: .32rem;
      img{
        display: inline-block;
        width: 35%;
        margin-top: .08rem;
      }
    }
  }
  .titel{
      padding-left:.2rem;
      color: #2c3038;
      margin-top: .4rem;
    }
  .des{
    margin: 0;
    padding-bottom: .8rem;
    li{
      line-height: .35rem;
      width: 90%;
      color: #63666b;
    }
    /*background: #ededed;*/
  }
/***********/
  /*.top{
    width: 90%;
    background: white;
    padding: .15rem 5% .25rem 5%;
    .left{
      width:1.27rem;
      display: inline-block;
      vertical-align: middle;
      float: left;
    }
    .right{
      width: 1.95rem;
      display: inline-block;
      margin-top: .15rem;
      margin-left: .10rem;
      .name{
        font-size: .18rem;
      }
      .price{
        font-size: .18rem;
        display: inline-block;
        margin-right: .1rem;
        float: left;
      }
      span{
        font-size: .12rem;
        border: 1px solid #ff7e00;
        padding: .01rem .05rem;
      }
    }
  }*/
  /*.context{
    width: 90%;
    background: white;
    margin-top: .1rem 0;
    padding: .1rem 5%;
    margin-top: .1rem;
    .tel{
      margin-top: .20rem;
    }
  }*/
  .inp{

    .line{
      width: 100%;
      height: .8rem;
      background: white; 
      margin-top: .1rem;  
      p{
        margin-left: .15rem;
        margin-top: .1rem;
        display: inline-block;
      }
      input{
        margin-left: .1rem;
        margin-top: .07rem;
        vertical-align: top;
        width: 1.7rem;
        border: 0;
        display: inline-block;
        /*text-align: center;*/
      }
      .btn{
        vertical-align: middle;
        margin-top: -0.06rem;
        width: .9rem;
        font-size: .14rem;
        background: white;
        border: 1px solid rgb(221, 221, 221);
      }
    }
  }
  .pay{
    width: 100%;
    height: .5rem;
    background: #ff3939;
    text-align: center;
    color: white;
    font-size: .24rem;
    line-height: .5rem;
    position: fixed;
    bottom: 0;
  }
}
</style>

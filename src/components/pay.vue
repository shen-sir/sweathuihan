<template>
  <div class="contain">
    <div class="top">
      <img :src="this.$route.query.info.imgs[0]" class="left">
      <div class="right">
        <p class="name">{{this.$route.query.info.name}}</p>
        <p class="price">￥{{this.$route.query.info.money}}</p><span>每次奖励{{this.$route.query.info.daymoney}}元</span>
      </div>
    </div>
    <div class="context">
        <p class="title">使用流程:</p>
        <p class="text">1.完成购买后，您将收到确认信息和验证码
        <br>2.凭验证码到对应场馆换取您的健身卡
        <br>3.在您未验证健身卡之前可以随时退款
        <br>4.客服联系方式：通过Sweat挥汗公众号留言或拨打客服电话 </p>
        <a :href="'tel:' + this.$route.query.info.phone"><p class="tel">{{this.$route.query.info.phone}}</p></a>
    </div>
    <div class="inp">
      <div class="line">
        <p>手机号</p><input v-model="tel" placeholder="请输入手机号" type="text">
        <input @click="msgcode" class="btn" value="获取验证码" type="button">
        <br> 
        <p>验证码</p><input v-model="code"  placeholder="请输入验证码" type="text">
        <input @click="verification" class="btn" value="提交" type="button">
      </div>
    </div>
    <div @click="pay" class="pay">微信支付</div>
  </div>
</template>

<script>
export default {
  name: 'pay',
  data () {
    return {
      tel:'',//手机号
      code:'',//验证码
      items: []
    }
  },
  methods:{
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
      this.$http.get('http://www.sweathuihan.com/wx/pay?vid='+this.$route.query.info.vid + '&openId=' +localStorage.openId).then(response => {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
div.contain{
  /*border: 1px solid red;*/
  height: 100%;
  background: #ededed;
  .top{
    width: 90%;
    /*height: 1.22rem;*/
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
  }
  .context{
    width: 90%;
    background: white;
    margin-top: .1rem 0;
    padding: .1rem 5%;
    margin-top: .1rem;
    .tel{
      margin-top: .20rem;
    }
  }
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
        width: 1.7rem;
        border: 0;
        display: inline-block;
        /*text-align: center;*/
      }
      .btn{
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
    background: #ff8e44;
    text-align: center;
    color: white;
    font-size: .24rem;
    line-height: .5rem;
    position: fixed;
    bottom: 0;
  }
}
</style>

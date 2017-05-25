<template>
  <div class="contain">
    <div class="head">
        <img :src="headimg" >
    </div>
    <p class="name"><span class="l"></span>{{name}}<span class="r"></span></p>
    <h1 class="num">累计完成{{days}}次健身</h1>
    <div class="derc">
      <span></span>
      No Pains No Gains
      <span></span>
    </div>
    <div class="icon">
      <div class="tex">
            <img class="icon" src="../assets/u1.png" >
            <p class="tit">运动时间</p>
            <img class="line" src="../assets/line.png" >
            <p><strong>{{min}}</strong>/min</p>
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
    </div>
    <!-- <div class="wx">
      请分享后到微信中查看奖励
    </div> -->
    <router-link   :to="{ path: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbde5addacdc4f255&redirect_uri=http%3a%2f%2fsweathuihan.com%2fdist%2findex.html&response_type=code&scope=snsapi_base#wechat_redirect', query: {}}">
      <div class="btn">
        即刻加入
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'share',
  data () {
    return {
      name:'',
      headimg:'',
      days:0,
      min:0,
      Kcal:0,
      money:0

    }
  },
  methods:{
    
  },
  beforeCreate(){
    var that = this;
    this.$http.get('http://www.sweathuihan.com/api/sharedInfo?openId=' + window.location.href.split('openId=')[1]).then(response => {
            // get body data
            console.log(response)
            // alert(window.location.href.split('openId=')[1])
            that.name = response.body.data.member_info.nickname;
            that.headimg = response.body.data.member_info.headimg;
            that.days = response.body.data.total_day;
            that.min = response.body.data.total_mins;
            that.Kcal = response.body.data.total_kcal;
            that.money = response.body.data.total_money;

          }, response => {
            // error callback
            alert('获取当前状态失败')
          });
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
.contain{
  color: white;
  overflow-x: hidden;
  height: 100%;
  background: url(../assets/background.jpg) center center / cover no-repeat;
  .head{
    width: 1.75rem;
    height: 1.75rem;
    margin:0 auto;
    margin-top: .35rem;
    background: url(../assets/u4.png) center center / cover no-repeat;
    img{
      width: 1rem;
      height: 1rem;
      border-radius: 100%;
      margin-top: .35rem;
      margin-left: .35rem;
      border: 3px solid white;
    }
  }
  .name{
    color: white;
    font-size: .16rem;
    text-align: center;
    margin-top: .13rem;
    .l{
      display: inline-block;
      margin-right: .12rem;
      margin-bottom: 0.03rem;
      border:1px solid white;
      border-radius: 100%;
      width: .02rem;
      height:.02rem;
    }
    .r{
      display: inline-block;
      margin-left: .12rem;
      margin-bottom: 0.03rem;
      border:1px solid white;
      border-radius: 100%;
      width: .02rem;
      height:.02rem;
    }
  }
  .num{
    font-size: .2rem;
    text-align: center;
  }
  .derc{
    text-align: center;
    span{
      display: inline-block;
      border:2px solid white;
      width: .15rem;
      vertical-align: middle;
      margin-top: -0.03rem;
    }
  }
  .icon{
    margin-top: .2rem;
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
    width: 2.57rem;
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

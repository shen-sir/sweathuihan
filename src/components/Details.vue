<template>
  <div class="container">
    <div class="slider">
      <img v-for="item in imgs" src="../assets/info.jpg">
    </div>
    <p class="name">{{this.$route.query.name}}</p>
    <div class="tag">
      <span class="one">望京</span>
      <span class="two">泳</span>
    </div>
    <p class="price">￥{{this.$route.query.money}}</p>
    <p class="reward"><span>每次奖励{{this.$route.query.daymoney}}元</span></p>
    <p class="position"><span></span>{{this.$route.query.location}}</p>
    <p class="tel">{{this.$route.query.phone}}</p>
    <div class="des">
    <p class="titel">使用说明</p>
    <p class="text">1.完成购买后，您将收到确认信息和验证码
    <br>2.凭验证码到对应场馆换取您的健身卡
    <br>3.在您未验证健身卡之前可以随时退款
    <br>4.客服联系方式：通过Sweet挥汗公众号留言或拨打客服电话 
    </p>
    <router-link   :to="{ path: '/pay',query:{info:this.$route.query} }">
      <div class="btn">开始挥汗</div>
    </router-link>
  </div>
  </div>
  
</template>

<script>
export default {
  name: 'details',
  data () {
    return {
      imgs: JSON.parse(this.$route.query.imgs)
    }
  },
  created(){
    console.log(this.$route)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
div.container{
  p{
    padding: .05rem 0.2rem;
  }
  /*border: 1px solid red;*/
  height: 100%;
  background: #ededed;
  div.slider{
    position: relative;
    /*border: 1px solid red;*/
    height: 2.23rem;
    img{
      width: 100%;
      position: absolute;
    }
  }
  .name{
    text-align: center;
  }
  .tag{
    text-align: center;
    .one{
        background: #cccccc;
        padding: 0px 3px;
        color: white;
        margin-left: .1rem;
        /*float: right;*/
    }
    .two{
      background: #00d2ff;
      color: white;
      /*float: right;*/
      padding: 0px 3px;
    }
  }
  .price{
    text-align: center;
    font-size: .25rem;
  }
  .reward{
    text-align: center;
    span{
      border: 1px solid #ff8e44;
      display: inline-block;
      margin: 0 auto;
      color: #ff8e44;
      padding: 0 .1rem;
    }
    
  }
  .position{
    border-top: 1px solid black;
    margin-top: .1rem;
  }
  .des{
    border-top:.1rem solid #c1c1c1;
  }
  .btn{
    width:100%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    font-size: .24rem;
    color: white;
    /*border: 1px solid black;*/
    background: #ff8e44;
    position: absolute;
    bottom: 0;
  }
  
  
}
</style>

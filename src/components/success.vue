<template>
  <div class="contain">
    <h1 class="yes">支付成功!</h1>
    <div class="code">
      <span>请查看短信验证码</span>
    </div>
    <h1 class="tip">请到店出示验证码即可换取健身卡</h1>
    <div class="btn">
      分享
    </div>
  </div>
</template>

<script>
export default {
  name: 'success',
  data () {
    return {

    }
  },
  methods:{
    
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
  background: url(../assets/sbg.jpg) center center / cover no-repeat;
  .yes{
    margin-top: 2.4rem;
    text-align: center;
    font-size: .18rem;
    padding-left: .12rem;
    margin-bottom: .3rem;
  }
  .code{
    height: 1.07rem;
    width: 3.21rem;
    margin: 0 auto;
    background: url(../assets/code.png) center center / contain no-repeat;
    /*text-align: right;*/
    font-size: .2rem;
    color: #613e22;
    font-weight: bold;
    line-height: 1.07rem;
    span{
      margin-left: 1rem;
    }
  }
  .tip{
    text-align: center;
    font-size: .18rem;
    margin-top: .4rem;
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
    position: absolute;
    bottom: 0;
  }
}
</style>

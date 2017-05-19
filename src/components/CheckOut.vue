<template>
  <div class="contain">
    <h1>本次训练结果</h1>
    <div class="icon">
      <div class="tex">
            <img class="icon" src="../assets/u1.png" >
            <p class="tit">运动时间</p>
            <img class="line" src="../assets/line.png" >
            <p><strong>362</strong>/min</p>
          </div>
          <div class="tex">
            <img class="icon" src="../assets/u2.png" >
            <p class="tit">燃烧卡路里</p>
            <img class="line" src="../assets/line.png" >
            <p><strong>362</strong>/min</p>
          </div>
          <div class="tex">
            <img class="icon" src="../assets/u3.png" >
            <p class="tit">赚取金钱</p>
            <img class="line" src="../assets/line.png" >
            <p><strong>362</strong>/min</p>
          </div>
    </div>
    <div class="wx">
      请分享后到微信中查看奖励
    </div>
    <div class="btn">
      分享
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckOut',
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
  background: url(../assets/cbg.jpg) center center / cover no-repeat;
  h1{
    margin-top: 2.8rem;
    font-size: .18rem;
    padding-left: .12rem;
    margin-bottom: .3rem;
  }
  .icon{
    .tex{
        overflow-x: hidden;
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

<template>
  <div class="contain">
    <div class="context">
      <img class="top" src="../assets/p1.png" alt="">
      <div class="bottom">
        <div class="time">
          <h1>00:01:21<span></span></h1>
        </div>
        <div class="kll">
          <p><span class="fire"></span>燃烧卡路里<span class="line2"></span><strong>362</strong>/Kcal</p>
        </div>
        <div class="num">
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
      </div>
    </div>
    <div class="stop">结束健身</div>
  </div>
</template>

<script>
export default {
  name: 'CheckIn',
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
  height: 100%;
  background: url(../assets/background.jpg) center center / cover no-repeat;
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
  }
  .stop{
    width: 100%;
    height: .50rem;
    position: absolute;
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

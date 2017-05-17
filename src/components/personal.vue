<template>
  <div class="contain">
    <div class="head">
      <img src="../assets/info.jpg" >
    </div>
    <p class="name"><span class="l"></span>苏格拉滴滴滴滴滴<span class="r"></span></p>
    <div class="time">
      <span></span>
      <p>健身打卡</p>
    </div>
    <div class="svg">
      <span>Feb</span>
      <span>Feb</span>
      <span>Feb</span>
      <span>Feb</span>
      <span>Feb</span>
      <span>Feb</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span class="line2">Feb</span>
      <span class="line2">Feb</span>
      <span class="line2">Feb</span>
      <span class="line2">Feb</span>
      <span class="line2">Feb</span>
      <span class="line2">Feb</span>
      <span>7</span>
      <span>8</span>
      <span>9</span>
      <span>10</span>
      <span>11</span>
      <span>12</span>
      <svg style="position:absolute;top:0;left:0;" width="100%" height="100%" viewBox="0 0 400 118" version="1.1" xmlns="http://www.w3.org/2000/svg">
           <path d="M16 27
           A 22 22, 0, 1, 0,47 27
           " stroke="#f92659" stroke-width="1" fill="transparent"/>
           <path d="M83 27
           A 22 22, 0, 1, 0,114 27
           " stroke="#f92659" stroke-width="1" fill="transparent"/>
           <path d="M150 27
           A 22 22, 0, 1, 0,181 27
           " stroke="#f92659" stroke-width="1" fill="transparent"/>
           <path d="M217 27
           A 22 22, 0, 1, 0,248 27
           " stroke="#f92659" stroke-width="1" fill="transparent"/>
           <path d="M284 27
           A 22 22, 0, 1, 0,315 27
           " stroke="#f92659" stroke-width="1" fill="transparent"/>
           <path d="M351 27
           A 22 22, 0, 1, 0,382 27
           " stroke="#f92659" stroke-width="1" fill="transparent"/>

           <path d="M16 89
           A 22 22, 0, 1, 0,47 89
           " stroke="#f92659" stroke-width="1" fill="transparent"/>
           <path d="M83 89
           A 22 22, 0, 1, 0,114 89
           " stroke="#f92659" stroke-width="1" fill="transparent"/>
           <path d="M150 89
           A 22 22, 0, 1, 0,181 89
           " stroke="#f92659" stroke-width="1" fill="transparent"/>
           <path d="M217 89
           A 22 22, 0, 1, 0,248 89
           " stroke="#f92659" stroke-width="1" fill="transparent"/>
           <path d="M284 89
           A 22 22, 0, 1, 0,315 89
           " stroke="#f92659" stroke-width="1" fill="transparent"/>
           <path d="M351 89
           A 22 22, 0, 1, 0,382 89
           " stroke="#f92659" stroke-width="1" fill="transparent"/>
      </svg>
    </div>
    <div class="card">
      <span></span>
      <p>我的健身房</p>
    </div>
    <div class="cardinfo">
      <div class="c">
        <p class="title">远东健身房</p>
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
        <hr>
        <p class="join">2018-2-16&nbsp&nbsp&nbsp&nbsp到期</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personal',
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
  width: 100%;
  height: 100%;
  background: url(../assets/user.jpg) center center / cover no-repeat;
  overflow-x: hidden;
  .head{
    width: 1.25rem;
    height: 1.25rem;
    margin:0 auto;
    margin-top: .35rem;
    background: url(../assets/u4.png) center center / cover no-repeat;
    img{
      width: .72rem;
      height: .72rem;
      border-radius: 100%;
      margin-top: .23rem;
      margin-left: .24rem;
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
  .time{
    height: .19rem;
    /*border:1px solid black;*/
    margin-top: .44rem;
    color: white;
    span{
      display: inline-block;
      width: .15rem;
      height: .2rem;
      background: url(../assets/u5.png) center center / cover no-repeat;
      margin-left: .16rem;
      margin-bottom: .03rem;
    }
    p{
      display: inline-block;
      margin-left: .12rem;
      vertical-align: super;
      font-size: .18rem;
    }
  }
  .card{
    height: .19rem;
    /*border:1px solid black;*/
    margin-top: .24rem;
    color: white;
    span{
      display: inline-block;
      width: .25rem;
      height: .11rem;
      background: url(../assets/u6.png) center center / cover no-repeat;
      margin-left: .1rem;
      margin-bottom: .06rem;
    }
    p{
      display: inline-block;
      margin-left: .12rem;
      vertical-align: super;
      font-size: .18rem;
    }
  }
  .cardinfo{
    margin-top: .25rem;
    /*border:1px solid red;*/
    .c{
      width: 3.51rem;
      height: 1.72rem;
      border-radius: .2rem;
      border:1px solid white;
      margin: 0 auto;
      .title{
        font-size: .15rem;
        color: white;
        margin-top: .1rem;
        margin-left: .15rem;
      }
      .tex{
        overflow-x: hidden;
        width: 32.533%;
        height: 1.1rem;
        display: inline-block;
        color: white;
        font-size: .15rem;
        text-align: center;
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
      hr{
        border-style: dashed;
        border-color: white;
      }
      .join{
        color: white;
        text-align: right;
        padding-right: .1rem;
      }
    }
  }
  .svg{
    height: 1.1rem;
    position: relative;
    color: white;
    padding-top: .2rem;
    span{
      display: inline-block;
      width: 15.6666%;
      text-align: center;
      font-size: .13rem;
    }
    .line2{
      margin-top: .2rem;
    }
  }
}
</style>

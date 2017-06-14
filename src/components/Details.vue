<template>
  <div class="container">
  <div class="head">
     <div v-bind:style="{left:style.left+'px',width:style.width+'px'}" class="slider">
      <img @touchstart="start" @touchmove="move" @touchend="end" v-for="item in this.$route.query.imgs" :src="item">
    </div>
  </div>
    <ul class="index">
      <li v-for="(item,index) in this.$route.query.imgs" v-bind:class="{'active':sliderIndex[index]}"></li>
    </ul>
    <!-- <div class="tag">
      <span class="one">望京</span>
      <span class="two">泳</span>
    </div> -->
    <p class="price">{{this.$route.query.money}}&nbsp元<span class="text">&nbsp/位</span></p>
    <p class="reward"><span>每次奖励{{this.$route.query.daymoney}}元</span></p>
    <hr class="line">
    <!-- <div class="info">
      <div class="left">
        <p class="name">{{this.$route.query.name}}</p>
        <p class="position">{{this.$route.query.location}}</p>
      </div>
      <a :href="'tel:'+this.$route.query.phone">
        <div class="right">
          <img src="../assets/phone.png" >
        </div>
      </a>
    </div> -->
    <hr class="line">
    <!-- <p class="titel">使用说明</p>
    <ul class="des">
      <li>完成购买后，您将收到确认信息和验证码</li>
      <li>凭验证码到对应场馆换取您的健身卡</li>
      <li>在您未验证健身卡之前可以随时退款</li>
      <li>客服联系方式：通过Sweat挥汗公众号留言或拨打客服电话</li>
    </ul> -->
    <router-link   :to="{ path: '/pay',query:this.$route.query }">
      <div class="btn">即刻购买</div>
    </router-link>
  </div>
  
</template>

<script>
export default {
  name: 'details',
  data () {
    return {
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
  beforeCreate(){

  },
  watch:{
    index(newVal, oldVal){
      this.sliderIndex[oldVal] = false;
      this.sliderIndex[newVal] = true;
    }
  },
  methods:{
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
      
    }
  },
  created(){
    console.log(this.$route)
    // if(this.$route.query.imgs.length){
    //   this.sliderIndex = this.$route.query.imgs.length
    // }
    for(let i=0;i<this.imglength;i++){
      // alert(1)
      this.sliderIndex.push(false)
    }
    this.sliderIndex[0] = true;
    //调整滚动条
    document.body.scrollTop = 0;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
a{
  color:black;
}
div.container{
  /*overflow-x: hidden;*/
  font-family: arial,verdana,Microsoft YaHei,Tahoma,Simsun,sans-serif;
  p{
    padding: .05rem 0.2rem;
  }
  /*border: 1px solid red;*/
  height: 100%;
  /*background: #ededed;*/
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
  .tag{
    text-align: center;
    .one{
        background: #cccccc;
        padding: 0px 3px;
        color: white;
        margin-left: .1rem;
    }
    .two{
      background: #00d2ff;
      color: white;
      padding: 0px 3px;
    }
  }
  .price{
    font-size: .22rem;
    color: #ff3939;
    margin-top: .15rem;
    .text{
      font-size: .13rem;
    }
  }
  .reward{
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
  .line{
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
        width: 50%;
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
  .btn{
    width:100%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    font-size: .24rem;
    color: white;
    /*border: 1px solid black;*/
    background: #ff3939;
    position: fixed;
    bottom: 0;
  }
  
  
}
</style>

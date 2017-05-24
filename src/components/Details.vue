<template>
  <div class="container">
    <div v-bind:style="{left:style.left+'px',width:style.width+'px'}" class="slider">
      <img @touchstart="start" @touchmove="move" @touchend="end" v-for="item in this.$route.query.imgs" :src="item">
    </div>
    <p class="name">{{this.$route.query.name}}</p>
    <!-- <div class="tag">
      <span class="one">望京</span>
      <span class="two">泳</span>
    </div> -->
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
      
    </div>
    <router-link   :to="{ path: '/pay',query:{info:this.$route.query} }">
      <div class="btn">开始挥汗</div>
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
        }
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
        // this.slider.className = 'cnt';
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
        // this.icon[this.index].className = 'curr';
        // this.slider.className = 'cnt f-anim';
        this.style.left = -this.index*this.viewWidth ;
      }
      //解绑事件
      // this.slider.removeEventListener('touchmove',this,false);
      // this.slider.removeEventListener('touchend',this,false);
      
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
  overflow-x: hidden;
  p{
    padding: .05rem 0.2rem;
  }
  /*border: 1px solid red;*/
  height: 100%;
  background: #ededed;
  div.slider{
    transition: all 0.5s;
    position: relative;
    /*border: 1px solid red;*/
    /*width: 3000px;*/
    height: 2.23rem;
    img{
      width: 100vw;
      height: 2.23rem;
      /*position: absolute;*/
      float: left;
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
    padding-bottom: .8rem;
    background: #ededed;
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
    position: fixed;
    bottom: 0;
  }
  
  
}
</style>

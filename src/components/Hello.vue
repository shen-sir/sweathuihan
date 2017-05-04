<template>
  <div class="hello">
    <div class="search">
      <input placeholder="查找附近场馆" type="text">
      <img src="../assets/search.png">
    </div>
    
      <div v-for="item in list"  class="contain">
        <router-link   :to="{ path: '/details' }">
        <img src="../assets/info.jpg" >
        </router-link>
        <p class="name">{{item.name}}<span class="km">3.7km</span><span class="one">{{item.location}}</span><span class="two">泳</span></p>
        <p class="price">￥{{item.money}} <span>每次奖励7.8元</span>  </p>
      </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: ['list'],
  data () {
    return {
      items: [
        
      ]
    }
  },
  created(){
    console.log(this.list)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
div.hello{
  /*border: 1px solid red;*/
  height: 100%;
  background: #ededed;
  .search{
    width: 100%;
    height: .35rem;
    background: #ededed;
    margin: 0;
    input{
      width: 80%;
      background: #ededed;
      border: 0;
      margin-top: .06rem;
      margin-left: .09rem;
      text-align: center;
      vertical-align:super;
    }
    img{
      height: .22rem;
    }
  }
  .contain{
    font-size: .15rem;
    background: white;
    padding-bottom: .1rem;
    margin-bottom: .1rem;
    img{
      width: 100%;
    }
    p,.tag{
      padding: 0 .20rem;
    }
    .name{
      .km{
        float: right;
      }
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
      padding-top: .05rem;
      span{
        color: #999999;
      }
    }
  }
}
</style>

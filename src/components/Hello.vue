<template>
  <div class="hello">
    <!-- <div class="search">
      <input placeholder="查找附近场馆" type="text">
      <img src="../assets/search.png">
    </div> -->
    
      <div v-for="item in list"  class="contain">
        <router-link   :to="{ path: '/details', query: { vid:item.vid,name: item.name, money:item.money,daymoney:(Math.floor(item.money)/365).toFixed(2),location: item.location,phone:item.phone,imgs:item.pic}}">
        <img :src="item.pic[0]" >
        </router-link>
        <p class="name">{{item.name}}<span class="km">{{ (Math.floor(item.distance)/1000).toFixed(2)}}km</span><!-- <span class="one">{{item.location}}</span> -->
        <!-- <span class="two">泳</span> --></p>
        <p class="reward">每次奖励{{(Math.floor(item.money)/365).toFixed(2)}}元</p>
        <p class="price">{{item.money}}&nbsp 元/位<span></span>  </p>
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
    // console.log(this.list)
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
    /*margin-bottom: .1rem;*/
    img{
      width: 100%;
      height: 2.23rem;
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
    .reward{
      font-size: .12rem;
      color: #999999;
    }
    .price{
      color: #ff3939;
      padding-top: .05rem;
      font-size: .12rem;
      span{
        color: #999999;
      }
    }
  }
}
</style>

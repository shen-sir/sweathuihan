<template>
  <div class="contain">
    <div class="head">
      <img src="../assets/info.jpg" >
    </div>
    <p class="name">苏格拉</p>
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
  overflow: hidden;
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
      margin-top: 23px;
      margin-left: 24px;
      border: 3px solid white;
    }
  }
  .name{
    color: white;
    border:1px solid black;
    font-size: .16rem;
    text-align: center;
    margin-top: .13rem;
  }
}
</style>

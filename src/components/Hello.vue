<template>
  <div class="hello">
    <div class="search">
      <input placeholder="查找附近场馆" type="text">
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
div.hello{
  border: 1px solid red;
  height: 100%;
  .search{
    width: 100%;
    height: .35rem;
    background: #ededed;
    margin: 0;
    input{
      width: 80%;
      background: #ededed;
      border: 1px solid black;
      margin-top: .06rem;
      margin-left: .09rem;
      text-align: center;
    }
  }
}
</style>

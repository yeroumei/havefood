<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,html{
	width: 100%;
	height: auto;
	margin: 0 auto;
	background: #fff;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  /*margin-top: 50px;*/
}
h1, h2 {
  font-weight: normal;
  margin: 0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  /* display: inline-block; */
  margin: 0;
}
a {
	text-decoration: none;
  color: #333;
	cursor: pointer;
}
p{
	padding: 0;
	margin: 0;
}
/* 单元框样式 */
.mint-radiolist-title {
    font-size: 16px;
    margin: 10px;
    display: block;
    color: #888;
}
.mint-radio-input:checked + .mint-radio-core {
    background-color: #ff4c39;
    border-color: #ff4c39;
}
/* 切换头像时的上传图片覆盖头像上方 */
.nut-avatar .text{
		height: 100%;
}
.nut-uploader{
    width: 100%;
		height: 100%;
    /* background-color: #ff4c39; */
}
/* 菜谱描述 */
/* .nut-textinput input{
		height: 3.5em;
		font-size: 16px;
	} */
  .van-uploader__upload-icon{
    color: #aaaaaa;
  }
  .van-uploader__upload{
    background-color: #f5f5f5;
    border: .5px solid #cfcfcf;
  }
</style>

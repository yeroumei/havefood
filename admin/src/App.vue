<template>
  <div id="app">
    <keep-alive>
      <router-view />
      <a-layout class="index">
        <a-layout-header>
          <Topbar></Topbar>
        </a-layout-header>
        <a-layout>
          <a-layout-sider>
            <Menubar></Menubar>
          </a-layout-sider>
          <a-layout-content class="content">
            <router-view name="content"></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </keep-alive>
  </div>
</template>

<script>
import Menubar from "./components/common/menu";
import Topbar from "./components/common/topbar";
export default {
  name: 'App',
  components: { Menubar, Topbar },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #333;
  /* margin-top: 60px; */
}
.ant-layout-header{
    background-color: #ff4c39;
}
.ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after, .ant-menu-inline .ant-menu-item::after{
  border-right: 3px solid #ff4c39;
}
.ant-menu-item > a:hover{
  color: #ff4c39;
}
.ant-menu-item-selected > a, .ant-menu-item-selected > a:hover{
  color: #ff4c39;
}
.ant-menu-submenu-title:hover{
  color: #ff4c39;
}
.ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after{
  background: linear-gradient(to right, #ff4c39, #ff4c39); /*渐变*/
}
.ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before{
  background: linear-gradient(to right, #ff4c39, #ff4c39);
}
.index{
  height: 100%;
  background-color: #f1f6fa;
}
.content{
  /* margin: 24px; */
  background-color: #f1f6fa;
  box-shadow: 0px 2px 8px grey
}
/* #components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    margin: 16px 28px 16px 0;
    float: left;
  } */
.mytitle {
  background-color: white;
  height: 3rem;
  line-height: 3rem;
  font-size: 1rem;
  padding-left: 1rem;
  box-shadow: 0px 2px 8px grey;
}
.ant-form-item {  /*弹窗input的间距*/
  margin-bottom: 14px;
}
</style>

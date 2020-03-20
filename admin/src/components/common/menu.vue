<template>
  <a-menu
    mode="inline"
    :defaultOpenKeys="['sub1','sub2','sub3']"
    :style="{ height: '100%' }"
    :selectedKeys="[$route.path]"
  >
    <a-sub-menu key="sub1">
      <span slot="title"><a-icon type="appstore" class="icon" />食谱管理</span>
      <a-menu-item :key="'/cookbook'"><router-link :to='{name:"cookbook"}'>食谱管理</router-link></a-menu-item>
      <a-menu-item :key="'/classify'"><router-link :to='{name:"classify"}'>分类管理</router-link></a-menu-item>
      <!-- <a-menu-item :key="'/recommend'"><router-link :to='{name:"recommend"}'>推荐管理</router-link></a-menu-item> -->
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <span slot="title"><a-icon type="share-alt" class="icon"  />动态管理</span>
      <a-menu-item :key="'/moving'"><router-link :to='{name:"moving"}'>动态分享</router-link></a-menu-item>
      <a-menu-item :key="'/news'"><router-link :to='{name:"news"}'>资讯文章</router-link></a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub3">
      <span slot="title"><a-icon type="user" class="icon" />用户管理</span>
      <a-menu-item :key="'/userinfo'"><router-link :to='{name:"userinfo"}'>用户信息</router-link></a-menu-item>
      <a-menu-item :key="'/log'"><router-link :to='{name:"log"}'>操作日志</router-link></a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub4">
      <span slot="title"><a-icon type="laptop" class="icon" />系统维护</span>
      <a-menu-item :key="'/notice'"><router-link :to='{name:"notice"}'>通知管理</router-link></a-menu-item>
      <a-menu-item :key="'/about'"><router-link :to='{name:"about"}'>关于我们</router-link></a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script>
  export default {
    data() {
      return {
        collapsed: false,
      };
    },
  };
</script>

<style scoped>

  #components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    /* background: rgba(255, 255, 255, 0.2); */
    margin: 16px 28px 16px 0;
    float: left;
  }
  .icon{
    color: #ff4c39;
  }
</style>
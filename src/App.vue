<template>
  <div id="app">
    <el-container style="height: 100vh; border: 3px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>导航一</template
            >
            <el-menu-item-group>
              <el-menu-item index="1-1"
                ><router-link to="/map">Map</router-link></el-menu-item
              >
              <el-menu-item index="1-2"
                ><router-link to="/home">Home</router-link></el-menu-item
              >
              <el-menu-item index="1-3"
                ><router-link to="/about">About</router-link></el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>hello world</span>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}
#app {
  width: 100vw;
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

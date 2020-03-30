<template>

  <div id="app">&nbsp;&nbsp;
  <router-link to="/"><el-button>home</el-button></router-link>&nbsp;&nbsp;
  <router-link to="/sample1"><el-button>Uploder</el-button></router-link>&nbsp;&nbsp;
  <router-link to="/sample2"><el-button>Calendar</el-button></router-link>
  <router-view/>
</div>
</template>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 2px;
}
</style>
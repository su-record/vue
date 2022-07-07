<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>

  <pre>{{ obj1 }}</pre>
  <pre>{{ obj2 }}</pre>

  <!--  <router-view />-->
</template>

<script setup lang="ts">
import { createLoadPageVo, LoadPageVo } from "@/testcode/LoadPageVo";

const obj1 = new LoadPageVo({
  res_s_tm: new Date().toISOString(),
  res_s_show_page_id: "page_id_001",
});
const obj2 = createLoadPageVo({
  res_s_tm: new Date().toISOString(),
  res_s_show_page_id: "page_id_002",
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
  <app-header />
  <app-content />
</template>

<script>
import AppHeader from "./components/Contants/app-header.vue";
import AppContent from "./components/Contants/app-content.vue";

export default {
  components: {
    [AppHeader.name]: AppHeader,
    [AppContent.name]: AppContent,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
  height: 100%;
  background-color: rgb(240 243 245);
  overflow: hidden;
}
body,
html {
  height: 100%;
}
</style>

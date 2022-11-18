<template>
  <div class="app-content" v-cloak>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
  </div>
</template>

<script>
export default {
  name: "app-content",
};
</script>

<style >
[v-cloak]{
  display: none;
}
.app-content{
  height: 100%;
  overflow: auto;
}

</style>
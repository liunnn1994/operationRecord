<template>
  <div>
    <el-button type="primary">主要按钮</el-button>
    <el-radio label="1">备选项</el-radio>
    <hello-world />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "App",
  components: { HelloWorld },
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>

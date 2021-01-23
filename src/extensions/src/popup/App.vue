<template>
  <div>
    <el-button type="primary">主要按钮</el-button>
    <el-radio label="1">备选项</el-radio>
  </div>
</template>

<script>
import { getSyncStorage } from "@/lib/storage";

export default {
  name: "App",
  components: {},
  async mounted() {
    const opt = await getSyncStorage({ options: {} });
    console.log(opt);
  },
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>

<template>
  <el-container class="main-box">
    <el-header class="main-header"><main-header /></el-header>
    <el-main><router-view /></el-main>
    <el-footer class="main-footer">
      <main-footer />
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import { defineComponent } from "vue";
import or from "op-rec";

console.log(new or());

export default defineComponent({
  name: "App",
  components: { MainHeader, MainFooter },
});
</script>
<style>
body {
  margin: 0;
}
.main-box {
  height: 100vh;
}
.main-header {
  padding-top: 10px;
}
.main-header .el-divider {
  margin-top: 10px;
  margin-bottom: 0;
}
.main-footer {
  text-align: center;
}
</style>

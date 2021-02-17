<template>
  <div class="main-header-box">
    <div class="main-header-text" v-if="routePath === '/'" v-text="header" />
    <el-page-header v-else @back="goBack" :content="header" />
    <el-divider />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { routes } from "@/router/index";

export default defineComponent({
  name: "MainHeader",
  computed: {
    routePath(): string {
      return this.$route.path;
    },
    header() {
      const routePath = this.routePath as string;
      return routes.find((route) => route.path === routePath)?.title ?? "404";
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>

<style scoped></style>

<template>
  <div>
    <el-divider style="margin-top: 0" />
    <div>
      <template v-for="(item, i) in footers" :key="i">
        <el-link :href="item.href" :title="item.title">
          <fa-icon :icon="item.icon" />
        </el-link>
        <el-divider v-if="i !== footers.length - 1" direction="vertical" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MainFooter",
  data() {
    return {
      footers: [
        {
          href: "https://www.2077tech.com",
          icon: "home",
          title: "主页",
        },
        {
          href: "https://github.com/asdjgfr/operationRecord",
          icon: ["fab", "github"],
          title: "github",
        },
        {
          href: "/about",
          icon: "info-circle",
          title: "关于",
        },
      ],
    };
  },
});
</script>

<style scoped></style>

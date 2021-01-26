<template>
  <el-footer height="28">
    <el-row>
      <el-col :span="12">
        <el-link type="primary" target="_blank" href="https://www.2077tech.com/"
          >主页</el-link
        >
        <el-divider direction="vertical" />
        <el-link
          type="primary"
          target="_blank"
          href="https://github.com/asdjgfr/operationRecord"
          >开源地址</el-link
        >
      </el-col>
      <el-col :span="12" class="footer-icon">
        <el-button
          icon="el-icon-files"
          circle
          @click="openTab('videos')"
          size="mini"
          title="已录制列表"
        />
        <el-divider direction="vertical" />
        <el-button
          icon="el-icon-s-tools"
          circle
          @click="openTab('options')"
          size="mini"
          title="设置"
        />
      </el-col>
    </el-row>
  </el-footer>
</template>

<script>
import { bg } from "@/lib/pubFn";

export default {
  name: "PopupFooter",
  methods: {
    async openTab(type) {
      switch (type) {
        case "options":
          chrome.tabs.create({ url: "/options.html" });
          break;
        case "videos":
          const { options } = await bg.getSyncStorage({ options: {} });
          chrome.tabs.create({ url: `${options.hostName}/files` });
          break;
      }
    },
  },
};
</script>

<style scoped>
.footer-text,
.footer-icon {
  text-align: center;
  height: 28px;
  line-height: 28px;
  margin: 0;
}
.footer-icon {
  text-align: right;
}
</style>

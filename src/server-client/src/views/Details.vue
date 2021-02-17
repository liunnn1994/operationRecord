<template>
  <div class="detail-video">
    <video :src="path" controls>
      <track :src="subtitle" default kind="subtitles" :srclang="language" />
    </video>

    <div v-if="path" style="text-align: center">
      <el-divider />
      <a :href="path" download>
        <el-button type="primary" plain>下载视频</el-button>
      </a>
      <el-divider direction="vertical" />
      <a :href="subtitle" download>
        <el-button type="primary" plain>下载字幕</el-button>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getRecsByIDs } from "@/api/recordManagement.ts";

export default defineComponent({
  name: "Details",
  data() {
    return {
      path: "",
      subtitle: "",
    };
  },
  computed: {
    id() {
      return this.$route.query.id ?? "未知ID";
    },
    language() {
      return navigator.language;
    },
  },
  created() {
    this.getVideoInfo();
  },
  methods: {
    async getVideoInfo() {
      const info = await getRecsByIDs(this.id);
      if (Array.isArray(info.data) && info.data.length) {
        this.path = info.data[0].path;
        this.subtitle = info.data[0].subtitle;
      } else {
        this.$message.error("视频获取失败！");
      }
    },
  },
});
</script>

<style scoped>
.detail-video {
  width: 90vw;
  resize: both;
  margin: 0 auto;
  height: 100%;
}
.detail-video video {
  display: block;
  width: auto;
  height: 100%;
  margin: 0 auto;
}
</style>

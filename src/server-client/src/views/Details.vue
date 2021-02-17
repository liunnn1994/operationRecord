<template>
  <div class="detail-video">
    <video :src="path" controls></video>
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
    };
  },
  computed: {
    id() {
      return this.$route.query.id ?? "未知ID";
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
      } else {
        this.$message.error("视频获取失败！");
      }
      console.log(info);
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

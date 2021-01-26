<template>
  <el-main>
    <div class="align-center">
      <el-button
        :type="buttonInfo.type"
        :icon="buttonInfo.icon"
        :title="buttonInfo.title"
        circle
        style="font-size: 50px"
        @click="toggleRec"
      />
    </div>
    <div
      v-show="isPlaying"
      class="align-center time-show"
      v-text="durationFormat"
    />
  </el-main>
</template>

<script>
let timer = null;
export default {
  name: "PopupMain",
  data() {
    return {
      isPlaying: false,
      duration: 0,
      startTime: 0,
    };
  },
  computed: {
    buttonInfo() {
      const { isPlaying } = this;
      return {
        type: isPlaying ? "danger" : "primary",
        icon: isPlaying ? "el-icon-video-pause" : "el-icon-video-play",
        title: isPlaying ? "停止录制" : "开始录制",
      };
    },
    durationFormat() {
      const { duration } = this;
      return `${("0" + Math.floor(duration / 3600000)).substr(-2)}:${(
        "0" + Math.floor((duration / 60000) % 60)
      ).substr(-2)}:${("0" + Math.floor((duration / 1000) % 60)).substr(-2)}`;
    },
  },
  methods: {
    toggleRec() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        document.querySelector("html").classList.add("start-rec");
        this.startTime = new Date().getTime();
        chrome.desktopCapture.chooseDesktopMedia(
          ["screen", "window", "tab", "audio"],
          (streamId, options) => {
            console.log("streamId", streamId);
            console.log("options", options);
            if (streamId !== "") {
              this.handleRec();
            } else {
              this.isPlaying = !this.isPlaying;
            }
            document.querySelector("html").classList.remove("start-rec");
          }
        );
      } else {
        clearTimeout(timer);
      }
    },
    handleRec() {
      clearTimeout(timer);
      this.duration = new Date().getTime() - this.startTime;
      timer = setTimeout(this.handleRec, 1000);
    },
  },
};
</script>

<style scoped>
.time-show {
  font-size: 55px;
}
</style>

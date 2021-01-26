<template>
  <el-container direction="vertical">
    <popup-main />
    <popup-footer />
  </el-container>
</template>

<script>
import PopupFooter from "@/components/PopupFooter";
import PopupMain from "@/components/PopupMain";
import { bg } from "@/lib/pubFn";

export default {
  name: "App",
  components: { PopupFooter, PopupMain },
  async mounted() {
    const opt = await bg.getSyncStorage({ options: {} });
    console.log(opt);
    console.log("挂载", new Date().toLocaleString());
  },
};
</script>

<style>
html {
  width: 400px;
}
.start-rec {
  width: 630px;
  height: 520px;
}
.align-center {
  text-align: center;
}
</style>

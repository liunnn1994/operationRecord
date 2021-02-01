export default function () {
  this.isREC = true;

  navigator.mediaDevices
    .getDisplayMedia({
      video: true,
      audio: false,
    })
    .then((stream: any) => {
      const video = document.querySelector("video");
      video.srcObject = stream;
      console.log("执行", stream);
    })
    .catch((err: any) => {
      console.error(err);
    });
  return "开始录制";
}

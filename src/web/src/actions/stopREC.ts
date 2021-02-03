export default function () {
  this._dataavailableCB = () => {
    this.isREC = false;
    this.startTime = 0;
    this.mediaRecorder = undefined;
    this.stream = undefined;
    this.recordedChunks.splice(0);
    this._dataavailableCB = function () {}.bind(this);
  };

  // 停止所有track
  (this.stream?.getTracks() ?? []).forEach((track: any) => track.stop());
  // 停止mediaRecorder
  this.mediaRecorder?.stop();
}

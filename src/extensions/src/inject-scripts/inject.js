console.log("OPS_REC注入成功");
(function () {
  Object.defineProperty(console, "OPS_REC", {
    value: function () {
      console.log("OPS_REC注入成功");
    },
    writable: false,
  });
})();

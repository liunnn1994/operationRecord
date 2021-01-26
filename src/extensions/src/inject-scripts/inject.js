console.log("OPS_REC注入成功");
(async function () {
  Object.defineProperty(console, "OPS_REC", {
    value: function () {
      console.log("OPS_REC注入成功");
    },
    writable: false,
  });

  console.log(JSON.parse(sessionStorage.getItem("OPS_REC")));
})();

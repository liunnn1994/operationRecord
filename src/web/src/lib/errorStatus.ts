export const mediaDevicesErrors = {
  AbortError: "发生了与以下任何其他异常不匹配的错误或故障。",
  InvalidStateError:
    "调用 getDisplayMedia() 的context中的 document 不是完全激活的; 例如，也许它不是最前面的标签。",
  NotAllowedError:
    "用户拒绝授予访问屏幕区域的权限，或者不允许当前浏览实例访问屏幕共享。",
  NotFoundError: "没有可用于捕获的屏幕视频源。",
  NotReadableError:
    "用户选择了屏幕，窗口，标签或其他屏幕数据源，但发生了硬件或操作系统级别错误或锁定，从而预先占用了共享所选源。",
  OverconstrainedError:
    "创建流后，由于无法生成兼容的流导致应用指定的 constraints 失效。",
  TypeError:
    "指定的 constraints 包括调用 getDisplayMedia() 时不允许的constraints。 这些不受支持的constraints是 advanced 的，任何约束又有一个名为 min 或 exact 的成员。",
};

export const envErrors = {
  NotLocalhostOrHttps:
    "由于chrome政策限制，mediaDevices 需要在本机IP（127.0.0.1或localhost）或https下才可使用。",
  NotSupportMediaDevices:
    "您的设备不支持mediaDevices API。请更新chrome或更换现代浏览器重试。",
};

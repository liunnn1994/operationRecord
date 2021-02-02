declare global {
  interface MediaDevices {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
  }
  interface MediaTrackConstraintSet {
    displaySurface?: ConstrainDOMString;
    logicalSurface?: ConstrainBoolean;
  }
}
export interface FetchConfig {
  method?: string;
  headers?: typeof Headers;
  body?: any;
  mode?: "cors" | "no-cors" | "same-origin";
  credentials?: "omit" | "same-origin" | "include" | any;
  cache?:
    | "default"
    | "no-store"
    | "reload"
    | "no-cache"
    | "force-cache"
    | "only-if-cached";
  redirect?: "follow" | "error" | "manual";
  referrer?: "no-referrer" | "client" | string;
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "unsafe-url";
  integrity?: string;
}

export interface iProps {
  url?: "local" | string;
  fetchConfig?: FetchConfig;
  mediaConstraints?: any;
  mimeType?: string;
}

export interface ORInterface extends iProps {
  startREC: Function;
  stopREC: Function;
  _toBlob: Function;
  toWebm: Function;
  _download: Function;
  getSupportedMimeTypes: Function;
}

interface MediaDevicesErrorStatus {
  key:
    | "AbortError"
    | "InvalidStateError"
    | "NotAllowedError"
    | "NotFoundError"
    | "NotReadableError"
    | "OverconstrainedError"
    | "TypeError";
}

export interface ErrorStatus {
  key: MediaDevicesErrorStatus["key"];
}

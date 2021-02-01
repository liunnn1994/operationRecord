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
}

export interface ORInterface extends iProps {
  startREC: Function;
  stopREC: Function;
}

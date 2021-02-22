// Type definitions for op-rec
// Project: op-rec
// Definitions by: liu https://github.com/asdjgfr/operationRecord

import {
  CurrencyInterfaces,
  DomOptions,
  FetchConfig,
  HotKeys,
  IProps,
  LoggerItem,
  GlobalTypesInterfaces,
} from "./op-rec";

export as namespace opRec;
export = OpRecInterface;

declare class OpRecInterface {
  private props?: IProps;
  DOM: HTMLElement | undefined;
  startTime: number;
  status: GlobalTypesInterfaces["status"];
  recordedChunks: any[];
  logs: LoggerItem[];
  mediaRecorder: MediaRecorder | undefined;
  stream: MediaStream | undefined;
  startREC: () => Promise<void>;
  stopREC: () => void;
  toggleREC: () => void;
  on: (type: GlobalTypesInterfaces["eventsType"], cb: () => void) => void;
  _download: () => void;
  getSupportedMimeTypes: () => void;
  _dataavailableCB: () => void;
  _clickDom: (type: string) => void;
  url?: "local" | string;
  fetchConfig?: FetchConfig;
  mediaConstraints?: any;
  mimeType?: string;
  lang?: string;
  hotKeys?: HotKeys;
  dom?: DomOptions;
  constructor(props?: IProps);
  logger: (
    type: CurrencyInterfaces["loggerType"],
    e: ErrorEvent | string
  ) => void;
  onStartREC?: (stream: MediaStream) => {};
  onStopREC?: () => void;
  onPauseREC?: () => void;
  onResumeREC?: () => void;
  _errorCollector: (e: ErrorEvent) => void;
  getBlob: () => string | Blob;
  getExtname: () => string;
  reset: () => void;
  _upload: () => void;
}

declare namespace OpRecInterface {}

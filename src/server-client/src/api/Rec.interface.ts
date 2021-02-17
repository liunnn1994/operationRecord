export interface LogInterface {
  level: number;
  content: string;
  timestamp: number;
}
export interface RecSimplify {
  name: string;
  mimetype: string;
  size: string;
  encoding: string;
}
export interface RecFull extends RecSimplify {
  logs: LogInterface[];
}

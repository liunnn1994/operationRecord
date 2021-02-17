export interface LogInterface {
  level: number;
  content: string;
  timestamp: number;
}
export interface TableData {
  name: string;
  mimetype: string;
  size: string;
  encoding: string;
}
export interface RecFull extends TableData {
  logs: LogInterface[];
}

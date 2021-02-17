import axios from "axios";

export function getAllRecs(): Promise<unknown> {
  return axios.post("/v1/get-all-records");
}
export function getAllRecsCount(): Promise<unknown> {
  return axios.post("/v1/get-all-records-count");
}

export function getRecsByLimit(skip: number, take: number): Promise<unknown> {
  return axios.post("/v1/get-records-by-limit", { skip, take });
}

export function getRecsByIDs(): Promise<unknown> {
  return axios.post("/v1/get-record-by-ids");
}

export function removeRecsByIDs(): Promise<unknown> {
  return axios.post("/v1/remove-records-by-ids");
}

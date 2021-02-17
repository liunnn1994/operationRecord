import axios from "axios";
import { Res } from "@/api/Index.interface";
import { post } from "@/api/index";

export async function getAllRecs(): Promise<Res> {
  return post("/v1/get-all-records");
}
export async function getAllRecsCount(): Promise<Res> {
  return post("/v1/get-all-records-count");
}

export async function getRecsByLimit(skip: number, take: number): Promise<Res> {
  return post("/v1/get-records-by-limit", { skip, take });
}

export async function getRecsByIDs(id: number | string): Promise<Res> {
  return post("/v1/get-record-by-ids", { id });
}

export async function removeRecsByIDs(id: number): Promise<Res> {
  return post("/v1/remove-records-by-ids", { id });
}

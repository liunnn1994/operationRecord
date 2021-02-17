import axios from "axios";
import { Res } from "@/api/Index.interface";
import { ElMessage } from "element-plus";

async function Post(url: string, data: any = {}): Promise<Res> {
  const cancelTokenSource = axios.CancelToken.source();
  try {
    const res = (
      await axios.post(url, { ...data, cancelToken: cancelTokenSource.token })
    ).data;
    res.cancel = cancelTokenSource.cancel;
    if (res.code !== 200) {
      ElMessage.error(res.message);
    }
    return res;
  } catch (error) {
    return {
      code: 500,
      error,
    };
  }
}

export const post = Post;

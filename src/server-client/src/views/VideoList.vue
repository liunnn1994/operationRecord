<template>
  <div class="video-list">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="名称" width="150" />
      <el-table-column prop="mimetype" label="mime类型" />
      <el-table-column prop="encoding" label="编码格式" />
      <el-table-column prop="size" label="大小" />
      <el-table-column label="操作" align="center">
        <template #default="scope"
          ><el-button @click="handleView(scope.row)" type="primary" size="small"
            >查看</el-button
          >
          <el-button @click="handleDel(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { ElLoading } from "element-plus";
import { defineComponent } from "vue";
import {
  getAllRecsCount,
  getRecsByLimit,
  removeRecsByIDs,
} from "@/api/recordManagement";

let cancel: any;
export default defineComponent({
  name: "VideoList",
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
    };
  },
  async created() {
    const totalRes = await getAllRecsCount();
    this.total = totalRes.data as number;
    await this.refreshTable();
  },
  methods: {
    handleView(row: unknown) {
      console.log(row);
    },
    async handleDel(row: any) {
      try {
        await (this as any).$confirm(
          "此操作将永久删除该文件, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );
        await removeRecsByIDs(row.id);
        await this.refreshTable();
      } catch (e) {
        (this as any).$message("删除已取消！");
      }
    },
    handleSizeChange(size: number) {
      this.pageSize = size;
      this.refreshTable();
    },
    handleCurrentChange(currentPage: number) {
      this.currentPage = currentPage;
      this.refreshTable();
    },
    async refreshTable() {
      if (cancel) {
        cancel();
      }
      const loading = ElLoading.service({ fullscreen: true });
      const tableData = await getRecsByLimit(
        (this.currentPage - 1) * this.pageSize,
        this.pageSize
      );
      this.tableData = tableData.data as any;
      cancel = tableData.cancel;
      loading.close();
    },
  },
});
</script>

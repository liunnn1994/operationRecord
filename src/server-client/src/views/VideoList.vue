<template>
  <div class="video-list">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="名称" width="150" />
      <el-table-column prop="mimetype" label="mime类型" />
      <el-table-column prop="encoding" label="编码格式" />
      <el-table-column prop="size" label="大小" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button @click="handleDel(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VideoList",
  data() {
    return {
      tableData: [{ name: "1", mimetype: "2", size: "3", encoding: "4" }],
    };
  },
  methods: {
    handleDel(row: unknown) {
      console.log(row);
    },
  },
});
</script>

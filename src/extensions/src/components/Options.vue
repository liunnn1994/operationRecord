<template>
  <el-form ref="form" :rules="rules" :model="form" :label-width="labelWidth">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="(opt, i) in options"
        :title="opt.title"
        :name="opt.name"
        :key="opt.name"
      >
        <template slot="title">
          <el-tag style="margin-right: 5px">{{ i + 1 }}</el-tag>
          {{ opt.title }}
        </template>
        <el-form-item
          v-for="c in opt.children"
          :label="c.label"
          :required="c.required || null"
          :prop="c.key"
          :key="c.key"
        >
          <el-input
            v-if="c.type === 'input'"
            :placeholder="c.placeholder"
            v-model="form[c.key]"
          />
          <el-color-picker
            v-else-if="c.type === 'color'"
            v-model="form[c.key]"
            show-alpha
          />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <div style="padding-top: 5px; text-align: center">
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>
  </el-form>
</template>

<script>
import { getSyncStorage, setSyncStorage } from "@/lib/storage";

export default {
  name: "Options",
  data() {
    return {
      activeNames: [],
      options: [
        {
          name: "host",
          title: "服务器配置",
          children: [
            {
              label: "服务器地址",
              key: "hostName",
              type: "input",
              required: true,
              placeholder: "e.g. http://localhost:9527",
              rules: [
                {
                  required: true,
                  message: "请输入服务器地址",
                  trigger: "blur",
                },
                {
                  validator(rule, value, callback) {
                    try {
                      new URL(value);
                      callback();
                    } catch (e) {
                      callback(new Error("URL格式不正确"));
                    }
                  },
                  trigger: "blur",
                },
              ],
            },
          ],
        },
        {
          name: "display",
          title: "显示配置",
          children: [
            {
              label: "鼠标遮罩颜色",
              key: "maskerColor",
              type: "color",
              required: false,
              rules: [
                {
                  required: true,
                  message: "请选择鼠标遮罩颜色",
                  trigger: "change",
                },
              ],
            },
          ],
        },
      ],
      form: {
        hostName: "",
        maskerColor: "rgba(255,215,0,0.8)",
      },
      serverStatusLoading: false,
      message: {
        close() {},
      },
    };
  },
  computed: {
    labelWidth() {
      return (
        Math.max(
          ...this.options.reduce((acc, cur) => {
            acc.push(...cur.children.map((c) => c.label.length));
            return acc;
          }, [])
        ) *
          18 +
        10 +
        "px"
      );
    },
    rules() {
      return this.options.reduce((acc, cur) => {
        cur.children.forEach((c) => {
          acc[c.key] = c.rules ?? [];
        });
        return acc;
      }, {});
    },
  },
  created() {
    this.initOptions();
  },
  methods: {
    async initOptions() {
      this.activeNames.splice(
        0,
        this.activeNames.length,
        ...this.options.map((opt) => opt.name)
      );
      const opts = await getSyncStorage({ options: this.form });
      for (const [key, value] of Object.entries(opts.options)) {
        this.$set(this.form, key, value);
      }
    },
    onSave() {
      this.message.close();
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.message = this.$message.success("保存成功");
          await setSyncStorage({ options: this.form });
        } else {
          this.message = this.$message.error("保存失败");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped></style>

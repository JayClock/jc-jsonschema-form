<template>
  <monaco-editor
    class="editor"
    :code="code"
    :onChange="handleCodeChange"
    title="Schema"
  ></monaco-editor>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import MonacoEditor from "./components/MonacoEditor";
export default defineComponent({
  name: "App",
  components: {
    MonacoEditor,
  },
  setup() {
    // schema对象
    const schema = {
      type: "string",
    };
    // 对象转字符串
    const toJson = (data: any) => {
      return JSON.stringify(data, null, 2);
    };

    const schemaRef: Ref<any> = ref(schema);
    // 在表单值有任何变化的时候会触发该回调方法，并把新的值进行返回
    const handleCodeChange = (code: string) => {
      let schema: any;
      try {
        schema = JSON.parse(code);
      } catch (e) {
        console.log(e);
      }
      schemaRef.value = schema;
    };
    return {
      handleCodeChange,
      code: toJson(schemaRef.value),
    };
  },
});
</script>

<style>
.editor {
  min-height: 400px;
}
</style>

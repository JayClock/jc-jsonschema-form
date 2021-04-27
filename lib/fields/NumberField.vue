<template>
  <input :value="value" type="number" @input="handleChange" />
</template>

<script lang="ts">
import { defineComponent, toRef } from "@vue/runtime-core";
import { FiledPropsDefine } from "../types";

export default defineComponent({
  name: "NumberField",
  props: FiledPropsDefine,
  setup(props) {
    const value = toRef(props, "value");
    const handleChange = (e: any) => {
      const value = e.target.value;
      const num = Number(value);
      if (Number.isNaN(num)) {
        props.onChange(undefined);
      } else {
        props.onChange(num);
      }
    };
    return {
      value,
      handleChange,
    };
  },
});
</script>

<style></style>

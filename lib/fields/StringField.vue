<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { FieldProps } from '../types'
export default defineComponent({
  name: 'StringField',
  props: FieldProps,
  setup(props) {
    // 把props中的单向数据流提出为双向绑定对象
    const value = toRef(props, 'value')
    const handleChange = (e: Event) => {
      console.log(e)
      const currentTarget = e.target as HTMLInputElement
      props.onChange(currentTarget.value)
    }
    return {
      handleChange,
      value,
    }
  },
})
</script>

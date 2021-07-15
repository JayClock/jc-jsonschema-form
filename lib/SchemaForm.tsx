import { defineComponent, provide, PropType } from '@vue/runtime-core'
import { FieldProps, Theme } from './types'
import SchemaItem from './SchemaItem'
import { Schema } from './types'
import { SchemaFormContextKey } from './context'
import { Ref, watch } from 'vue'

interface ContextRef {
  doValidate: () => {
    errors: any[]
    valid: boolean
  }
}

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const context = {
      SchemaItem,
    }

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              return {
                valid: true,
                errors: [],
              }
            },
          }
        }
      },
      { immediate: true },
    )

    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          value={value}
          onChange={handleChange}
          rootSchema={schema}
        ></SchemaItem>
      )
    }
  },
})

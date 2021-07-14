import { defineComponent, provide, PropType } from '@vue/runtime-core'
import { FieldProps, Theme } from './types'
import SchemaItem from './SchemaItem'
import { Schema } from './types'
import { SchemaFormContextKey } from './context'

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
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const context = {
      SchemaItem,
    }

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

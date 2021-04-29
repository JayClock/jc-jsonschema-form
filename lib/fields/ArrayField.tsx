import { defineComponent } from '@vue/runtime-core'
import { FieldProps, Schema } from '../types'
import { useVJSFContext } from '../context'

export default defineComponent({
  name: 'ArrayObject',
  props: FieldProps,
  setup(props) {
    const context = useVJSFContext()
    const handleMultiTypeChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }
    return () => {
      const { SchemaItem } = context
      const { schema, rootSchema, value } = props
      // 多类型数组
      const isMultiType = Array.isArray(schema.items)
      if (isMultiType) {
        // items 可能有多种类型，此处约束为数组
        const items: Schema[] = schema.items as []
        const arr = Array.isArray(value) ? value : []
        return items.map((schema: Schema, index: number) => (
          <SchemaItem
            schema={schema}
            key={index}
            rootSchema={rootSchema}
            value={arr[index]}
            onChange={(v: any) => handleMultiTypeChange(v, index)}
          ></SchemaItem>
        ))
      }
    }
  },
})

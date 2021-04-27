import { DefineComponent, defineComponent, inject } from '@vue/runtime-core'
import { FieldProps, Schema } from '../types'
import { SchemaFormContextKey } from '../context'
import SchemaItem from '../SchemaItem'
import { isObject } from '../utils'

const schema: Schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    age: {
      type: 'number',
    },
  },
}

// 定义SchemaItem类型
type SchemaItem = DefineComponent<typeof FieldProps>

console.log(typeof FieldProps)
export default defineComponent({
  name: 'ObjectField',
  props: FieldProps,
  setup(props) {
    const context: { SchemaItem: SchemaItem } | undefined = inject(
      SchemaFormContextKey,
    )
    if (!context) {
      throw Error('SchemaForm shoule be used')
    }

    const handleChange = (key: string, v: string) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value } = props
      const properties = schema.properties || {}
      const currentValue = isObject(value) ? value : {}
      return Object.keys(properties).map((key: string, index: number) => (
        <SchemaItem
          schema={properties[key]}
          rootSchema={rootSchema}
          value={currentValue}
          key={index}
          onChange={(v: any) => handleChange(key, v)}
        ></SchemaItem>
      ))
    }
  },
})

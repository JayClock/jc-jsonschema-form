import { defineComponent } from '@vue/runtime-core'
import { useVJSFContext } from '../context'
import { FieldProps } from '../types'
import { isObject } from '../utils'

export default defineComponent({
  name: 'ObjectField',
  props: FieldProps,
  setup(props) {
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
      const { SchemaItem } = useVJSFContext()
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}
      return Object.keys(properties).map((key: string, index: number) => (
        <SchemaItem
          schema={properties[key]}
          rootSchema={rootSchema}
          value={currentValue[key]}
          key={index}
          onChange={(v: any) => handleChange(key, v)}
        ></SchemaItem>
      ))
    }
  },
})

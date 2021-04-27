import { defineComponent, inject } from '@vue/runtime-core'
import { FieldProps, Schema } from '../types'
import SchemaItem from '../SchemaItem'
import { SchemaFormContextKey } from '../context'

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

export default defineComponent({
  name: 'ObjectField',
  props: FieldProps,
  setup() {
    const context = inject(SchemaFormContextKey)
    return () => {
      return <div>Object Field</div>
    }
  },
})

import { defineComponent } from '@vue/runtime-core'
import { FieldProps, Schema } from '../types'
import SchemaItem from '../SchemaItem'

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
    return () => {
      return <div>Object Field</div>
    }
  },
})

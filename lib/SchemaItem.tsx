import { computed, defineComponent } from '@vue/runtime-core'
import NumberField from './fields/NumberField.vue'
import StringField from './fields/StringField'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'
import { FieldProps, SchemaTypes } from './types'
import { retrieveSchema } from './utils'

export default defineComponent({
  name: 'SchemaItem',
  props: FieldProps,
  setup(props) {
    const retrivedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return retrieveSchema(schema, rootSchema, value)
    })
    return () => {
      const { schema } = props
      const retrievedSchema = retrivedSchemaRef.value
      const { type } = schema
      // TODO: 如果type没有指定，我们需要猜测这个type
      let Component: any
      switch (type) {
        case SchemaTypes.STRING:
          Component = StringField
          break
        case SchemaTypes.NUMBER:
          Component = NumberField
          break
        case SchemaTypes.OBJECT:
          Component = ObjectField
          break
        case SchemaTypes.ARRAY:
          Component = ArrayField
          break
        default: {
          console.log(`${type} is not supported`)
        }
      }
      return <Component {...props} schema={retrievedSchema}></Component>
    }
  },
})

import { computed, defineComponent } from 'vue'

import { FieldProps, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringFeild',
  props: FieldProps,
  setup(props) {
    const handleChange = (v: string) => {
      // console.log(e)
      props.onChange(v)
    }

    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.TextWidget, props)
      return widgetRef.value
    })

    const widgetOptionsRef = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { widget, properties, items, ...rest } = props.uiSchema
      return rest
    })

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { schema, rootSchema, errorSchema, ...rest } = props

      const TextWidget = TextWidgetRef.value

      return (
        <TextWidget
          {...rest}
          onChange={handleChange}
          errors={errorSchema.__errors}
          schema={schema}
          options={widgetOptionsRef.value}
        />
      )
    }
  },
})

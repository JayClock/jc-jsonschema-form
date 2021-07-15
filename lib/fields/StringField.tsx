import { defineComponent } from 'vue'

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

    const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget)

    return () => {
      const { schema, rootSchema, errorSchema, ...rest } = props

      const TextWidget = TextWidgetRef.value

      return (
        <TextWidget
          {...rest}
          onChange={handleChange}
          errors={errorSchema.__errors}
          schema={schema}
        />
      )

      // return (
      //   <input type="text" value={props.value as any} onInput={handleChange} />
      // )
    }
  },
})

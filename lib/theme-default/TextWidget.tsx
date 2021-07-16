import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import { defineComponent } from 'vue'
import { withFormItem } from './FormItem'

const TextWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'TextWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        console.log(e)
        props.onChange(e.target.value)
      }
      return () => {
        return (
          <input
            type="text"
            value={props.value as any}
            onInput={handleChange}
          />
        )
      }
    },
  }),
)

export default TextWidget

import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import { defineComponent } from 'vue'
import FormItem from './FormItem'

const TextWidget: CommonWidgetDefine = defineComponent({
  name: 'TextWidget',
  props: CommonWidgetPropsDefine,
  components: {
    FormItem,
  },
  setup(props) {
    const handleChange = (e: any) => {
      console.log(e)
      props.onChange(e.target.value)
    }
    return () => {
      return (
        <form-item {...props}>
          <input
            type="text"
            value={props.value as any}
            onInput={handleChange}
          />
        </form-item>
      )
    }
  },
})

export default TextWidget

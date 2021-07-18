import { SelectionWidgetPropsDefine, SelectionWidgetDefine } from '../types'
import { defineComponent, ref, watch } from 'vue'
import { withFormItem } from './FormItem'

const Selection: SelectionWidgetDefine = withFormItem(
  defineComponent({
    name: 'SelectionWidget',
    props: SelectionWidgetPropsDefine,
    setup(props) {
      const currentValue = ref(props.value)
      // 实现双向绑定
      watch(currentValue, (newVal) => {
        if (newVal !== props.value) {
          props.onChange(newVal)
        }
      })
      watch(
        () => props.value,
        (newVal) => {
          if (newVal !== currentValue.value) {
            currentValue.value = newVal
          }
        },
      )
      return () => {
        const { options } = props
        return (
          <select multiple={true} v-model={currentValue.value}>
            {options.map((op) => (
              <option value={op.value}>{op.key}</option>
            ))}
          </select>
        )
      }
    },
  }),
)

export default Selection

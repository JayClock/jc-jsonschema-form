import { defineComponent, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'SelectionWidget',
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    options: {
      type: Array as PropType<
        {
          key: string
          value: any
        }[]
      >,
      required: true,
    },
  },
  setup(props) {
    const currentValue = ref(props.value)
    // 实现双向绑定
    watch(currentValue, (newVal, oldval) => {
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
})

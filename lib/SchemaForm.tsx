import { defineComponent, provide, PropType } from '@vue/runtime-core'
import { FieldProps, Theme } from './types'
import SchemaItem from './SchemaItem'
import { Schema } from './types'
import { SchemaFormContextKey } from './context'
import { ErrorSchema, validateFormData } from './validator'
import { ref, Ref, shallowRef, watch, watchEffect } from 'vue'
import Ajv, { Options } from 'ajv'

interface ContextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

/**
 * 默认 ajv 配置
 */
const defaultAjvOptions: Options = {
  allErrors: true,
}

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const context = {
      SchemaItem,
    }

    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    /**
     * 校验工具
     */
    const validatorRef: Ref<Ajv> = shallowRef() as any

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
    })

    /**
     * 把子组件中setup 返回给父组件
     */
    const validateResolveRef = ref()
    const validateIndex = ref(0)
    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) doValidate()
      },
      { deep: true },
    )
    async function doValidate() {
      const index = (validateIndex.value += 1)
      const res = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )
      if (index !== validateIndex.value) return
      errorSchemaRef.value = res.errorSchema
      validateResolveRef.value(res)
      validateResolveRef.value = undefined
    }
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            async doValidate() {
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                doValidate()
              })
            },
          }
        }
      },
      { immediate: true },
    )

    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          value={value}
          onChange={handleChange}
          rootSchema={schema}
          errorSchema={errorSchemaRef.value || {}}
        ></SchemaItem>
      )
    }
  },
})

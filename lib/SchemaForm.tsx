import { defineComponent, provide, PropType } from '@vue/runtime-core'
import { FieldProps, Theme } from './types'
import SchemaItem from './SchemaItem'
import { Schema } from './types'
import { SchemaFormContextKey } from './context'
import { ErrorSchema, validateFormData } from './validator'
import { Ref, shallowRef, watch, watchEffect } from 'vue'
import Ajv, { Options } from 'ajv'

interface ContextRef {
  doValidate: () => {
    errors: any[]
    valid: boolean
  }
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
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              // const valid = validatorRef.value.validate(
              //   props.schema,
              //   props.value,
              // )
              const res = validateFormData(
                validatorRef.value,
                props.value,
                props.schema,
                props.locale,
              )

              errorSchemaRef.value = res.errorSchema

              return res
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

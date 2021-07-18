import { inject } from '@vue/runtime-core'
import { Ref } from 'vue'
import { CommonFieldType, CommonWidgetDefine } from './types'
export const SchemaFormContextKey = Symbol()

interface ContextDefine {
  SchemaItem: CommonFieldType
  formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>
}

// 获取从SchemaForm组件传递的参数,用于解决循环引用的问题
export function useVJSFContext(): ContextDefine {
  const context: ContextDefine | undefined = inject(SchemaFormContextKey)
  // 判断祖先组件是否有内容
  if (!context) {
    throw Error('SchemaForm shoule be used')
  }
  return context
}

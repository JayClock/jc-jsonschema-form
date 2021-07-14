import { inject } from '@vue/runtime-core'
import { CommonFieldType } from './types'
export const SchemaFormContextKey = Symbol()

// 获取祖先组件传递的参数
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useVJSFContext() {
  const context: { SchemaItem: CommonFieldType } | undefined =
    inject(SchemaFormContextKey)
  // 判断祖先组件是否有内容
  if (!context) {
    throw Error('SchemaForm shoule be used')
  }
  return context
}

import { inject } from '@vue/runtime-core'
import { Ref } from 'vue'
import { CommonFieldType, CommonWidgetDefine } from './types'
export const SchemaFormContextKey = Symbol()

// 获取祖先组件传递的参数
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useVJSFContext() {
  const context:
    | {
        SchemaItem: CommonFieldType
        formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>
      }
    | undefined = inject(SchemaFormContextKey)
  // 判断祖先组件是否有内容
  if (!context) {
    throw Error('SchemaForm shoule be used')
  }
  return context
}

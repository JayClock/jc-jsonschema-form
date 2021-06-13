import { mount } from '@vue/test-utils'
import JsonSchemaForm, { NumberField } from '../../lib'

describe('JsonSchemaForm', () => {
  it('数字类型正常渲染', async () => {
    let value = ''
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'number',
        },
        value: value,
        onChange: (v: any) => {
          value = v
        },
      },
    })
    const numberField = wrapper.findComponent(NumberField)
    expect(numberField.exists()).toBeTruthy()
    const input = numberField.find('input')
    input.element.value = '123'
    input.trigger('input')
    expect(value).toBe(123)
  })
})

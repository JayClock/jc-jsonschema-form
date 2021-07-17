export default {
  name: 'Demo',
  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        minLength: 10,
        test: true,
        title: 'password',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 're try password',
      },
      color: {
        type: 'string',
        format: 'color',
        title: 'Input Color',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async customValidate(data: any, errors: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (data.pass1 !== data.pass2) {
          errors.pass2.addError('密码必须相同')
        }
        console.log(errors)
        resolve()
      }, 2000)
    })
  },
  uiSchema: {},
  default: 1,
}

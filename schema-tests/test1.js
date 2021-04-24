// Node.js require:
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
// 引入ajv校验规则
addFormats(ajv)
// 自定义校验规则
ajv.addFormat('test', (data) => {
  return data === 'test'
})

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'test',
      //   minLength: 2,
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
    },
    isWorker: {
      type: 'boolean',
    },
  },
}

const validate = ajv.compile(schema)
const valid = validate({
  name: 'jayclock',
})
if (!valid) console.log(validate.errors)

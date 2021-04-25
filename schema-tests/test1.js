// Node.js require:
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const addKeywords = require('ajv-keywords')
const localize = require('ajv-i18n')

const ajv = new Ajv()
// 引入ajv校验规则
addFormats(ajv)
// 引入ajv关键字
addKeywords(ajv)
// 自定义校验规则
// ajv.addFormat('test', (data) => {
//   return data === 'test'
// })
// 自定义关键字
ajv.addKeyword({
  keyword: 'test',
  // compile: (schema, praentSchema) => {
  //   return () => true
  // },
  // metaSchema: {
  //   type: 'string',
  // },
  macro: (schema, praentSchema) => {
    return {
      minLength: 10,
    }
  },
})

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'email',
      test: '1',
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

if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}

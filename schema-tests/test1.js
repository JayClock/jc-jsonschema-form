// Node.js require:
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const addKeywords = require('ajv-keywords')
// const localize = require('ajv-i18n')
const addErrors = require('ajv-errors')

const ajv = new Ajv({ allErrors: true })
// 引入ajv校验规则
addFormats(ajv)
// 引入ajv关键字
addKeywords(ajv)
// 引入ajv错误信息
addErrors(ajv)
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
      // format: 'email',
      // test: '1',
      minLength: 10,
      // 自定义错误信息
      errorMessage: {
        type: '必须是字符串',
        minLength: '长度必须小于10',
      },
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
  // localize.zh(validate.errors)
  console.log(validate.errors)
}

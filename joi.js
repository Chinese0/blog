const Joi = require('joi')
const schema = Joi.object({
  username: Joi.string().min(2).max(15).required().error(new Error('username属性没有通过')),
  birth: Joi.number().min(1900).max(2020).error(new Error('birth没有通过验证'))
})
async function run() {
  try {
    const value = await schema.validateAsync({
      username: 'ab'
    })
  } catch (err) {
    console.log(err.message);
    return
  }
  console.log('验证通过');
}
run();
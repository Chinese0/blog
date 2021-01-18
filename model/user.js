// 创建用户集合
const mongoose = require('mongoose')
// 引入加密
const bcrypt = require('bcrypt')
// 引入joi模块
const Joi = require('joi')
// 创建集合规则
const userSchema = new mongoose.Schema({ // schema 是构造函数
  username: {
    type: String,
    minlength: 1,
    maxlength: 20,
    required: true,
  },
  email: {
    type: String,
    unique: true, // 保证邮箱地址不重复
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  // 0 启用状态  1 禁止状态
  state: {
    type: Number,
    default: 0
  }

})
// 创建集合
const User = mongoose.model('User', userSchema)

async function createUser() {
  const salt = await bcrypt.genSalt(10)
  const pass = await bcrypt.hash('123456', salt)
  const user = await User.create({
    username: '申雨茜',
    email: '891278127@qq.com',
    password: pass,
    role: 'admin',
    state: 0
  })
}
// createUser()

// 验证用户信息
const validateUser = user => {
  // 定义对象的验证规则
  const schema = Joi.object({
    username: Joi.string().min(1).max(20).required().error(new Error('用户名不符合规范')),
    email: Joi.string().email().required().error(new Error('邮箱不符合规范')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,20}$/).required().error(new Error('密码不符合规范')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
    state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
  })
  // 验证
  return schema.validateAsync(user);
}

// 将用户集合作为模块成员进行导出
module.exports = {
  User,
  validateUser
}
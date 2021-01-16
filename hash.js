// 导入bcrypt
const bcrypt = require('bcrypt')

async function run(string) {
  // 生成随机字符串
  const salt = await bcrypt.genSalt(10)
  const ssl = await bcrypt.hash(string, salt)
  console.log(ssl);
  return ssl
}
module.exports = run()
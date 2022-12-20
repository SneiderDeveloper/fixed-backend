const bcrypt = require('bcrypt')


const verifyPassword = async () => {
    const password = 'sj wjsn'
    const hash = '$2b$10$LQadGEy4irx0ZpAmWhhM0uZDUqsYUPW3FyQ.4ph2.tw5RV/8XCO62'
    const isMatch = await bcrypt.compare(password, hash)
    console.log(isMatch)
}

verifyPassword()

const bcrypt = require('bcrypt')


const hashPassword = async () => {
    const password = 'sj wjsn'
    const hash = await bcrypt.hash(password, 10)
    console.log(hash)
}

hashPassword()

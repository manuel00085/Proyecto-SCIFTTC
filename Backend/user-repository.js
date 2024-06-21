import DBLocal from 'db-local'
import bcrypt from 'bcrypt'
const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true }
})

export class UserRepository {
  static create ({ username, password }) {
    // validaciones
    console.log(username)
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (user) throw new Error('username already exists')

    const id = crypto.randomUUID()
    const hashedPassword = bcrypt.hashSync(password, 10)

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return id
  }

  static login ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) throw new Error('username does not exist')

    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) throw new Error('password is invalid')

    const { password: _, ...publicUser } = user

    return publicUser
  }
}

export class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('username must be a string')
    if (username.length < 3) throw new Error('username must be at least 3 characters long ')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('password must be a string')
    if (password.length < 6) throw new Error('password must be at least 6 characters long')
  }
}

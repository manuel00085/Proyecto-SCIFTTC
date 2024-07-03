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
    if (!user) throw new Error('Usuario no encontrado')

    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) throw new Error('Contraseña Invalida')

    const { password: _, ...publicUser } = user

    return publicUser
  }
}

export class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('El nombre de usuario debe ser texto')
    if (username.length < 3) throw new Error('El nombre de usuario debe tener al menos 3 caracteres')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('password must be a string')
    if (password.length < 6) throw new Error('La contraseña debe contener 6 caracteres como mínimo')
  }
}

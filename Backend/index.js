import express from 'express'
import { UserRepository } from './user-repository.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { SECRET_JWT_KEY } from './config.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT ?? 3000

app.get('/', (req, res) => {
  res.send('hello word')
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  try {
    const user = UserRepository.login({ username, password })
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, {
      expiresIn: '1hr'
    })
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .send({ user, token })
  } catch (error) {
    res.status(401).send(error.message)
  }
})

app.post('/register', (req, res) => {
  const { username, password } = req.body
  console.log(req.body)

  try {
    const id = UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    res.status(400).send(error.message)
  }
})
app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {
  res.render('protected', { username: 'midudev' })
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

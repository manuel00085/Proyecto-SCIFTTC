import { Router } from "express";
import { SECRET_JWT_KEY } from '../config.js'
import { UserRepository } from '../user-repository.js'
import jwt from 'jsonwebtoken'

const router = Router();

router.get('/', (req, res) => {
    res.send('hello word')
  })
  
  router.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log(password)
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
      res.status(401).json({ message: error.message })
    }
  })
  
  router.post('/register', (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
  
    try {
      const id = UserRepository.create({ username, password })
      res.send({ id })
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  router.post('/logout', (req, res) => {})
  
  router.get('/protected', (req, res) => {
    const token = req.cookies.access_token
    if (!token) {
      console.log('no hay token')
      return res.status(403).send('access not authorized')
    }
    try {
      const data = jwt.verify(token, SECRET_JWT_KEY)
      console.log('si hay token')
      res.json({ message: 'This is a protected route', data })
    } catch (error) {
      return res.status(403).send('access not authorized')
    }
  })
  
export default router
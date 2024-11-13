import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './Routes/users.routes.js'


const app = express()


app.use(express.json())


app.use(cors({
  origin: 'http://localhost:5173', // Frontend
  credentials: true
}))


app.use(userRouter)

app.use(cookieParser())

const PORT = process.env.PORT ?? 4000


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

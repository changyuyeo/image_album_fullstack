import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import passport from 'passport'
import morgan from 'morgan'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import { MONGO_URI, COOKIE_SECRET, ORIGIN, PORT } from './config'
import passportConfig from './passport'
import userRouter from './router/user'
import imageRouter from './router/image'

const app = express()
const sessionOption = {
	saveUninitialized: false,
	resave: false,
	secret: COOKIE_SECRET
}

app.use(morgan('dev'))
app.use(cors({ origin: ORIGIN, credentials: true }))
app.use('/', express.static('./uploads'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(COOKIE_SECRET))
app.use(session(sessionOption))
app.use(passport.initialize())
app.use(passport.session())

const server = async () => {
	try {
		await mongoose.connect(MONGO_URI)
		console.log('mongoose 연결 성공!')
		passportConfig()
		app.use('/user', userRouter)
		app.use('/image', imageRouter)
		app.listen(PORT, () => console.log(`express 서버 시작! ${PORT}`))
	} catch (error) {
		console.error(error.message)
	}
}

server()

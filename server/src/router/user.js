import { Router } from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'

import { isLoggedIn, isNotLoggedIn } from '../middleware/auth'
import User from '../models/User'
import Image from '../models/Image'

const router = Router()

// GET /user
// 유저정보 API
router.get('/', async (req, res) => {
	try {
		if (req.user) {
			const user = await User.findById(req.user.id)
			return res.status(200).json(user)
		}
		return res.status(200).json(null)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

// POST /user/signup
// 회원가입 API
router.post('/signup', isNotLoggedIn, async (req, res) => {
	try {
		const { name, username, password } = req.body
		// validation
		if (!name || !username || !password)
			return res.status(400).json({ message: '빈 값이 존재합니다.' })
		const exUser = await User.findOne({ username })
		if (exUser) return res.status(400).json({ message: '이미 존재하는 아이디 입니다.' })
		if (name.length < 3) return res.status(400).json({ message: '아이디는 3자 이상으로 해주세요.' })
		if (password.length < 5)
			return res.status(400).json({ message: '비밀번호를 5자 이상으로 해주세요.' })
		const hashedPassword = await bcrypt.hash(password, 12)
		const userData = { name, username, password: hashedPassword }
		const newUser = await User.create(userData)
		await newUser.save()
		return res.status(200).json({ message: 'success' })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

// POST /user/login
// 로그인 API
router.post('/login', isNotLoggedIn, (req, res) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return res.status(500).json({ message: err })
		if (info) return res.status(400).json({ message: info })
		return req.login(user, loginErr => {
			if (loginErr) return res.status(500).json(loginErr)
			return res.status(200).json(user)
		})
	})(req, res)
})

// POST /user/logout
// 로그아웃 API
router.post('/logout', isLoggedIn, (req, res) => {
	req.logout()
	req.session.destroy()
	return res.status(200).json({ message: '로그아웃 되었습니다.' })
})

// GET /user/images
// 로그인된 유저의 이미지정보 가져오기 API
router.get('/images', isLoggedIn, async (req, res) => {
	try {
		const images = await Image.find({ user: req.user._id })
		return res.status(200).json(images)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

export default router

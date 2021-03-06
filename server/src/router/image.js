import { Router } from 'express'
import { isValidObjectId } from 'mongoose'
import fs from 'fs'
import { promisify } from 'util'
import Image from '../models/Image'
import upload from '../middleware/imageUpload'
import { isLoggedIn } from '../middleware/auth'

const router = Router()
const fileUnlink = promisify(fs.unlink) // Promise

// POST /image
// 이미지 업로드 API
router.post('/', isLoggedIn, upload.array('image', 5), async (req, res) => {
	try {
		if (!req.files) return res.status(400).json({ message: '이미지 업로드는 필수입니다.' })
		const images = await Promise.all(
			req.files.map(async file => {
				const image = await new Image({
					user: req.user._id,
					public: req.body.public,
					key: file.filename,
					originalFileName: file.originalname
				}).save()
				return image
			})
		)
		return res.status(200).json(images)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

// GET /image
// 모든 이미지 가져오기 API
router.get('/', async (req, res) => {
	try {
		const { lastId } = req.query
		if (lastId && !isValidObjectId(lastId))
			return res.status(400).json({ message: '잘못된 정보 입니다.' })
		const images = await Image.find(
			lastId ? { public: true, _id: { $lt: lastId } } : { public: true }
		)
			.sort({ _id: -1 })
			.limit(30)
		return res.status(200).json(images)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

// GET /image/me
// 로그인된 유저의 이미지정보 가져오기 API
router.get('/me', isLoggedIn, async (req, res) => {
	try {
		const { lastId } = req.query
		if (lastId && !isValidObjectId(lastId))
			return res.status(400).json({ message: '잘못된 정보 입니다.' })
		const images = await Image.find(
			lastId ? { user: req.user._id, _id: { $lt: lastId } } : { user: req.user._id }
		)
			.sort({ _id: -1 })
			.limit(30)
		return res.status(200).json(images)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

// GET /image/:id
// 특정 이미지 가져오기 API
router.get('/:imageId', async (req, res) => {
	try {
		const { imageId } = req.params
		console.log(imageId)
		if (!isValidObjectId(imageId))
			return res.status(400).json({ message: '잘못된 이미지 정보입니다.' })
		const image = await Image.findById(imageId)
		return res.status(200).json(image)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

// PATCH /image/:id/like
// 좋아요 API
router.patch('/:imageId/like', isLoggedIn, async (req, res) => {
	try {
		const { imageId } = req.params
		if (!isValidObjectId(imageId))
			return res.status(400).json({ message: '잘못된 이미지 정보입니다.' })
		const image = await Image.findOneAndUpdate(
			{ _id: imageId },
			{ $addToSet: { likes: req.user._id } }, // $addToSet: 중복 없이 $push
			{ new: true }
		)
		return res.status(200).json(image)
	} catch (error) {
		return res.status(500).json({ message: error })
	}
})

// PATCH /image/:id/unlike
// 싫어요 API
router.patch('/:imageId/unlike', isLoggedIn, async (req, res) => {
	try {
		const { imageId } = req.params
		if (!isValidObjectId(imageId))
			return res.status(400).json({ message: '잘못된 이미지 정보입니다.' })
		const image = await Image.findOneAndUpdate(
			{ _id: imageId },
			{ $pull: { likes: req.user._id } },
			{ new: true }
		)
		return res.status(200).json(image)
	} catch (error) {
		return res.status(500).json({ message: error })
	}
})

// DELETE /image/:id
// 특정 이미지 삭제 API
router.delete('/:imageId', isLoggedIn, async (req, res) => {
	try {
		const { imageId } = req.params
		if (!isValidObjectId(imageId))
			return res.status(400).json({ message: '잘못된 이미지 정보입니다.' })
		const image = await Image.findByIdAndDelete(imageId)
		if (!image) return res.status(400).json({ message: '존재하지 않는 이미지 입니다.' })
		await fileUnlink(`./uploads/${image.key}`)
		const images = await Image.find().sort({ _id: -1 }).limit(30)
		return res.status(200).json(images)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

export default router

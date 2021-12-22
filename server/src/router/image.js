import { Router } from 'express'
import Image from '../models/Image'
import upload from '../middleware/imageUpload'

const router = Router()

router.post('/', upload.single('image'), async (req, res) => {
	try {
		const newImage = await new Image({
			key: req.file.filename,
			originalFileName: req.file.originalname
		}).save()
		return res.status(200).json(newImage)
	} catch (error) {
		console.error(error.message)
		return res.status(500).json({ message: error.message })
	}
})

router.get('/', async (req, res) => {
	try {
		const images = await Image.find()
		return res.status(200).json(images)
	} catch (error) {
		console.error(error.message)
		return res.status(500).json({ message: error.message })
	}
})

export default router

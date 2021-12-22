import multer from 'multer'
import { v4 as uuid } from 'uuid'
import mime from 'mime-types'

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, './uploads'),
	filename: (req, file, cb) =>
		cb(null, `${uuid()}.${mime.extension(file.mimetype)}`)
})
const fileFilter = (req, file, cb) => {
	if (['image/png', 'image/jpeg'].includes(file.mimetype)) cb(null, true)
	else cb(new Error('invalid file type'), false)
}
const limits = { fileSize: 1024 * 1024 * 5 }
const upload = multer({ storage, fileFilter, limits })

export default upload

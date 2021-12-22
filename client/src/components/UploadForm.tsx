import { ChangeEvent, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RootState } from 'store'
import { imageUpload } from 'store/image/action'
import { FileDropper, ImagePreview } from 'components/Styled'
import ProgressBar from 'components/ProgressBar'

const UploadForm = () => {
	const dispatch = useDispatch()
	const { uploadDone, uploadError } = useSelector(
		(state: RootState) => state.image
	)

	const [file, setFile] = useState<File | null>(null)
	const [fileName, setFileName] = useState('이미지 파일을 업로드 해주세요!')
	const [percent, setPercent] = useState(0)
	const [imgSrc, setImgSrc] = useState<string | null>(null)

	const onSubmitForm = useCallback(
		async (e: ChangeEvent<HTMLFormElement>) => {
			e.preventDefault()
			const formData = new FormData()
			formData.append('image', file!)
			const uploadData = { formData, setPercent }
			dispatch(imageUpload(uploadData))
			if (uploadDone) {
				toast.success('이미지 업로드 성공!')
				setTimeout(() => setPercent(0), 3000)
				setImgSrc(null)
			} else if (uploadError) {
				toast.error(uploadError)
				setPercent(0)
				setImgSrc(null)
			}
		},
		[dispatch, file, uploadDone, uploadError]
	)

	const onChangeImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const imageFile = e.target.files![0]
		setFile(imageFile)
		setFileName(imageFile.name)
		const fileReader = new FileReader()
		fileReader.readAsDataURL(imageFile)
		fileReader.onload = () => setImgSrc(fileReader.result as string)
	}, [])

	return (
		<form onSubmit={onSubmitForm}>
			<ImagePreview src={imgSrc!} alt={fileName} imgSrc={imgSrc} />
			<ProgressBar percent={percent} />
			<FileDropper>
				{fileName}
				<input
					id="image"
					type="file"
					accept="image/*"
					onChange={onChangeImage}
				/>
			</FileDropper>
			<button
				type="submit"
				style={{
					width: '100%',
					borderRadius: '3px',
					height: 40,
					cursor: 'pointer'
				}}
			>
				제출
			</button>
		</form>
	)
}

export default UploadForm

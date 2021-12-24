import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { RootState } from 'store'
import { imageUpload } from 'store/image/action'
import ProgressBar from 'components/ProgressBar'
import {
	FileDropper,
	ImagePreview,
	ImagePreviewBox,
	ImageSubmitBtn
} from 'components/UploadFormStyled'

const UploadForm = () => {
	const dispatch = useDispatch()
	const { uploadError } = useSelector((state: RootState) => state.image)

	const [files, setFiles] = useState<FileList | null>(null)
	const [percent, setPercent] = useState(0)
	const [previews, setPreviews] = useState<any[]>([])
	const [isPublic, setIsPublic] = useState(true)
	const inputRef = useRef<HTMLInputElement | null>(null)

	const onSubmitForm = useCallback(
		async (e: ChangeEvent<HTMLFormElement>) => {
			e.preventDefault()
			const formData = new FormData()
			if (files) Array.from(files).forEach(file => formData.append('image', file))
			formData.append('public', String(isPublic))
			const uploadData = { formData, setPercent }
			dispatch(imageUpload(uploadData))
			if (uploadError) {
				toast.error(uploadError)
				setPercent(0)
				setPreviews([])
				inputRef.current!.value = ''
			} else {
				toast.success('이미지 업로드 성공!')
				setTimeout(() => setPercent(0), 3000)
				setPreviews([])
				inputRef.current!.value = ''
			}
		},
		[dispatch, files, isPublic, uploadError]
	)

	const onChangeImage = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
		const imageFiles = e.target.files!
		setFiles(imageFiles)

		const imagePreviews = await Promise.all(
			Array.from(imageFiles).map(
				async v =>
					new Promise((resolve, reject) => {
						try {
							const fileReader = new FileReader()
							fileReader.readAsDataURL(v)
							fileReader.onload = event =>
								resolve({
									imgSrc: event.target?.result,
									fileName: v.name
								})
						} catch (error) {
							reject(error)
						}
					})
			)
		)
		setPreviews(imagePreviews)
	}, [])

	const onTogglePublic = useCallback(() => setIsPublic(!isPublic), [isPublic])

	const previewImages = previews.map((v, i) => (
		<ImagePreview key={i} src={v.imgSrc} alt={v.fileName} />
	))

	const filtName =
		previews.length === 0
			? '이미지 파일을 업로드 해주세요.'
			: previews.reduce((previous, current) => `${previous} ${current.fileName}, `, '')

	return (
		<form onSubmit={onSubmitForm}>
			<ImagePreviewBox>{previewImages}</ImagePreviewBox>
			<ProgressBar percent={percent} />
			<FileDropper>
				{filtName}
				<input
					ref={ref => (inputRef.current = ref)}
					id="image"
					type="file"
					multiple
					accept="image/*"
					onChange={onChangeImage}
				/>
			</FileDropper>
			<input
				id="public-checkbox"
				type="checkbox"
				value={String(!isPublic)}
				onChange={onTogglePublic}
			/>
			<label htmlFor="public-checkbox">비공개</label>
			<ImageSubmitBtn type="submit">제출</ImageSubmitBtn>
		</form>
	)
}

export default UploadForm

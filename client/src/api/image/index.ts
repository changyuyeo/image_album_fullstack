import { AxiosPromise } from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { image } from 'api'
import { ResImagesData } from 'api/image/types'

// 모든 이미지 정보 가져오는 API
const imageFetchAPI = (): AxiosPromise<ResImagesData[]> => image.get('/')

// 이미지 저장 API
const imageUploadAPI = (
	formData: FormData,
	setPercent: Dispatch<SetStateAction<number>>
): AxiosPromise<ResImagesData> =>
	image.post('/', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
		onUploadProgress: (e: ProgressEvent) =>
			setPercent(Math.round((100 * e.loaded) / e.total))
	})

export { imageUploadAPI, imageFetchAPI }

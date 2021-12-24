import { AxiosPromise } from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { image } from 'api'
import { ResImagesData } from 'api/image/types'

// 모든 이미지 정보 가져오는 API
const imageFetchAPI = (lastImageId?: string): AxiosPromise<ResImagesData[]> =>
	lastImageId ? image.get(`/?lastId=${lastImageId}`) : image.get('/')

// 개인 이미지 정보 가져오는 API
const imageMeFetchAPI = (lastImageId?: string): AxiosPromise<ResImagesData[]> =>
	lastImageId ? image.get(`/me/?lastId=${lastImageId}`) : image.get('/me')

// 해당 이미지 정보 가져오는 API
const imageOneFetchAPI = (payload: string): AxiosPromise<ResImagesData> => image.get(`/${payload}`)

// 이미지 저장 API
const imageUploadAPI = (
	formData: FormData,
	setPercent: Dispatch<SetStateAction<number>>
): AxiosPromise<ResImagesData[]> =>
	image.post('/', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
		onUploadProgress: (e: ProgressEvent) => setPercent(Math.round((100 * e.loaded) / e.total))
	})

// 이미지 좋아요, 싫어요 API
const imageLikedAPI = (imageId: string, type: string): AxiosPromise<ResImagesData> =>
	image.patch(`${imageId}/${type}`)

// 이미지 삭제 API
const imageDeleteAPI = (imageId: string): AxiosPromise<ResImagesData[]> =>
	image.delete(`/${imageId}`)

export {
	imageFetchAPI,
	imageMeFetchAPI,
	imageOneFetchAPI,
	imageUploadAPI,
	imageLikedAPI,
	imageDeleteAPI
}

import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResImagesData } from 'api/image/types'
import { imageDelete, imageFetch, imageMeFetch, imageUpload } from 'store/image/action'

interface ImageState {
	imagesLoading: boolean
	imagesDone: boolean
	imagesError: string | null
	uploadLoading: boolean
	uploadDone: boolean
	uploadError: string | null
	deleteLoading: boolean
	deleteDone: boolean
	deleteError: string | null
	images: ResImagesData[]
	myImages: ResImagesData[]
}

const initialState: ImageState = {
	imagesLoading: false,
	imagesDone: false,
	imagesError: null,
	uploadLoading: false,
	uploadDone: false,
	uploadError: null,
	deleteLoading: false,
	deleteDone: false,
	deleteError: null,
	images: [],
	myImages: []
}

const imageSlice = createSlice({
	name: 'image',
	initialState,
	reducers: {},
	extraReducers: bulid =>
		bulid
			// 이미지 불러오기
			.addCase(imageFetch.pending, (state: ImageState) => {
				state.imagesLoading = true
				state.imagesDone = false
				state.imagesError = null
			})
			.addCase(
				imageFetch.fulfilled,
				(state: ImageState, action: PayloadAction<ResImagesData[]>) => {
					state.imagesLoading = false
					state.imagesDone = true
					if (state.images.length === 0) state.images = action.payload
					else state.images = [...state.images, ...action.payload]
				}
			)
			.addCase(imageFetch.rejected, (state: ImageState, action: AnyAction) => {
				state.imagesLoading = false
				state.imagesError = action.payload
			})
			// 개인 이미지 불러오기
			.addCase(imageMeFetch.pending, (state: ImageState) => {
				state.imagesLoading = true
				state.imagesDone = false
				state.imagesError = null
			})
			.addCase(
				imageMeFetch.fulfilled,
				(state: ImageState, action: PayloadAction<ResImagesData[]>) => {
					state.imagesLoading = false
					state.imagesDone = true
					state.myImages = action.payload
				}
			)
			.addCase(imageMeFetch.rejected, (state: ImageState, action: AnyAction) => {
				state.imagesLoading = false
				state.imagesError = action.payload
			})
			// 이미지 업로드
			.addCase(imageUpload.pending, (state: ImageState) => {
				state.uploadLoading = true
				state.uploadDone = false
				state.uploadError = null
			})
			.addCase(
				imageUpload.fulfilled,
				(state: ImageState, action: PayloadAction<ResImagesData[]>) => {
					state.uploadLoading = false
					state.uploadDone = true
					if (action.payload[0].public) state.images.push(...action.payload)
					else state.myImages.push(...action.payload)
				}
			)
			.addCase(imageUpload.rejected, (state: ImageState, action: AnyAction) => {
				state.uploadLoading = false
				state.uploadError = action.payload
			})
			// 이미지 삭제
			.addCase(imageDelete.pending, (state: ImageState) => {
				state.deleteLoading = true
				state.deleteDone = false
				state.deleteError = null
			})
			.addCase(
				imageDelete.fulfilled,
				(state: ImageState, action: PayloadAction<ResImagesData[]>) => {
					state.deleteLoading = false
					state.deleteDone = true
					state.images = action.payload
				}
			)
			.addCase(imageDelete.rejected, (state: ImageState, action: AnyAction) => {
				state.deleteLoading = false
				state.deleteError = action.payload
			})
})

export default imageSlice.reducer

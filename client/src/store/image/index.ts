import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResImagesData } from 'api/image/types'
import { imageFetch, imageUpload } from 'store/image/action'

interface ImageState {
	imagesLoading: boolean
	imagesDone: boolean
	imagesError: string | null
	uploadLoading: boolean
	uploadDone: boolean
	uploadError: string | null
	images: ResImagesData[]
}

const initialState: ImageState = {
	imagesLoading: false,
	imagesDone: false,
	imagesError: null,
	uploadLoading: false,
	uploadDone: false,
	uploadError: null,
	images: []
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
					state.images = action.payload
				}
			)
			.addCase(imageFetch.rejected, (state: ImageState, action) => {
				state.imagesLoading = false
				state.imagesError = action.error.message!
			})
			// 이미지 업로드
			.addCase(imageUpload.pending, (state: ImageState) => {
				state.uploadLoading = true
				state.uploadDone = false
				state.uploadError = null
			})
			.addCase(
				imageUpload.fulfilled,
				(state: ImageState, action: PayloadAction<ResImagesData>) => {
					state.uploadLoading = false
					state.uploadDone = true
					state.images.push(action.payload)
				}
			)
			.addCase(imageUpload.rejected, (state: ImageState, action) => {
				state.uploadLoading = false
				state.uploadError = action.error.message!
			})
})

export default imageSlice.reducer

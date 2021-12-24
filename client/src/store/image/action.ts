import { Dispatch, SetStateAction } from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { imageDeleteAPI, imageFetchAPI, imageMeFetchAPI, imageUploadAPI } from 'api/image'

const imageFetch = createAsyncThunk(
	'image/fetch',
	async (lastImageId: string | undefined, { rejectWithValue }) => {
		try {
			const { data } = await imageFetchAPI(lastImageId)
			return data
		} catch (error: any) {
			if (!error.response) throw error
			return rejectWithValue(error.response.data.message)
		}
	}
)

const imageMeFetch = createAsyncThunk(
	'image/fetch/me',
	async (lastImageId: string | undefined, { rejectWithValue }) => {
		try {
			const { data } = await imageMeFetchAPI(lastImageId)
			return data
		} catch (error: any) {
			if (!error.response) throw error
			return rejectWithValue(error.response.data.message)
		}
	}
)

const imageUpload = createAsyncThunk(
	'image/upload',
	async (
		payload: {
			formData: FormData
			setPercent: Dispatch<SetStateAction<number>>
		},
		{ rejectWithValue }
	) => {
		const { formData, setPercent } = payload
		try {
			const { data } = await imageUploadAPI(formData, setPercent)
			return data
		} catch (error: any) {
			if (!error.response) throw error
			return rejectWithValue(error.response.data.message)
		}
	}
)

const imageDelete = createAsyncThunk(
	'image/delete',
	async (imageId: string, { rejectWithValue }) => {
		try {
			const { data } = await imageDeleteAPI(imageId)
			return data
		} catch (error: any) {
			if (!error.response) throw error
			return rejectWithValue(error.response.data.message)
		}
	}
)

export { imageFetch, imageMeFetch, imageUpload, imageDelete }

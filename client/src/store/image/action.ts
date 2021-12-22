import { Dispatch, SetStateAction } from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { imageFetchAPI, imageUploadAPI } from 'api/image'

const imageFetch = createAsyncThunk('image/fetch', async () => {
	const { data } = await imageFetchAPI()
	return data
})

const imageUpload = createAsyncThunk(
	'image/upload',
	async (payload: {
		formData: FormData
		setPercent: Dispatch<SetStateAction<number>>
	}) => {
		const { formData, setPercent } = payload
		const { data } = await imageUploadAPI(formData, setPercent)
		return data
	}
)

export { imageFetch, imageUpload }

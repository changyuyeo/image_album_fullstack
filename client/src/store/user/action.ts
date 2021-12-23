import { createAsyncThunk } from '@reduxjs/toolkit'
import { userFetchAPI, userLoginAPI } from 'api/user'
import { ReqLoginData } from 'api/user/types'

const userFetch = createAsyncThunk('user/fetch', async () => {
	const { data } = await userFetchAPI()
	return data
})

const userLogin = createAsyncThunk(
	'user/login',
	async (payload: ReqLoginData, { rejectWithValue }) => {
		try {
			const { data } = await userLoginAPI(payload)
			return data
		} catch (error: any) {
			if (!error.response) throw error
			return rejectWithValue(error.response.data.message)
		}
	}
)

export { userFetch, userLogin }

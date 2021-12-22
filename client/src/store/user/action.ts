import { createAsyncThunk } from '@reduxjs/toolkit'
import { userFetchAPI, userLoginAPI } from 'api/user'
import { ReqLoginData } from 'api/user/types'

const userFetch = createAsyncThunk('user/fetch', async () => {
	const { data } = await userFetchAPI()
	return data
})

const userLogin = createAsyncThunk(
	'user/login',
	async (payload: ReqLoginData) => {
		const { data } = await userLoginAPI(payload)
		return data
	}
)

export { userFetch, userLogin }

import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResUserData } from 'api/user/types'
import { userFetch, userLogin } from 'store/user/action'

interface UserState {
	userFetchLoading: boolean
	userFetchDone: boolean
	userFetchError: string | null
	logInLoading: boolean
	logInDone: boolean
	logInError: string | null
	user: ResUserData | null
}

const initialState: UserState = {
	userFetchLoading: false,
	userFetchDone: false,
	userFetchError: null,
	logInLoading: false,
	logInDone: false,
	logInError: null,
	user: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutAction(state: UserState) {
			state.user = null
			state.logInDone = false
		}
	},
	extraReducers: bulid =>
		bulid
			// userFetch
			.addCase(userFetch.pending, (state: UserState) => {
				state.userFetchLoading = true
				state.userFetchDone = false
				state.userFetchError = null
			})
			.addCase(
				userFetch.fulfilled,
				(state: UserState, action: PayloadAction<ResUserData | null>) => {
					state.logInLoading = false
					state.logInDone = action.payload !== null
					state.user = action.payload
				}
			)
			.addCase(userFetch.rejected, (state: UserState, action: AnyAction) => {
				state.logInLoading = false
				state.logInError = action.payload
			})
			// userLogin
			.addCase(userLogin.pending, (state: UserState) => {
				state.logInLoading = true
				state.logInDone = false
				state.logInError = null
			})
			.addCase(
				userLogin.fulfilled,
				(state: UserState, action: PayloadAction<ResUserData>) => {
					state.logInLoading = false
					state.logInDone = true
					state.user = action.payload
				}
			)
			.addCase(userLogin.rejected, (state: UserState, action: AnyAction) => {
				state.logInLoading = false
				state.logInError = action.payload
			})
})

export const { logoutAction } = userSlice.actions

export default userSlice.reducer

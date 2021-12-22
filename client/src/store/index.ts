import { configureStore } from '@reduxjs/toolkit'
import userSlice from 'store/user'
import imageSlice from 'store/image'

export const store = configureStore({
	reducer: {
		image: imageSlice,
		user: userSlice
	},
	devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>

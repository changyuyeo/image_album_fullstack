import { user } from 'api'
import { AxiosPromise } from 'axios'
import { ReqLoginData, ReqSignUpData, ResUserData } from 'api/user/types'

// 유저정보 API
const userFetchAPI = (): AxiosPromise<ResUserData | null> => user.get('.')

// 회원가입 API
const userSignUpAPI = (payload: ReqSignUpData) => user.post('signup', payload)

// 로그인 API
const userLoginAPI = (payload: ReqLoginData): AxiosPromise<ResUserData> =>
	user.post('login', payload)

// 로그아웃 API
const userLogoutAPI = () => user.post('logout')

export { userFetchAPI, userSignUpAPI, userLoginAPI, userLogoutAPI }

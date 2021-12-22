export interface ReqLoginData {
	username: string
	password: string
}

export interface ReqSignUpData extends ReqLoginData {
	name: string
}

export interface ResUserData {
	_id: string
	name: string
	username: string
	password: string
	createdAt: string
	updatedAt: string
	__v: number
}

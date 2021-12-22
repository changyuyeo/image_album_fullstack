import axios from 'axios'

export const SERVER_URI = 'http://localhost:5000/' as const

const instance = (url: string) =>
	axios.create({ baseURL: `${SERVER_URI}${url}`, withCredentials: true })

export const user = instance('user')
export const image = instance('image')

import dotenv from 'dotenv'

dotenv.config()

export const { MONGO_URI, COOKIE_SECRET, ORIGIN, PORT } = process.env

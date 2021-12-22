import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import User from '../models/User'

export default () => {
	passport.use(
		new LocalStrategy(
			{ usernameField: 'username', passwordField: 'password' },
			async (username, password, done) => {
				try {
					const user = await User.findOne({ username })
					if (!user) return done(null, false, { message: '존재하지 않는 아이디입니다!' })
					const result = await bcrypt.compare(password, user.password)
					if (result) return done(null, user)
					return done(null, false, { message: '비밀번호가 틀렸습니다.' })
				} catch (error) {
					console.error(error)
					return done(error)
				}
			}
		)
	)
}

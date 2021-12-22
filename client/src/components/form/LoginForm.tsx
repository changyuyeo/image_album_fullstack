import { ChangeEvent, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RootState } from 'store'
import { userLogin } from 'store/user/action'
import useInput from 'hooks/useInput'
import CustomForm from 'components/common/CustomForm'

const LoginForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { logInDone, logInError } = useSelector(
		(state: RootState) => state.user
	)

	const [username, onChangeUsername] = useInput('')
	const [password, onChangePassword] = useInput('')

	const onSubmitForm = useCallback(
		(e: ChangeEvent<HTMLFormElement>) => {
			e.preventDefault()
			dispatch(userLogin({ username, password }))
		},
		[dispatch, username, password]
	)

	useEffect(() => {
		if (logInDone) {
			toast.success('로그인을 성공했습니다!')
			navigate('/')
		}
		if (logInError) toast.error(logInError)
	}, [logInDone, logInError, navigate])

	return (
		<form onSubmit={onSubmitForm}>
			<CustomForm label="아이디" value={username} onChange={onChangeUsername} />
			<CustomForm
				label="비밀번호"
				type="password"
				value={password}
				onChange={onChangePassword}
			/>
			<button type="submit">로그인</button>
		</form>
	)
}

export default LoginForm

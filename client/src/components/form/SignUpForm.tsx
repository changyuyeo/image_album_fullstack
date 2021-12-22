import { ChangeEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userSignUpAPI } from 'api/user'
import useInput from 'hooks/useInput'
import CustomForm from 'components/common/CustomForm'

const SignUpForm = () => {
	const navigate = useNavigate()
	const [name, onChangeName] = useInput('')
	const [username, onChangeUsername] = useInput('')
	const [password, onChangePassword] = useInput('')
	const [passwordCheck, onChangePasswordCheck] = useInput('')

	const onSubmitForm = useCallback(
		async (e: ChangeEvent<HTMLFormElement>) => {
			e.preventDefault()
			if (password !== passwordCheck)
				return toast.error('비밀번호를 확인해주세요.')
			try {
				await userSignUpAPI({ name, username, password })
				toast.success('회원가입을 성공했습니다.')
				navigate('/login')
			} catch (error: any) {
				toast.error(error.response.data.message)
			}
		},
		[name, username, password, passwordCheck, navigate]
	)

	return (
		<form onSubmit={onSubmitForm}>
			<CustomForm label="이름" value={name} onChange={onChangeName} />
			<CustomForm label="아이디" value={username} onChange={onChangeUsername} />
			<CustomForm
				label="비밀번호"
				type="password"
				value={password}
				onChange={onChangePassword}
			/>
			<CustomForm
				label="비밀번호확인"
				type="password"
				value={passwordCheck}
				onChange={onChangePasswordCheck}
			/>
			<button type="submit">회원가입</button>
		</form>
	)
}

export default SignUpForm

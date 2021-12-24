import styled from 'styled-components'
import LoginForm from 'components/form/LoginForm'

const FormBoxStyled = styled.div`
	margin-top: 100;
	max-width: 350;
	margin: 0 auto;
`

const LoginPage = () => (
	<FormBoxStyled>
		<h3>로그인</h3>
		<LoginForm />
	</FormBoxStyled>
)

export default LoginPage

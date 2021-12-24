import styled from 'styled-components'
import SignUpForm from 'components/form/SignUpForm'

const FormBoxStyled = styled.div`
	margin-top: 100;
	max-width: 350;
	margin: 0 auto;
`

const SignUpPage = () => (
	<FormBoxStyled>
		<h3>회원가입</h3>
		<SignUpForm />
	</FormBoxStyled>
)

export default SignUpPage

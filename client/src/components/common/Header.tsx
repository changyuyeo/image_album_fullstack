import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { userLogoutAPI } from 'api/user'
import { RootState } from 'store'
import { logoutAction } from 'store/user'
import {
	HeaderBox,
	LogoutButton,
	MenuBox,
	StyledLink
} from 'components/common/HeaderStyled'

const Header = () => {
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state.user)

	const onClickLogout = useCallback(async () => {
		try {
			await userLogoutAPI()
			dispatch(logoutAction())
			toast.success('로그아웃을 성공했습니다.')
		} catch (error: any) {
			toast.error(error.response)
		}
	}, [dispatch])

	return (
		<HeaderBox>
			<StyledLink to="/">
				<span>홈</span>
			</StyledLink>
			{user ? (
				<MenuBox>
					<span>{user.name}님</span>
					<LogoutButton onClick={onClickLogout}>로그아웃</LogoutButton>
				</MenuBox>
			) : (
				<MenuBox>
					<StyledLink to="/signup">
						<span>회원가입</span>
					</StyledLink>
					<StyledLink to="/login">
						<span>로그인</span>
					</StyledLink>
				</MenuBox>
			)}
		</HeaderBox>
	)
}

export default Header

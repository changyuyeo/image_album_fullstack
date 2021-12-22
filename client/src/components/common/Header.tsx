import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RootState } from 'store'
import { logoutAction } from 'store/user'
import { userLogoutAPI } from 'api/user'

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
		<>
			<Link to="/">
				<span>홈</span>
			</Link>
			{user ? (
				<span
					onClick={onClickLogout}
					style={{ float: 'right', cursor: 'pointer' }}
				>
					로그아웃
				</span>
			) : (
				<>
					<Link to="/login">
						<span style={{ float: 'right' }}>로그인</span>
					</Link>
					<Link to="/signup">
						<span style={{ float: 'right', marginRight: 15 }}>회원가입</span>
					</Link>
				</>
			)}
		</>
	)
}

export default Header

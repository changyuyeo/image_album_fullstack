import { Suspense, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'

import RouterConfig from 'router'
import { userFetch } from 'store/user/action'
import Header from 'components/common/Header'
import LoadingSpinner from 'components/common/LoadingSpinner'
import 'react-toastify/dist/ReactToastify.css'

const AppBox = styled.div`
	max-width: 600px;
	margin: auto;
`

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(userFetch())
	}, [dispatch])

	return (
		<AppBox>
			<BrowserRouter>
				<ToastContainer />
				<Header />
				<Suspense fallback={<LoadingSpinner />}>
					<RouterConfig />
				</Suspense>
			</BrowserRouter>
		</AppBox>
	)
}

export default App

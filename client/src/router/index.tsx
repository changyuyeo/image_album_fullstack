import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Home = lazy(() => import('pages/HomePage'))
const Login = lazy(() => import('pages/LoginPage'))
const SignUp = lazy(() => import('pages/SignUpPage'))
const NotFound = lazy(() => import('pages/NotFound'))

const RouterConfig = () => {
	const routes = useRoutes([
		{ path: '/', element: <Home /> },
		{ path: 'login', element: <Login /> },
		{ path: 'signup', element: <SignUp /> },
		{ path: '*', element: <NotFound /> }
	])
	return routes
}

export default RouterConfig

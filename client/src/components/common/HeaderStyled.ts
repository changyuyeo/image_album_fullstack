import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderBox = styled.div`
	display: flex;
	justify-content: space-between;
`

export const MenuBox = styled.div`
	display: flex;
	gap: 10px;
`

export const StyledLink = styled(Link)`
	text-decoration: none;
	color: #333;
	transition: 0.5s;
	&:hover {
		color: royalblue;
	}
`

export const LogoutButton = styled.span`
	cursor: pointer;
	transition: 0.5s;
	&:hover {
		color: royalblue;
	}
`

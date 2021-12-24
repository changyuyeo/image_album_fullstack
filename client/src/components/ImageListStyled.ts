import styled from 'styled-components'

export const ImgPublicChoice = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
`

export const ImgContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	justify-content: space-around;
	img {
		width: 140px;
		height: 140px;
		object-fit: cover;
		transition: 0.5s;
		&:hover {
			box-shadow: 3px 3px 3px #aaa;
			opacity: 0.8;
			cursor: pointer;
		}
	}
`

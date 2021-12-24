import styled from 'styled-components'

export const ProgressBoundary = styled.div<{ percent: number }>`
	border: 1px solid black;
	margin-bottom: 20px;
	height: 40px;
	border-radius: 10px;
	> div {
		background-color: green;
		width: ${props => props.percent}%;
		height: 30px;
		padding-top: 10px;
		border-radius: 10px;
		text-align: center;
		color: white;
		transition: 0.3s;
	}
`

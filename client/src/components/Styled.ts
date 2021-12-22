import styled from 'styled-components'

export const FileDropper = styled.div`
	border: 1px dashed black;
	height: 200px;
	background-color: bisque;
	border-radius: 10px;
	margin-bottom: 20px;
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;
	> input {
		width: 100%;
		height: 100%;
		opacity: 0;
		position: absolute;
		cursor: pointer;
	}
	&:hover {
		background-color: grey;
		color: white;
		transition: 0.5s;
	}
`

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

export const ImagePreview = styled.img<{ imgSrc: string | null }>`
	width: ${props => (props.imgSrc ? '55%' : '0%')};
	opacity: ${props => (props.imgSrc ? 1 : 0)};
	display: ${props => (props.imgSrc ? 'block' : 'inline')};
	margin: 0 auto 20px auto;
	border-radius: 10px;
	border: 5px solid grey;
	transition: 0.5s;
`

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

export const ImagePreviewBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`

export const ImagePreview = styled.img`
	width: 200px;
	height: 200px;
	object-fit: cover;
	margin: 0 auto 20px auto;
	border-radius: 10px;
	border: 5px solid grey;
	transition: 0.5s;
`

export const ImageSubmitBtn = styled.button`
	width: 100%;
	border-radius: 3px;
	height: 40;
	cursor: pointer;
`

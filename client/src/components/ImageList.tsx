import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from 'store'
import { imageFetch } from 'store/image/action'
import { SERVER_URI } from 'api'

const ImgListBox = styled.img`
	width: 100%;
`

const ImageList = () => {
	const dispatch = useDispatch()
	const { images } = useSelector((state: RootState) => state.image)

	useEffect(() => {
		dispatch(imageFetch())
	}, [dispatch])

	const imgList = images.map(v => (
		<ImgListBox
			key={v._id}
			src={`${SERVER_URI}/${v.key}`}
			alt={v.originalFileName}
		/>
	))

	return (
		<div>
			<h3>ImageList</h3>
			{imgList}
		</div>
	)
}

export default ImageList

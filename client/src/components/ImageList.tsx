import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from 'store'
import { imageFetch, imageMeFetch } from 'store/image/action'
import { SERVER_URI } from 'api'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import useIsMount from 'hooks/useIsMount'

const ImgBox = styled.img`
	width: 100%;
`

const ImgContainer = styled.div`
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

const ImageList = () => {
	const dispatch = useDispatch()
	const isMount = useIsMount()

	const { user } = useSelector((state: RootState) => state.user)
	const { images, myImages, imagesError } = useSelector(
		(state: RootState) => state.image
	)

	const [isPublic, setIsPublic] = useState(true)

	useEffect(() => {
		if (isMount) {
			if (isPublic) dispatch(imageFetch())
			else dispatch(imageMeFetch())
		}
		if (imagesError) toast.error(imagesError)
	}, [dispatch, isMount, isPublic, imagesError])

	const onTogglePublic = useCallback(() => {
		if (!user) return toast.error('로그인이 필요한 서비스 입니다.')
		setIsPublic(!isPublic)
	}, [isPublic, user])

	const imgList = () => {
		const img = isPublic ? images : myImages
		return img.map(v => (
			<Link key={v._id} to={`/image/${v._id}`}>
				<ImgBox src={`${SERVER_URI}/${v.key}`} alt={v.originalFileName} />
			</Link>
		))
	}

	return (
		<div>
			<div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
				<h3>ImageList({isPublic ? '공개' : '개인'}사진)</h3>
				<button onClick={onTogglePublic}>
					{!isPublic ? '공개' : '개인'} 사진 보기
				</button>
			</div>
			<ImgContainer>{imgList()}</ImgContainer>
		</div>
	)
}

export default ImageList

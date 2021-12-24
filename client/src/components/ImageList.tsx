import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { RootState } from 'store'
import { imageFetch, imageMeFetch } from 'store/image/action'
import { SERVER_URI } from 'api'
import useIsMount from 'hooks/useIsMount'
import { ImgContainer, ImgPublicChoice } from 'components/ImageListStyled'

const ImageList = () => {
	const dispatch = useDispatch()
	const isMount = useIsMount()

	const { user } = useSelector((state: RootState) => state.user)
	const { images, myImages, imagesLoading, imagesError } = useSelector(
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

	// 이미지 더 보기
	const onClickLoadMoreImage = useCallback(() => {
		if (isMount) {
			dispatch(imageFetch(images[images.length - 1]._id))
		}
		if (imagesError) toast.error(imagesError)
	}, [dispatch, isMount, imagesError, images])

	const imgList = () => {
		const img = isPublic ? images : myImages
		return img.map((v, i) => (
			<Link key={v._id + i} to={`/image/${v._id}`}>
				<img src={`${SERVER_URI}/${v.key}`} alt={v.originalFileName} />
			</Link>
		))
	}

	return (
		<div>
			<ImgPublicChoice>
				<h3>ImageList({isPublic ? '공개' : '개인'}사진)</h3>
				<button onClick={onTogglePublic}>{!isPublic ? '공개' : '개인'} 사진 보기</button>
			</ImgPublicChoice>
			<ImgContainer>{imgList()}</ImgContainer>
			{!imagesLoading && <button onClick={onClickLoadMoreImage}>Load More Images</button>}
		</div>
	)
}

export default ImageList

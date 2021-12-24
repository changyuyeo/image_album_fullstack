import { useCallback, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { RootState } from 'store'
import { imageFetch, imageMeFetch } from 'store/image/action'
import { SERVER_URI } from 'api'
import { ImgContainer, ImgPublicChoice } from 'components/ImageListStyled'
import { setHasImagesFetch, setHasMyImagesFetch } from 'store/image'

const ImageList = () => {
	const dispatch = useDispatch()
	const imageRef = useRef(null)

	const { user } = useSelector((state: RootState) => state.user)
	const {
		images,
		myImages,
		imagesLoading,
		imagesError,
		hasImagesFetch,
		hasMyImagesFetch,
		myImagesChangeOnce
	} = useSelector((state: RootState) => state.image)

	const [isPublic, setIsPublic] = useState(true)

	useEffect(() => {
		if (isPublic) {
			if (!hasImagesFetch) dispatch(imageFetch())
		} else if (!hasMyImagesFetch || myImagesChangeOnce) dispatch(imageMeFetch())
		if (imagesError) toast.error(imagesError)
	}, [dispatch, isPublic, imagesError, hasMyImagesFetch, hasImagesFetch, myImagesChangeOnce])

	const onTogglePublic = useCallback(() => {
		if (!user) return toast.error('로그인이 필요한 서비스 입니다.')
		setIsPublic(!isPublic)
		if (isPublic && !hasImagesFetch) dispatch(setHasImagesFetch())
		else if (!hasMyImagesFetch) dispatch(setHasMyImagesFetch())
	}, [dispatch, hasImagesFetch, hasMyImagesFetch, isPublic, user])

	// 이미지 더 보기 요청
	const currentImages = isPublic ? images : myImages
	const lastImageId = images.length > 0 ? images[currentImages.length - 1]?._id : null

	const LoadMoreImages = useCallback(() => {
		if (imagesLoading || !lastImageId) return
		dispatch(isPublic ? imageFetch(lastImageId) : imageMeFetch(lastImageId))
		if (imagesError) toast.error(imagesError)
	}, [dispatch, imagesLoading, imagesError, lastImageId, isPublic])

	// Infinite scroll
	useEffect(() => {
		if (!imageRef.current) return
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) LoadMoreImages()
		})
		observer.observe(imageRef.current)
		return () => observer.disconnect()
	}, [LoadMoreImages])

	// 이미지 정보 출력
	const imgList = () => {
		const imageDatas = isPublic ? images : myImages
		return imageDatas.map((imageData, i) => (
			<Link
				key={imageData._id + i}
				to={`/image/${imageData._id}`}
				ref={i + 5 === imageDatas.length ? imageRef : undefined}
			>
				<img src={`${SERVER_URI}/${imageData.key}`} alt={imageData.originalFileName} />
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
		</div>
	)
}

export default ImageList

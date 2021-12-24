import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SERVER_URI } from 'api'
import { imageLikedAPI, imageOneFetchAPI } from 'api/image'
import { ResImagesData } from 'api/image/types'
import { RootState } from 'store'
import { imageDelete, imageMeFetch } from 'store/image/action'
import LoadingSpinner from 'components/common/LoadingSpinner'
import { ImagePageContainer } from 'pages/ImagePageStyled'

const ImagePage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { id } = useParams()
	const { user } = useSelector((state: RootState) => state.user)
	const { deleteError } = useSelector((state: RootState) => state.image)

	const [image, setImage] = useState<ResImagesData | null>(null)
	const [imageError, setImageError] = useState(false)
	const [hasLiked, setHasLiked] = useState(false)

	const imageOneFetch = useCallback(async () => {
		try {
			const { data } = await imageOneFetchAPI(id!)
			setImage(data)
		} catch (error: any) {
			toast.error(error.response.data.message)
			setImageError(true)
		}
	}, [id])

	useEffect(() => {
		imageOneFetch()
	}, [imageOneFetch])

	useEffect(() => {
		// 이미지 정보가 없다면, 메인페이지로 리다이렉트
		if (imageError) navigate('/')
	}, [imageError, navigate])

	useEffect(() => {
		// 좋아요 여부 체크
		if (user && image && image.likes.includes(user._id)) setHasLiked(true)
	}, [user, image])

	// 삭제 버튼
	const onClickDeleteButton = useCallback(() => {
		if (!window.confirm('정말 해당 이미지를 삭제하시겠습니까?')) return
		dispatch(imageDelete(id!))
		if (deleteError) toast.error(deleteError)
		else {
			toast.success('삭제가 완료되었습니다.')
			navigate('/')
		}
		dispatch(imageMeFetch())
	}, [navigate, dispatch, deleteError, id])

	// 좋아요, 싫어요 버튼
	const onClickLikeButton = useCallback(async () => {
		try {
			const { data } = await imageLikedAPI(id!, hasLiked ? 'unlike' : 'like')
			setImage(data)
			setHasLiked(!hasLiked)
			toast.success(hasLiked ? '좋아요를 취소합니다.' : '이 사진을 좋아합니다.')
		} catch (error: any) {
			toast.error(error.response.data.message)
		}
	}, [id, hasLiked])

	if (!image) return <LoadingSpinner />

	return (
		<ImagePageContainer>
			<h3>ImagePage - {id}</h3>
			<img src={`${SERVER_URI}/${image!.key}`} alt={image!.originalFileName || 'image'} />
			<div>
				<span>좋아요 {image.likes.length}개</span>
				<div>
					<button onClick={onClickLikeButton}>{hasLiked ? '싫어요!' : '좋아요!'}</button>
					{user && image.user === user._id && (
						<button onClick={onClickDeleteButton}>삭제하기</button>
					)}
				</div>
			</div>
		</ImagePageContainer>
	)
}

export default ImagePage

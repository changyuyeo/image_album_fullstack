import ImageList from 'components/ImageList'
import UploadForm from 'components/UploadForm'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

const HomePage = () => {
	const { user } = useSelector((state: RootState) => state.user)

	return (
		<>
			<h2>사진첩</h2>
			{user && <UploadForm />}
			<ImageList />
		</>
	)
}

export default HomePage

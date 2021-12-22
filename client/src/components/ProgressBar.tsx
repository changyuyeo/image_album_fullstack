import { FC } from 'react'
import { ProgressBoundary } from 'components/Styled'

const ProgressBar: FC<{ percent: number }> = ({ percent }) => (
	<ProgressBoundary percent={percent}>
		<div>{percent}%</div>
	</ProgressBoundary>
)

export default ProgressBar

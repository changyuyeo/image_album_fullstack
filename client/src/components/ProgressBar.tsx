import { FC } from 'react'
import { ProgressBoundary } from 'components/ProgressBarStyled'

const ProgressBar: FC<{ percent: number }> = ({ percent }) => (
	<ProgressBoundary percent={percent}>
		<div>{percent || 0}%</div>
	</ProgressBoundary>
)

export default ProgressBar

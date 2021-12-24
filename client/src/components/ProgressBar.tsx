import { FC } from 'react'
import { ProgressBoundary } from 'components/ProgressBarStyled'

const ProgressBar: FC<{ percent: number }> = ({ percent }) => (
	<ProgressBoundary percent={percent}>
		<div>{percent}%</div>
	</ProgressBoundary>
)

export default ProgressBar

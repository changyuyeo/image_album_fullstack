import styled from 'styled-components'

const LoadingSpinnerStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 240px;
	.spinner {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 5px solid #e0e0e0;
		border-bottom: 5px solid #fe9616;
		animation: spin 1s linear infinite;
		position: relative;
	}
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`

const LoadingSpinner = () => (
	<LoadingSpinnerStyled>
		<div className="spinner" />
	</LoadingSpinnerStyled>
)

export default LoadingSpinner

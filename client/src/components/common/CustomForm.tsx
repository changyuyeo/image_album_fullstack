import { FC } from 'react'
import styled from 'styled-components'
import { ChangeType } from 'hooks/useInput'

interface Props {
	label: string
	value: string
	onChange: ChangeType
	type?: string
}

const InputBox = styled.input`
	width: 100%;
`

const CustomForm: FC<Props> = ({ label, value, onChange, type = 'text' }) => (
	<div>
		<label htmlFor={label}>{label}</label>
		<InputBox id={label} type={type} value={value} onChange={onChange} />
		<br />
		<br />
	</div>
)

export default CustomForm

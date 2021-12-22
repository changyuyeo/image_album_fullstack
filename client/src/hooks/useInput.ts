import {
	ChangeEvent,
	ChangeEventHandler,
	Dispatch,
	SetStateAction,
	useCallback,
	useState
} from 'react'

export type ChangeType =
	| ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
	| undefined
type setSTateType = Dispatch<SetStateAction<string>>

export default (
	initialValue: string = ''
): [string, ChangeType, setSTateType] => {
	const [value, setValue] = useState(initialValue)
	const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}, [])

	return [value, onChangeValue, setValue]
}

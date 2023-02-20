// Import Types
import type { FC } from "react"
type Props = {
	children?: number | string
}

export const Price: FC<Props> = ({ children }) => {
	children = children ?? 0

	let num = typeof children === "string" ? parseFloat(children) : children

	if (isNaN(num)) {
		num = 0
	}

	return <span>{num.toLocaleString("ru-RU")}</span>
}

// Import Types
import classNames from "classnames"
import type { FC } from "react"

// Import Styles
import styles from "./FormContainer.module.css"

type TypeProps = {
	children: React.ReactNode
	extraClass?: string
}

export const FormContainer: FC<TypeProps> = ({ children, extraClass }) => {
	return <div className={classNames(styles.container, extraClass)}>{children}</div>
}

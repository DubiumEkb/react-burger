// Import Assets

// Import Library
import classNames from "classnames"

// Import Framework

// Import Components

// Import Pages

// Import Store

// Import Style
import styles from "./FormContainer.module.css"

// Import Hooks

// Import Utils

// Import Types
import type { FC } from "react"
type TypeProps = {
	children: React.ReactNode
	extraClass?: string
}

export const FormContainer: FC<TypeProps> = ({ children, extraClass }) => {
	return <div className={classNames(styles.container, extraClass)}>{children}</div>
}

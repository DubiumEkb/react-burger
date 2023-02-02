// Import Types
import type { FC } from "react"

// Import Styles
import styles from "./FormContainer.module.css"

type TypeProps = {
	children: React.ReactNode
}

export const FormContainer: FC<TypeProps> = ({ children }) => {
	return <div className={styles.container}>{children}</div>
}

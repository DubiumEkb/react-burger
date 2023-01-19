import styles from "./FormContainer.module.css"

type TypeProps = {
	children: React.ReactNode
}

export const FormContainer = ({ children }: TypeProps) => {
	return <div className={styles.container}>{children}</div>
}

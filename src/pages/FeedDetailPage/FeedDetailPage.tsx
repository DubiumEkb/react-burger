import { FormContainer } from "components/FormContainer/FormContainer"
import styles from "./FeedDetailPage.module.css"

// Import Types
import { FC } from "react"

type Props = {
	children: React.ReactNode
}

export const FeedDetailPage: FC<Props> = ({ children }) => {
	return <FormContainer extraClass={styles.detail}>{children}</FormContainer>
}

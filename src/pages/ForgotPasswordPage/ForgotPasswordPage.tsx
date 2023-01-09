import { ChangeEvent, FormEvent } from "react"
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { FormContainer } from "components/FormContainer/FormContainer"
import { Link } from "react-router-dom"
import styles from "./ForgotPasswordPage.module.css"
import { postForgotPassword, emailValue } from "services/forgotPassword/forgotPasswordSlice"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"

const ForgotPasswordPage = () => {
	// const [valueEmail, setValueEmail] = useState("")

	const dispatch = useAppDispatch()
	const { email } = useAppSelector((state) => state.forgotPassword)

	const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(emailValue(event.target.value))
	}

	const handlerForm = (event: FormEvent) => {
		event.preventDefault()
		if (email !== "") {
			dispatch(postForgotPassword())
		}
	}

	return (
		<FormContainer>
			<p className="text text_type_main-medium">Восстановление пароля</p>
			<form className={`${styles.form} pt-6 pb-20`} onSubmit={handlerForm}>
				<EmailInput
					placeholder={"Укажите e-mail"}
					onChange={onChangeEmail}
					value={email}
					name={"email"}
					isIcon={false}
					extraClass="mb-6"
				/>
				<Button htmlType="submit" type="primary" size="medium">
					Восстановить
				</Button>
			</form>
			<div className={styles.links}>
				<div className={`${styles.linksItem} pb-4`}>
					<p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
					<Link to="/login" className="text text_type_main-default">
						Войти
					</Link>
				</div>
			</div>
		</FormContainer>
	)
}

export default ForgotPasswordPage

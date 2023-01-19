// Import Library
import { ChangeEvent, FormEvent, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

// Import Framework
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Components
import { FormContainer } from "components/FormContainer/FormContainer"

// Import Store
import { changeEmail, postForgotPassword } from "services/user/userSlice"

// Import Style
import styles from "./ForgotPasswordPage.module.css"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"

const ForgotPasswordPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useAppDispatch()

	const { user, success } = useAppSelector((state) => state.user)

	useEffect(() => {
		if (success.forgot) {
			return navigate("/reset-password")
		}

		if (getCookie("access_token") && getCookie("refresh_token")) {
			return navigate(location.state?.from.pathname || "/")
		}
	}, [success.forgot, navigate, location.state])

	const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeEmail(event.target.value))
	}

	const handlerForm = (event: FormEvent) => {
		event.preventDefault()
		if (user.email !== "") {
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
					value={user.email}
					name={"email"}
					isIcon={false}
					extraClass="mb-6"
					required
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

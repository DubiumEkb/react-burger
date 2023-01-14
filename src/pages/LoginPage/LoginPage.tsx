import { ChangeEvent, FormEvent } from "react"
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { FormContainer } from "components/FormContainer/FormContainer"
import styles from "./LoginPage.module.css"
import { Link, useNavigate } from "react-router-dom"
import { emailValue, passwordValue, postLogin } from "services/login/loginSlice"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"

const LoginPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user, success } = useAppSelector((state) => state.login)

	const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
		dispatch(emailValue(event.target.value))
	}

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
		dispatch(passwordValue(event.target.value))
	}
	const handlerForm = (event: FormEvent) => {
		event.preventDefault()
		if (user.email !== "" && user.password !== "") {
			dispatch(postLogin())
			if (success === true) {
				setTimeout(() => {
					navigate("/")
				}, 1000)
			}
		}
	}

	console.debug(typeof getCookie("access_token"))

	return (
		<FormContainer>
			<p className="text text_type_main-medium">Вход</p>
			<form className={`${styles.form} pt-6 pb-20`} onSubmit={handlerForm}>
				<EmailInput onChange={onChangeEmail} value={user.email} name={"email"} isIcon={false} extraClass="mb-6" />
				<PasswordInput onChange={onChangePassword} value={user.password} name={"password"} extraClass="mb-6" />
				<Button htmlType="submit" type="primary" size="medium">
					Войти
				</Button>
			</form>
			<div className={styles.links}>
				<div className={`${styles.linksItem} pb-4`}>
					<p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
					<Link to="/register" className="text text_type_main-default">
						Вы — новый пользователь?
					</Link>
				</div>
				<div className={styles.linksItem}>
					<p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
					<Link to="/forgot-password" className="text text_type_main-default">
						Восстановить пароль
					</Link>
				</div>
			</div>
		</FormContainer>
	)
}

export default LoginPage

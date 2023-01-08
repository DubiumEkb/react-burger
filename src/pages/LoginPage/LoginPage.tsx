import { useState } from "react"
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { FormContainer } from "components/FormContainer/FormContainer"
import styles from "./LoginPage.module.css"
import { Link } from "react-router-dom"

const LoginPage = () => {
	const [valueEmail, setValueEmail] = useState("")
	const [valuePassword, setValuePassword] = useState("")
	const onChangeEmail = (event: any) => {
		setValueEmail(event.target.value)
	}

	const onChangePassword = (event: any) => {
		setValuePassword(event.target.value)
	}

	return (
		<FormContainer>
			<p className="text text_type_main-medium">Вход</p>
			<form className={`${styles.form} pt-6 pb-20`} onSubmit={() => console.debug("Отправка")}>
				<EmailInput onChange={onChangeEmail} value={valueEmail} name={"email"} isIcon={false} extraClass="mb-6" />
				<PasswordInput onChange={onChangePassword} value={valuePassword} name={"password"} extraClass="mb-6" />
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

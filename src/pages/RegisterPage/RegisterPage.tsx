import { useState } from "react"
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { FormContainer } from "components/FormContainer/FormContainer"
import styles from "./RegisterPage.module.css"
import { Link } from "react-router-dom"

const RegisterPage = () => {
	const [valueEmail, setValueEmail] = useState("")
	const [valuePassword, setValuePassword] = useState("")
	const [valueName, setValueName] = useState("")

	const onChangeName = (event: any) => {
		setValueName(event.target.value)
	}

	const onChangeEmail = (event: any) => {
		setValueEmail(event.target.value)
	}

	const onChangePassword = (event: any) => {
		setValuePassword(event.target.value)
	}

	return (
		<FormContainer>
			<p className="text text_type_main-medium">Регистрация</p>
			<form className={`${styles.form} pt-6 pb-20`} onSubmit={() => console.debug("Отправка")}>
				<Input
					type={"text"}
					placeholder={"Имя"}
					onChange={onChangeName}
					value={valueName}
					name={"name"}
					error={false}
					errorText={"Укажите имя"}
					extraClass="mb-6"
				/>
				<EmailInput onChange={onChangeEmail} value={valueEmail} name={"email"} isIcon={false} extraClass="mb-6" />
				<PasswordInput onChange={onChangePassword} value={valuePassword} name={"password"} extraClass="mb-6" />
				<Button htmlType="submit" type="primary" size="medium">
					Зарегистрироваться
				</Button>
			</form>
			<div className={styles.links}>
				<div className={`${styles.linksItem} pb-4`}>
					<p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
					<Link to="/login" className="text text_type_main-default">
						Войти
					</Link>
				</div>
			</div>
		</FormContainer>
	)
}

export default RegisterPage

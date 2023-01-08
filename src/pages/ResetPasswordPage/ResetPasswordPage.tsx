import { useState } from "react"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { FormContainer } from "components/FormContainer/FormContainer"
import styles from "./ResetPasswordPage.module.css"
import { Link } from "react-router-dom"

const ResetPasswordPage = () => {
	const [valuePassword, setValuePassword] = useState("")
	const [valueName, setValueName] = useState("")

	const onChangeName = (event: any) => {
		setValueName(event.target.value)
	}

	const onChangePassword = (event: any) => {
		setValuePassword(event.target.value)
	}

	return (
		<FormContainer>
			<p className="text text_type_main-medium">Восстановление пароля</p>
			<form className={`${styles.form} pt-6 pb-20`} onSubmit={() => console.debug("Отправка")}>
				<PasswordInput
					onChange={onChangePassword}
					placeholder="Введите новый пароль"
					value={valuePassword}
					name={"password"}
					extraClass="mb-6"
				/>
				<Input
					type={"text"}
					placeholder={"Введите код из письма"}
					onChange={onChangeName}
					value={valueName}
					name={"name"}
					error={false}
					errorText={"Неверный код"}
					extraClass="mb-6"
				/>
				<Button htmlType="submit" type="primary" size="medium">
					Сохранить
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

export default ResetPasswordPage

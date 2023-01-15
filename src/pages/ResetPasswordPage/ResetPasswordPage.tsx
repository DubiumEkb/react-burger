import { ChangeEvent, FormEvent, useEffect } from "react"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { FormContainer } from "components/FormContainer/FormContainer"
import styles from "./ResetPasswordPage.module.css"
import { Link, useNavigate } from "react-router-dom"
import { postResetPassword, passwordValue, tokenValue } from "services/resetPassword/resetPasswordSlice"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"

const ResetPasswordPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { password, token, success } = useAppSelector((state) => state.resetPassword)

	useEffect(() => {
		if (success === true) {
			setTimeout(() => {
				navigate("/")
			}, 1000)
		}
	}, [success, navigate])

	const onChangeToken = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(tokenValue(event.target.value))
	}

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(passwordValue(event.target.value))
	}

	const handlerForm = (event: FormEvent) => {
		event.preventDefault()
		if (password !== "" && token !== "") {
			dispatch(postResetPassword())
		}
	}

	return (
		<FormContainer>
			<p className="text text_type_main-medium">Восстановление пароля</p>
			<form className={`${styles.form} pt-6 pb-20`} onSubmit={handlerForm}>
				<PasswordInput
					placeholder="Введите новый пароль"
					onChange={onChangePassword}
					value={password}
					name={"password"}
					extraClass="mb-6"
					required
				/>
				<Input
					type={"text"}
					placeholder={"Введите код из письма"}
					onChange={onChangeToken}
					value={token}
					name={"name"}
					error={false}
					errorText={"Неверный код"}
					extraClass="mb-6"
					required
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

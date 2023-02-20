// Import Assets

// Import Library
import { ChangeEvent, FormEvent, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import classNames from "classnames"

// Import Framework
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Components
import { FormContainer } from "components/FormContainer/FormContainer"

// Import Pages

// Import Store
import { checkToken, changePassword, postResetPassword } from "services/user/userSlice"

// Import Style
import styles from "./ResetPasswordPage.module.css"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"

// Import Utils

// Import Types
import type { FC } from "react"

export const ResetPasswordPage: FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const { user, success } = useAppSelector((state) => state.user)

	useEffect(() => {
		if (!success.forgot) {
			return navigate("/forgot-password")
		}
	}, [success.forgot, location.state, navigate])

	const onChangeToken = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(checkToken(event.target.value))
	}

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changePassword(event.target.value))
	}

	const handlerForm = (event: FormEvent) => {
		event.preventDefault()
		if (user.password !== "" && user.token !== "") {
			dispatch(postResetPassword())
		}
	}

	return (
		<FormContainer>
			<p className="text text_type_main-medium">Восстановление пароля</p>
			<form className={classNames(styles.form, "pt-6", "pb-20")} onSubmit={handlerForm}>
				<PasswordInput
					placeholder="Введите новый пароль"
					onChange={onChangePassword}
					value={user.password}
					name={"password"}
					extraClass="mb-6"
					required
				/>
				<Input
					type={"text"}
					placeholder={"Введите код из письма"}
					onChange={onChangeToken}
					value={user.token}
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
				<div className={classNames(styles.linksItem, "pb-4")}>
					<p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
					<Link to="/login" className="text text_type_main-default">
						Войти
					</Link>
				</div>
			</div>
		</FormContainer>
	)
}

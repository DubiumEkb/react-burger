// Import Library
import { FormEvent, ChangeEvent, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

// Import Framework
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Components
import { FormContainer } from "components/FormContainer/FormContainer"

// Import Store
import { changeName, changeEmail, changePassword, postRegister } from "services/user/userSlice"

// Import Types
import type { FC } from "react"

// Import Style
import styles from "./RegisterPage.module.css"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"

const RegisterPage: FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useAppDispatch()

	const { user, success } = useAppSelector((state) => state.user)

	useEffect(() => {
		if (success.user) {
			return navigate(location.state?.from.pathname || "/")
		}
	}, [success.user, location.state, navigate])

	const onChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
		dispatch(changeName(event.target.value))
	}

	const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
		dispatch(changeEmail(event.target.value))
	}

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
		dispatch(changePassword(event.target.value))
	}

	const handlerForm = (event: FormEvent) => {
		event.preventDefault()
		if (user.name !== "" && user.email !== "" && user.password !== "") {
			dispatch(postRegister())
		}
	}

	return (
		<FormContainer>
			<p className="text text_type_main-medium">Регистрация</p>
			<form className={`${styles.form} pt-6 pb-20`} onSubmit={handlerForm}>
				<Input
					type={"text"}
					placeholder={"Имя"}
					value={user.name}
					onChange={onChangeName}
					name={"name"}
					errorText={"Укажите имя"}
					extraClass="mb-6"
				/>
				<EmailInput onChange={onChangeEmail} value={user.email} extraClass="mb-6" />
				<PasswordInput onChange={onChangePassword} value={user.password} extraClass="mb-6" />
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

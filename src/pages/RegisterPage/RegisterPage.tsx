import { FormEvent, ChangeEvent, useEffect } from "react"
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { FormContainer } from "components/FormContainer/FormContainer"
import styles from "./RegisterPage.module.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { nameValue, emailValue, passwordValue, postRegister } from "services/register/registerSlice"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"

const RegisterPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useAppDispatch()
	const { user, success } = useAppSelector((state) => state.register)
	const profile = useAppSelector((state) => state.profile)

	useEffect(() => {
		if (profile.success) {
			return navigate(location.state?.from.pathname || "/")
		}
	}, [location.state, navigate, profile.success])

	const onChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
		dispatch(nameValue(event.target.value))
	}

	const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
		dispatch(emailValue(event.target.value))
	}

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
		dispatch(passwordValue(event.target.value))
	}

	const handlerForm = (event: FormEvent) => {
		event.preventDefault()
		if (user.name !== "" && user.email !== "" && user.password !== "") {
			dispatch(postRegister())
			if (success === true) {
				setTimeout(() => {
					navigate("/")
				}, 1000)
			}
		}
	}

	if (profile.success && !success) {
		return null
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

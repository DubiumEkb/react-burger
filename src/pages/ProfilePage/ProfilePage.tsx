import { useState, useRef, FormEvent, ChangeEvent, FocusEvent, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./ProfilePage.module.css"
// import { emailValue, nameValue, passwordValue, resetForm, postProfile } from "services/user/userSlice"
// import { tokenValue, postLogout } from "services/logout/logoutSlice"
// import { getProfile, tokenValue as tokenRef } from "services/user/userSlice"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"

const ProfilePage = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	// const { user, origin } = useAppSelector((state) => state.profile)
	// const { success } = useAppSelector((state) => state.logout)

	// console.debug(user)

	// useEffect(() => {
	// 	if (!success) {
	// 		dispatch(tokenRef(getCookie("access_token")))
	// 		dispatch(getProfile())
	// 	}

	// 	if (success) {
	// 		dispatch(emailValue(""))
	// 		dispatch(nameValue(""))
	// 		navigate("/")
	// 	}
	// }, [dispatch, navigate, success])

	// Begin - Input Name
	const [fieldDisabled, setDisabled] = useState(true)

	const inputNameRef = useRef<HTMLInputElement>(null)

	const handlerFormSubmit = (event: FormEvent) => {
		event.preventDefault()
		// dispatch(postProfile())
	}

	const handlerFormReset = (event: FormEvent) => {
		event.preventDefault()
		// dispatch(resetForm())
	}

	const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch(nameValue(event.target.value))
	}

	const onIconClickName = () => {
		setDisabled(false)
		setTimeout(() => inputNameRef.current?.focus(), 0)
	}

	const onBlur = (event: FocusEvent<HTMLInputElement>) => {
		setDisabled(true)
	}
	// End - Input Name

	const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch(emailValue(event.target.value))
	}

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch(passwordValue(event.target.value))
	}

	const handlerLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		// dispatch(tokenValue(getCookie("refresh_token")))
		// dispatch(postLogout())
	}

	return (
		<div className={styles.profile}>
			<div className={`${styles.profileLeft} mr-15`}>
				<nav className={`${styles.nav} mb-20`}>
					<Link
						to="/profile"
						className={`${styles.navLink} text_type_main-medium ${
							pathname === "/profile" && styles.navLinkActive
						}`}
					>
						Профиль
					</Link>

					<Link
						to="/profile/orders"
						className={`${styles.navLink} text_type_main-medium ${
							pathname === "/profile/orders" && styles.navLinkActive
						}`}
					>
						История заказов
					</Link>

					<button className={`${styles.navLink} text_type_main-medium`} onClick={handlerLogout}>
						Выход
					</button>
				</nav>

				<p className="text text_type_main-default text_color_inactive">
					В этом разделе вы можете
					<br /> изменить свои персональные данные
				</p>
			</div>

			<div className={`${styles.profileRight}`}>
				<form onSubmit={handlerFormSubmit} onReset={handlerFormReset}>
					{/* <Input
						onChange={onChangeName}
						value={user.name}
						placeholder="Имя"
						onIconClick={onIconClickName}
						// icon={"CloseIcon"}
						icon={"EditIcon"}
						onBlur={onBlur}
						extraClass="mb-6"
						ref={inputNameRef}
						disabled={fieldDisabled}
					/> */}

					{/* <EmailInput
						onChange={onChangeEmail}
						value={user.email}
						name={"email"}
						placeholder="Логин"
						isIcon={true}
						extraClass="mb-6"
					/> */}

					{/* <PasswordInput
						onChange={onChangePassword}
						value={user.password}
						name={"password"}
						icon="EditIcon"
						extraClass="mb-6"
					/> */}

					{/* {user.email !== origin.email || user.name !== origin.name || user.password !== origin.password ? (
						<div className={styles.profileUpdate}>
							<Button htmlType="reset" type="secondary" size="medium">
								Отмена
							</Button>
							<Button htmlType="submit" type="primary" size="medium">
								Сохранить
							</Button>
						</div>
					) : null} */}
				</form>
			</div>
		</div>
	)
}

export default ProfilePage

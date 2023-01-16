import { useState, useRef, FormEvent, ChangeEvent, FocusEvent, useEffect } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./ProfilePage.module.css"
import { emailValue, nameValue, passwordValue } from "services/profile/profileSlice"
import { tokenValue, postLogout } from "services/logout/logoutSlice"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"

const ProfilePage = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user } = useAppSelector((state) => state.profile)
	const { success } = useAppSelector((state) => state.logout)

	useEffect(() => {
		if (success) {
			navigate("/")
		}
	}, [navigate, success])

	// Begin - Input Name
	const [fieldDisabled, setDisabled] = useState(true)

	const inputNameRef = useRef<HTMLInputElement>(null)
	const handlerForm = (event: FormEvent) => {
		event.preventDefault()
	}

	const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(nameValue(event.target.value))
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
		dispatch(emailValue(event.target.value))
	}

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(passwordValue(event.target.value))
	}

	const handlerLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
		console.debug("qerty")
		event.preventDefault()
		dispatch(tokenValue(getCookie("refresh_token")))
		dispatch(postLogout())
	}

	return (
		<div className={styles.profile}>
			<div className={`${styles.profileLeft} mr-15`}>
				<nav className={`${styles.nav} mb-20`}>
					<NavLink
						to="/profile"
						className={`${styles.navLink} text_type_main-medium ${
							pathname === "/profile" && styles.navLinkActive
						}`}
					>
						Профиль
					</NavLink>

					<NavLink
						to="/profile/orders"
						className={`${styles.navLink} text_type_main-medium ${
							pathname === "/profile/orders" && styles.navLinkActive
						}`}
					>
						История заказов
					</NavLink>

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
				<form onSubmit={handlerForm}>
					<Input
						onChange={onChangeName}
						value={user.name}
						placeholder="Имя"
						onIconClick={onIconClickName}
						icon={"EditIcon"}
						onBlur={onBlur}
						extraClass="mb-6"
						ref={inputNameRef}
						disabled={fieldDisabled}
					/>
					<EmailInput
						onChange={onChangeEmail}
						value={user.email}
						name={"email"}
						placeholder="Логин"
						isIcon={true}
						extraClass="mb-6"
					/>
					<PasswordInput onChange={onChangePassword} value={user.password} name={"password"} icon="EditIcon" />
				</form>
			</div>
		</div>
	)
}

export default ProfilePage

// Import Library
import { useState, useRef, FormEvent, ChangeEvent, FocusEvent, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

// Import Framework
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Store
import {
	changeEmail,
	changeName,
	changePassword,
	getUser,
	checkToken,
	postLogout,
	resetForm,
	patchUser,
} from "services/user/userSlice"

// Import Style
import styles from "./ProfilePage.module.css"

// Import Types
import type { FC } from "react"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"
import classNames from "classnames"

const ProfilePage: FC = () => {
	const { pathname } = useLocation()
	const dispatch = useAppDispatch()

	const { user, origin } = useAppSelector((state) => state.user)

	useEffect(() => {
		if (getCookie("access_token") && getCookie("refresh_token")) {
			dispatch(checkToken(getCookie("access_token")))
			dispatch(getUser())
		}
	}, [dispatch])

	// Begin - Input Name
	const [fieldDisabled, setDisabled] = useState(true)

	const inputNameRef = useRef<HTMLInputElement>(null)

	const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeName(event.target.value))
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
		dispatch(changeEmail(event.target.value))
	}

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changePassword(event.target.value))
	}

	const handlerLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(checkToken(getCookie("refresh_token")))
		dispatch(postLogout())
	}

	const handlerFormSubmit = (event: FormEvent) => {
		event.preventDefault()
		dispatch(patchUser())
	}

	const handlerFormReset = (event: FormEvent) => {
		event.preventDefault()
		dispatch(resetForm())
	}

	return (
		<div className={styles.profile}>
			<div className={classNames(styles.profileLeft, "mr-15")}>
				<nav className={classNames(styles.nav, "mb-20")}>
					<Link
						to="/profile"
						className={classNames(styles.navLink, "text_type_main-medium", {
							[styles.navLinkActive]: pathname === "/profile",
						})}
					>
						Профиль
					</Link>

					<Link
						to="/profile/orders"
						className={classNames(styles.navLink, "text_type_main-medium", {
							[styles.navLinkActive]: pathname === "/profile/orders",
						})}
					>
						История заказов
					</Link>

					<button className={classNames(styles.navLink, "text_type_main-medium")} onClick={handlerLogout}>
						Выход
					</button>
				</nav>

				<p className="text text_type_main-default text_color_inactive">
					В этом разделе вы можете
					<br /> изменить свои персональные данные
				</p>
			</div>

			<div className={styles.profileRight}>
				<form onSubmit={handlerFormSubmit} onReset={handlerFormReset}>
					<Input
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
					/>

					<EmailInput
						onChange={onChangeEmail}
						value={user.email}
						name={"email"}
						placeholder="Логин"
						isIcon={true}
						extraClass="mb-6"
					/>

					<PasswordInput
						onChange={onChangePassword}
						value={user.password}
						name={"password"}
						icon="EditIcon"
						extraClass="mb-6"
					/>

					{user.password !== origin.password || user.email !== origin.email || user.name !== origin.name ? (
						<div className={styles.profileUpdate}>
							<Button htmlType="reset" type="secondary" size="medium">
								Отмена
							</Button>
							<Button htmlType="submit" type="primary" size="medium">
								Сохранить
							</Button>
						</div>
					) : null}
				</form>
			</div>
		</div>
	)
}

export default ProfilePage

import { useState, useRef, FormEvent, ChangeEvent, FocusEvent, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Store
import { getUser, checkToken, postLogout, resetForm, patchUser } from "services/user/userSlice"

import styles from "./OrdersPage.module.css"

import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"
import classNames from "classnames"

import type { FC } from "react"

export const OrdersPage: FC = () => {
	const { pathname } = useLocation()
	const dispatch = useAppDispatch()

	const { user, origin } = useAppSelector((state) => state.user)

	useEffect(() => {
		if (getCookie("access_token") && getCookie("refresh_token")) {
			dispatch(checkToken(getCookie("access_token")))
			dispatch(getUser())
		}
	}, [dispatch])

	const handlerLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(checkToken(getCookie("refresh_token")))
		dispatch(postLogout())
	}

	return (
		<div className={styles.order}>
			<div className={classNames(styles.orderLeft, "mr-15")}>
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

			<div className={styles.orderRight}></div>
		</div>
	)
}

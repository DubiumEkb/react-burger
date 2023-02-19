// Import Library
import classNames from "classnames"
import { Link, useLocation } from "react-router-dom"
// Import Framework
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Types
import type { FC } from "react"

// Import Style
import style from "./Header.module.css"

export const Header: FC = () => {
	const location = useLocation()

	return (
		<header className={classNames(style.header, "pt-4", "pb-4")}>
			<div className={style.headerContainer}>
				<nav className={style.headerNavLeft}>
					<Link
						to="/"
						className={classNames(style.headerNavLeftItem, "p-5", {
							[style.headerNavLeftItemActive]: location.pathname === "/",
						})}
					>
						{/* @ts-ignore */}
						<BurgerIcon />
						<span className="text text_type_main-default pl-2">Конструктор</span>
					</Link>

					<Link
						to="/feed"
						className={classNames(style.headerNavLeftItem, "p-5", {
							[style.headerNavLeftItemActive]: location.pathname === "/feed",
						})}
					>
						{/* @ts-ignore */}
						<ListIcon />
						<span className="text text_type_main-default pl-2">Лента заказов</span>
					</Link>
				</nav>

				<Link to="/" className={style.headerLogo}>
					<Logo />
				</Link>

				<nav className={style.headerNavRight}>
					<Link
						to="/profile"
						// className={`${headerLinkClass} ${
						// 	location.pathname === "/profile" && style.headerNavLeftItemActive
						// }`}
						className={classNames(style.headerNavRightItem, "p-5", {
							[style.headerNavRightItemActive]: location.pathname === "/profile",
						})}
					>
						{/* @ts-ignore */}
						<ProfileIcon />
						<span className="text text_type_main-default pl-2">Личный кабинет</span>
					</Link>
				</nav>
			</div>
		</header>
	)
}

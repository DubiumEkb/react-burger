// Import Assets

// Import Library
import classNames from "classnames"
import { NavLink } from "react-router-dom"

// Import Framework
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Components

// Import Pages

// Import Store

// Import Style
import style from "./Header.module.css"
// Import Hooks

// Import Utils

// Import Types
import type { FC } from "react"

export const Header: FC = () => {
	return (
		<header className={classNames(style.header, "pt-4", "pb-4")}>
			<div className={style.headerContainer}>
				<nav className={style.headerNavLeft}>
					<NavLink
						to="/"
						className={({ isActive }) =>
							[style.headerNavLeftItem, "p-5", isActive ? style.headerNavLeftItemActive : null]
								.filter(Boolean)
								.join(" ")
						}
					>
						<>
							{/* @ts-ignore */}
							<BurgerIcon />
							<span className="text text_type_main-default pl-2">Конструктор</span>
						</>
					</NavLink>

					<NavLink
						to="/feed"
						className={({ isActive }) =>
							[style.headerNavLeftItem, "p-5", isActive ? style.headerNavLeftItemActive : null]
								.filter(Boolean)
								.join(" ")
						}
					>
						<>
							{/* @ts-ignore */}
							<ListIcon />
							<span className="text text_type_main-default pl-2">Лента заказов</span>
						</>
					</NavLink>
				</nav>

				<NavLink to="/" className={style.headerLogo}>
					<Logo />
				</NavLink>

				<nav className={style.headerNavRight}>
					<NavLink
						to="/profile"
						className={({ isActive }) =>
							[style.headerNavRightItem, "p-5", isActive ? style.headerNavRightItemActive : null]
								.filter(Boolean)
								.join(" ")
						}
					>
						<>
							{/* @ts-ignore */}
							<ProfileIcon />
							<span className="text text_type_main-default pl-2">Личный кабинет</span>
						</>
					</NavLink>
				</nav>
			</div>
		</header>
	)
}

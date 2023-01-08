import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { NavLink } from "react-router-dom"
import style from "./AppHeader.module.css"

const AppHeader = () => {
	return (
		<header className={`${style.header} pt-4 pb-4`}>
			<div className={style.headerContainer}>
				<nav className={style.headerNavLeft}>
					<NavLink to="/" className={`${style.headerNavLeftItem} ${style.headerNavLeftItemActive} p-5`}>
						{/* @ts-ignore */}
						<BurgerIcon />
						<span className="text text_type_main-default pl-2">Конструктор</span>
					</NavLink>

					<NavLink to="/" className={`${style.headerNavLeftItem} p-5`}>
						{/* @ts-ignore */}
						<ListIcon />
						<span className="text text_type_main-default pl-2">Лента заказов</span>
					</NavLink>
				</nav>

				<NavLink to="/" className={style.headerLogo}>
					<Logo />
				</NavLink>

				<nav className={style.headerNavRight}>
					<NavLink to="/profile" className={`${style.headerNavRightItem} p-5`}>
						{/* @ts-ignore */}
						<ProfileIcon />
						<span className="text text_type_main-default pl-2">Личный кабинет</span>
					</NavLink>
				</nav>
			</div>
		</header>
	)
}

export default AppHeader

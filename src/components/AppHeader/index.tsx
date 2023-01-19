import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link } from "react-router-dom"
import style from "./AppHeader.module.css"

const AppHeader = () => {
	return (
		<header className={`${style.header} pt-4 pb-4`}>
			<div className={style.headerContainer}>
				<nav className={style.headerNavLeft}>
					<Link to="/" className={`${style.headerNavLeftItem} ${style.headerNavLeftItemActive} p-5`}>
						{/* @ts-ignore */}
						<BurgerIcon />
						<span className="text text_type_main-default pl-2">Конструктор</span>
					</Link>

					<Link to="/feed" className={`${style.headerNavLeftItem} p-5`}>
						{/* @ts-ignore */}
						<ListIcon />
						<span className="text text_type_main-default pl-2">Лента заказов</span>
					</Link>
				</nav>

				<Link to="/" className={style.headerLogo}>
					<Logo />
				</Link>

				<nav className={style.headerNavRight}>
					<Link to="/profile" className={`${style.headerNavRightItem} p-5`}>
						{/* @ts-ignore */}
						<ProfileIcon />
						<span className="text text_type_main-default pl-2">Личный кабинет</span>
					</Link>
				</nav>
			</div>
		</header>
	)
}

export default AppHeader

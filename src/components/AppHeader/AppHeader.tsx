import { Logo, BurgerIcon,ListIcon ,ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import style from "./AppHeader.module.css"

const AppHeader = () => {
	return (
		<header className={`${style.header} pt-4 pb-4`}>
			<div className={style.headerContainer}>
				<nav className={style.headerNavLeft}>
					<div className={`${style.headerNavLeftItem} p-5`}>
						{/* @ts-ignore */}
						<BurgerIcon />
						<span className="text text_type_main-default pl-2">Конструктор</span>
					</div>
					<div className={`${style.headerNavLeftItem} p-5`}>
						{/* @ts-ignore */}
						<ListIcon />
						<span className="text text_type_main-default pl-2">Лента заказов</span>
					</div>
				</nav>

				<a href="/" className={style.headerLogo}><Logo /></a>

				<nav className={style.headerNavRight}>
					<div className={`${style.headerNavRightItem} p-5`}>
						{/* @ts-ignore */}
						<ProfileIcon />
						<span className="text text_type_main-default pl-2">Личный кабинет</span>
					</div>
				</nav>
			</div>
		</header>
	)
}

export default AppHeader
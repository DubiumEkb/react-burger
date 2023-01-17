// Import Library
import { useEffect, useState, useRef } from "react"
import { Link, useLocation } from "react-router-dom"

// Import Framework
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Components
import { BurgerIngredientsItem } from "./ui"

// Import Store
import { getIngredients } from "services/ingredients/ingredientsSlice"
import { openModal } from "services/modal/modalSlice"

// Import Style
import style from "./BurgerIngredients.module.css"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"

// Import Types
import type { UIEvent } from "react"
import { dataType } from "utils/types/dataType"

const BurgerIngredients = () => {
	const location = useLocation()
	const [current, setCurrent] = useState<string>("buns")

	const dispatch = useAppDispatch()
	const { items, pending, fulfilled, rejected } = useAppSelector((state) => state.ingredients)

	useEffect(() => {
		dispatch(getIngredients())
	}, [dispatch])

	// Begin - Modal
	const handleShow = (): void => {
		dispatch(openModal())
	}
	// End - Modal

	// Begin - Scroll and Tabs
	const refBuns = useRef<null | HTMLDivElement>(null)
	const refSauces = useRef<null | HTMLDivElement>(null)
	const refStuffing = useRef<null | HTMLDivElement>(null)

	const handleTab = (event: string) => {
		setCurrent(event)
	}

	const handleScroll = (ref: HTMLDivElement) => {
		ref.scrollIntoView({ block: "start", behavior: "smooth" })
	}

	const handleOnScroll = (event: UIEvent): void => {
		const scroll = event.currentTarget.scrollTop
		if (refBuns.current !== null && refSauces.current !== null) {
			const sauces = refBuns?.current?.clientHeight / 2
			const stuffing = refBuns?.current?.clientHeight + refSauces?.current?.clientHeight / 2

			if (scroll < sauces) {
				setCurrent("buns")
			} else if (scroll > sauces && scroll < stuffing) {
				setCurrent("sauces")
			} else if (scroll > stuffing) {
				setCurrent("stuffing")
			}
		}
	}
	// End - Scroll

	if (!items) {
		return null
	}

	return (
		<section className={`${style.BurgerIngredients} pr-10`}>
			<div className="pt-10 pb-5">
				<h1 className="text text_type_main-large">Соберите бургер</h1>
			</div>

			<nav className={style.BurgerIngredientsTab}>
				<Tab
					value="buns"
					active={current === "buns"}
					onClick={(event) => {
						handleTab(event)
						refBuns?.current && handleScroll(refBuns?.current)
					}}
				>
					Булки
				</Tab>

				<Tab
					value="sauces"
					active={current === "sauces"}
					onClick={(event) => {
						handleTab(event)
						refSauces?.current && handleScroll(refSauces?.current)
					}}
				>
					Соусы
				</Tab>

				<Tab
					value="stuffing"
					active={current === "stuffing"}
					onClick={(event) => {
						handleTab(event)
						refStuffing?.current && handleScroll(refStuffing?.current)
					}}
				>
					Начинки
				</Tab>
			</nav>

			<div className={style.BurgerIngredientsContent} onScroll={(event) => handleOnScroll(event)}>
				<section className={`${style.BurgerIngredientsContentSection} pt-10`} ref={refBuns}>
					<h2 className="text text_type_main-medium pb-6">Булки</h2>

					<div className={style.BurgerIngredientsContentSectionRow}>
						{pending && <div className="text text_type_main-large p-15">Загрузка...</div>}
						{fulfilled &&
							items.map((item: dataType) => {
								return item.type === "bun" ? (
									<Link
										to={`/ingredients/${item._id}`}
										state={{ background: location }}
										className={style.BurgerIngredientsBtn}
										key={item._id}
										onClick={() => handleShow()}
									>
										<BurgerIngredientsItem ingredient={item} classname="pb-10" />
									</Link>
								) : null
							})}
						{rejected && <div className="text text_type_main-large p-15">Ошибка!</div>}
					</div>
				</section>

				<section className={style.BurgerIngredientsContentSection} ref={refSauces}>
					<h2 className="text text_type_main-medium pb-6">Соусы</h2>
					<div className={style.BurgerIngredientsContentSectionRow}>
						{pending && <div className="text text_type_main-large p-15">Загрузка...</div>}
						{fulfilled &&
							items.map((item: dataType) => {
								return item.type === "sauce" ? (
									<Link
										to={`/ingredients/${item._id}`}
										state={{ background: location }}
										className={style.BurgerIngredientsBtn}
										key={item._id}
										onClick={() => handleShow()}
									>
										<BurgerIngredientsItem ingredient={item} classname="pb-8" />
									</Link>
								) : null
							})}
						{rejected && <div className="text text_type_main-large p-15">Ошибка!</div>}
					</div>
				</section>

				<section className={style.BurgerIngredientsContentSection} ref={refStuffing}>
					<h2 className="text text_type_main-medium pb-6">Начинки</h2>
					<div className={style.BurgerIngredientsContentSectionRow}>
						{pending && <div className="text text_type_main-large p-15">Загрузка...</div>}
						{fulfilled &&
							items.map((item: dataType) => {
								return item.type === "main" ? (
									<Link
										to={`/ingredients/${item._id}`}
										state={{ background: location }}
										className={style.BurgerIngredientsBtn}
										key={item._id}
										onClick={() => handleShow()}
									>
										<BurgerIngredientsItem ingredient={item} classname="pb-8" />
									</Link>
								) : null
							})}
						{rejected && <div className="text text_type_main-large p-15">Ошибка!</div>}
					</div>
				</section>
			</div>
		</section>
	)
}

export default BurgerIngredients

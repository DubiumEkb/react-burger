// Import Library
import { useState, useRef } from "react"
import { Link, useLocation } from "react-router-dom"

// Import Framework
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
<<<<<<< HEAD
import BurgerIngredientsItem from "./ui/BurgerIngredientsItem"
=======

// Import Components
import { BurgerIngredientsItem } from "./ui"

// Import Store
import { openModal } from "services/modal/modalSlice"
>>>>>>> 1ba2c6b30a86975e0f44e2880fbf4390ffa36935

// Import Style
import style from "./BurgerIngredients.module.css"

<<<<<<< HEAD
// Import Props
import {dataType} from "../../utils/dataType"

export interface BurgerIngredientsProps {
  data: dataType[]
}

const BurgerIngredients = ({data}:BurgerIngredientsProps) => {
	const [current, setCurrent] = useState('one')
=======
// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"

// Import Types
import type { FC, UIEvent } from "react"
import { DataType } from "utils/types/dataType"

const BurgerIngredients: FC = () => {
	const location = useLocation()
	const [current, setCurrent] = useState<string>("buns")

	const dispatch = useAppDispatch()
	const { items, pending, fulfilled, rejected } = useAppSelector((state) => state.ingredients)

	// Begin - Modal
	const handleShow = (): void => {
		dispatch(openModal("ingredient"))
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
>>>>>>> 1ba2c6b30a86975e0f44e2880fbf4390ffa36935

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

<<<<<<< HEAD
				{/* @ts-ignore */}
				<Tab value="two" active={current === 'two'} onClick={setCurrent}>
					<span>Соусы</span>
				</Tab>

				{/* @ts-ignore */}
				<Tab value="three" active={current === 'three'} onClick={setCurrent}>
					<span>Начинки</span>
=======
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
>>>>>>> 1ba2c6b30a86975e0f44e2880fbf4390ffa36935
				</Tab>
			</nav>

			<div className={style.BurgerIngredientsContent} onScroll={(event) => handleOnScroll(event)}>
				<section className={`${style.BurgerIngredientsContentSection} pt-10`} ref={refBuns}>
					<h2 className="text text_type_main-medium pb-6">Булки</h2>

					<div className={style.BurgerIngredientsContentSectionRow}>
<<<<<<< HEAD
						{data.map((item) => {
							return item.type === "bun" ? (
								<BurgerIngredientsItem key={item._id} item={item} classname="pb-10" />
							) : null
						})}
=======
						{pending && <div className="text text_type_main-large p-15">Загрузка...</div>}
						{fulfilled &&
							items.map((item: DataType) => {
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
>>>>>>> 1ba2c6b30a86975e0f44e2880fbf4390ffa36935
					</div>
				</section>

				<section className={style.BurgerIngredientsContentSection} ref={refSauces}>
					<h2 className="text text_type_main-medium pb-6">Соусы</h2>
					<div className={style.BurgerIngredientsContentSectionRow}>
<<<<<<< HEAD
						{data.map((item) => {
							return item.type === "sauce" ? (
								<BurgerIngredientsItem key={item._id} item={item} classname="pb-8" />
							) : null
						})}
=======
						{pending && <div className="text text_type_main-large p-15">Загрузка...</div>}
						{fulfilled &&
							items.map((item: DataType) => {
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
>>>>>>> 1ba2c6b30a86975e0f44e2880fbf4390ffa36935
					</div>
				</section>

				<section className={style.BurgerIngredientsContentSection} ref={refStuffing}>
					<h2 className="text text_type_main-medium pb-6">Начинки</h2>
					<div className={style.BurgerIngredientsContentSectionRow}>
<<<<<<< HEAD
						{data.map((item) => {
							return item.type === "main" ? (
								<BurgerIngredientsItem key={item._id} item={item} classname="pb-8" />
							) : null
						})}
=======
						{pending && <div className="text text_type_main-large p-15">Загрузка...</div>}
						{fulfilled &&
							items.map((item: DataType) => {
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
>>>>>>> 1ba2c6b30a86975e0f44e2880fbf4390ffa36935
					</div>
				</section>
			</div>
		</section>
	)
}

export default BurgerIngredients
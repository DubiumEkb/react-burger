// Import Components
import { useState } from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import BurgerIngredientsItem from "./ui/BurgerIngredientsItem"

// Import Style
import style from "./BurgerIngredients.module.css"

const BurgerIngredients = ({data}: any) => {
	const [current, setCurrent] = useState('one')

	return (
		<section className={`${style.BurgerIngredients} pr-10`}>
			<div className="pt-10 pb-5">
				<h1 className="text text_type_main-large">Соберите бургер</h1>
			</div>

			<nav className={style.BurgerIngredientsTab}>
				{/* @ts-ignore */}
				<Tab value="one" active={current === "one"} onClick={setCurrent}>
					Булки
				</Tab>

				{/* @ts-ignore */}
				<Tab value="two" active={current === 'two'} onClick={setCurrent}>
					<span>Соусы</span>
				</Tab>

				{/* @ts-ignore */}
				<Tab value="three" active={current === 'three'} onClick={setCurrent}>
					<span>Начинки</span>
				</Tab>
			</nav>

			<div className={style.BurgerIngredientsContent}>
				<section id="one" className={`${style.BurgerIngredientsContentSection} pt-10`}>
					<h2 className="text text_type_main-medium pb-6">Булки</h2>
					<div className={style.BurgerIngredientsContentSectionRow}>
						{data.map((item:any) => {
							return item.type === "bun" ? (
								<BurgerIngredientsItem key={item._id} item={item} classname="pb-10" />
							) : null
						})}
					</div>
				</section>

				<section id="two" className={style.BurgerIngredientsContentSection}>
					<h2 className="text text_type_main-medium pb-6">Соусы</h2>
					<div className={style.BurgerIngredientsContentSectionRow}>
						{data.map((item:any) => {
							return item.type === "sauce" ? (
								<BurgerIngredientsItem key={item._id} item={item} classname="pb-8" />
							) : null
						})}
					</div>
				</section>

				<section id="three" className={style.BurgerIngredientsContentSection}>
					<h2 className="text text_type_main-medium pb-6">Начинки</h2>
					<div className={style.BurgerIngredientsContentSectionRow}>
						{data.map((item:any) => {
							return item.type === "main" ? (
								<BurgerIngredientsItem key={item._id} item={item} classname="pb-8" />
							) : null
						})}
					</div>
				</section>
			</div>
		</section>
	)
}

export default BurgerIngredients
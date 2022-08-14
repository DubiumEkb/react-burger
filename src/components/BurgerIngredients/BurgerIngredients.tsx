// Import Components
import { useState } from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import BurgerIngredientsItem from "./ui/BurgerIngredientsItem"
import Modal from "../Modal/Modal"
import IngredientDetails from "../IngredientDetails/IngredientDetails"

// Import Style
import style from "./BurgerIngredients.module.css"

// Import Props
import { dataType } from "../../utils/dataType"

export interface BurgerIngredientsProps {
	data: dataType[]
}

const BurgerIngredients = ({ data }: BurgerIngredientsProps) => {
	const [current, setCurrent] = useState("one")
	const [ingredient, setIngredient] = useState()
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = (item: any) => {
		setShow(true)
		setIngredient(item)
	}

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
				<Tab value="two" active={current === "two"} onClick={setCurrent}>
					<span>Соусы</span>
				</Tab>

				{/* @ts-ignore */}
				<Tab value="three" active={current === "three"} onClick={setCurrent}>
					<span>Начинки</span>
				</Tab>
			</nav>

			<div className={style.BurgerIngredientsContent}>
				<section id="one" className={`${style.BurgerIngredientsContentSection} pt-10`}>
					<h2 className="text text_type_main-medium pb-6">Булки</h2>
					<div className={style.BurgerIngredientsContentSectionRow}>
						{data.map((item) => {
							return item.type === "bun" ? (
								<button className={style.BurgerIngredientsBtn} key={item._id} onClick={() => handleShow(item)}>
									<BurgerIngredientsItem item={item} classname="pb-10" />
								</button>
							) : null
						})}
					</div>
				</section>

				<section id="two" className={style.BurgerIngredientsContentSection}>
					<h2 className="text text_type_main-medium pb-6">Соусы</h2>
					<div className={style.BurgerIngredientsContentSectionRow}>
						{data.map((item) => {
							return item.type === "sauce" ? (
								<button className={style.BurgerIngredientsBtn} key={item._id} onClick={() => handleShow(item)}>
									<BurgerIngredientsItem item={item} classname="pb-8" />
								</button>
							) : null
						})}
					</div>
				</section>

				<section id="three" className={style.BurgerIngredientsContentSection}>
					<h2 className="text text_type_main-medium pb-6">Начинки</h2>
					<div className={style.BurgerIngredientsContentSectionRow}>
						{data.map((item) => {
							return item.type === "main" ? (
								<button className={style.BurgerIngredientsBtn} key={item._id} onClick={() => handleShow(item)}>
									<BurgerIngredientsItem item={item} classname="pb-8" />
								</button>
							) : null
						})}
					</div>
				</section>

				{show && ingredient && (
					<Modal title="Детали ингредиента" isOpen={show} onClose={handleClose} overlay={true}>
						<IngredientDetails item={ingredient} />
					</Modal>
				)}
			</div>
		</section>
	)
}

export default BurgerIngredients

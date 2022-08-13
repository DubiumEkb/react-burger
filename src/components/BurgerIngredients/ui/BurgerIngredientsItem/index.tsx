// Import Components
import { useState } from "react"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../../../Modal/Modal"

// Import Style
import style from "./BurgerIngredientsItem.module.css"
import IngredientDetails from "../../../IngredientDetails/IngredientDetails"

// Import Props
import { dataType } from "../../../../utils/dataType"

export interface BurgerIngredientsProps {
	item: dataType
	classname: string
}

const BurgerIngredientsItem = ({ item, classname }: BurgerIngredientsProps) => {
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	return (
		<>
			<button onClick={handleShow} className={`${style.BurgerIngredientsItem} ${classname}`}>
				<div className={`${style.BurgerIngredientsItemImage} pl-4 pr-4`}>
					<Counter count={1} size="default" />
					<img src={item?.image} alt={item?.name} />
				</div>

				<div className={`${style.BurgerIngredientsItemPrice} pt-1 pb-1`}>
					<div className="pr-2 text text_type_digits-default">{item?.price}</div>
					{/* @ts-ignore */}
					<CurrencyIcon />
				</div>

				<div className={style.BurgerIngredientsItemTitle}>{item?.name}</div>
			</button>

			{show && (
				<Modal title="Детали ингредиента" isOpen={show} onClose={handleClose} overlay={true}>
					<IngredientDetails item={item} />
				</Modal>
			)}
		</>
	)
}

export default BurgerIngredientsItem

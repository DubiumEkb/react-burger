// Imporrt Components
import { useState, useContext, useEffect } from "react"
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import BurgerConstructorItem from "./ui/BurgerConstructorItem"
import Modal from "../Modal/Modal"
import OrderDetails from "../OrderDetails/OrderDetails"

// Import Style
import style from "./BurgerConstructor.module.css"

// Import Data
import { fetchDataOrders } from "utils/api/ingredients"

// Import Context
import { IngredientsContext } from "utils/context/IngredientsContext"

const BurgerConstructor = () => {
	const data = useContext(IngredientsContext)
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const [state, setState] = useState(null)

	useEffect(() => {
		fetchDataOrders(data).then((num) => {
			setState(num)
		})
	}, [data])

	return (
		<section className={`${style.BurgerConstructor} pt-25`}>
			<BurgerConstructorItem data={data} type="top" />

			<div className={`${style.BurgerConstructorContainer} pr-2`}>
				<BurgerConstructorItem data={data} />
			</div>

			<BurgerConstructorItem data={data} type="bottom" />

			<div className={`${style.BurgerConstructorOrder} mt-10`}>
				<div className={`${style.BurgerConstructorOrderPrice} mr-10`}>
					<div className="mr-2 text text_type_digits-medium">610</div>
					<CurrencyIcon type="primary" />
				</div>

				{/* @ts-ignore */}
				<Button type="primary" size="large" onClick={handleShow}>
					Оформить заказ
				</Button>
				{show && (
					<Modal isOpen={show} onClose={handleClose} overlay={true}>
						<OrderDetails sum={state} />
					</Modal>
				)}
			</div>
		</section>
	)
}

export default BurgerConstructor

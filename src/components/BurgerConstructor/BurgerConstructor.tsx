// Imporrt Components
import { useState } from "react"
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import BurgerConstructorItem from "./ui/BurgerConstructorItem"
import Modal from "../Modal/Modal"
import OrderDetails from "../OrderDetails/OrderDetails"

// Import Style
import style from "./BurgerConstructor.module.css"

// Import Props
import { dataType } from "../../utils/dataType"

export interface BurgerConstructorProps {
	data: dataType[]
}

const BurgerConstructor = ({ data }: BurgerConstructorProps) => {
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

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
						<OrderDetails />
					</Modal>
				)}
			</div>
		</section>
	)
}

export default BurgerConstructor

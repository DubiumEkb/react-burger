// Imporrt Components
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components"
import BurgerConstructorItem from "./ui/BurgerConstructorItem"

// Import Style
import style from "./BurgerConstructor.module.css"

const BurgerConstructor = ({data}:any) => {

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
				<Button type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
		</section>
	)
}

export default BurgerConstructor
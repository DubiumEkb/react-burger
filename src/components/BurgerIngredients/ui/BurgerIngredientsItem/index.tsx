import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components"
import style from "./BurgerIngredientsItem.module.css"

const BurgerIngredientsItem = ({item, classname}: any) => {
	return (
		<div className={`${style.BurgerIngredientsItem} ${classname}`}>
			<div className={`${style.BurgerIngredientsItemImage} pl-4 pr-4`}>
				<Counter count={1} size="default" />
				<img src={item?.image} alt={item?.name} />
			</div>

			<div className={`${style.BurgerIngredientsItemPrice} pt-1 pb-1`}>
				<div className="pr-2 text text_type_digits-default">{item?.price}</div>
				{/* @ts-ignore */}
				<CurrencyIcon />
			</div>

			<div className={style.BurgerIngredientsItemTitle}>
				{item?.name}
			</div>
		</div>
	)
}

export default BurgerIngredientsItem
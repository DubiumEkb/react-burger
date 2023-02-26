// Import Assets

// Import Library
import classNames from "classnames"
// Import Framework
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
// Import Components

// Import Pages

// Import Store

// Import Style
import style from "./BurgerIngredientsItem.module.css"
// Import Hooks

// Import Types
import type { FC } from "react"

const BurgerIngredientsItem: FC = ({ item, classname }: any) => {
	return (
		<div className={classNames(style.BurgerIngredientsItem, classname)}>
			<div className={classNames(style.BurgerIngredientsItemImage, "pl-4", "pr-4")}>
				<Counter count={1} size="default" />
				<img src={item?.image} alt={item?.name} />
			</div>

			<div className={classNames(style.BurgerIngredientsItemPrice, "pt-1", "pb-1")}>
				<div className="pr-2 text text_type_digits-default">{item?.price}</div>
				{/* @ts-ignore */}
				<CurrencyIcon />
			</div>

			<div className={style.BurgerIngredientsItemTitle}>{item?.name}</div>
		</div>
	)
}

export default BurgerIngredientsItem

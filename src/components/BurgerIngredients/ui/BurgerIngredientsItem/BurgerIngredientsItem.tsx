// Import Library
import { useDrag } from "react-dnd"

// Import Framework
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Components

// Import Store

// Import Style
import style from "./BurgerIngredientsItem.module.css"

// Import Hooks
import { useAppSelector } from "utils/hooks/useAppStore"

// Import Types
import { DataType } from "utils/types/dataType"

type BurgerIngredientsProps = {
	ingredient: DataType
	classname: string
}

export const BurgerIngredientsItem = ({ ingredient, classname }: BurgerIngredientsProps) => {
	const { mainList, bunItem } = useAppSelector((state) => state.constSlice)
	const count = mainList?.filter((item: DataType) => item._id === ingredient?._id).length

	const [{ isDragging }, drag] = useDrag({
		type: "ingredient",
		item: ingredient,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const opacity = isDragging && style.BurgerIngredientsItemDragging

	return (
		<div ref={drag} className={`${style.BurgerIngredientsItem} ${classname} ${opacity}`}>
			<div className={`${style.BurgerIngredientsItemImage} pl-4 pr-4`}>
				{count > 0 && <Counter count={count} size="default" />}

				{bunItem && bunItem._id === ingredient._id && <Counter count={2} size="default" />}

				<img src={ingredient?.image} alt={ingredient?.name} />
			</div>

			<div className={`${style.BurgerIngredientsItemPrice} pt-1 pb-1`}>
				<div className="pr-2 text text_type_digits-default">{ingredient?.price}</div>
				{/* @ts-ignore */}
				<CurrencyIcon />
			</div>

			<div className={style.BurgerIngredientsItemTitle}>{ingredient?.name}</div>
		</div>
	)
}

// Import Library
import { useCallback } from "react"
import { useDrop } from "react-dnd"
import { useNavigate } from "react-router-dom"

// Import Framework
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Components
import { BurgerConstructorItem } from "./ui"

// Import Store
import { addBunItem, createMainList, addMainList } from "services/constructor/constructorSlice"
import { openModal } from "services/modal/modalSlice"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"

// Import Types
import type { FC } from "react"
import { DataType } from "utils/types/dataType"

// Import Style
import style from "./BurgerConstructor.module.css"

const BurgerConstructor: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { mainList, bunItem, totalPrice } = useAppSelector((state) => state.constSlice)
	const { success } = useAppSelector((state) => state.user)

	// Begin - Перенос из столбца ингредиентов
	const [{ dragItem, canDrop }, drop] = useDrop({
		accept: "ingredient",
		drop(item: DataType) {
			if (item?.type === "bun") {
				dispatch(addBunItem(item))
			} else {
				dispatch(addMainList(item))
			}
		},
		collect: (monitor) => ({
			dragItem: monitor.getItem(),
			canDrop: monitor.canDrop(),
		}),
	})
	// End - Перенос из столбца ингредиентов

	// Begin - Сортровка
	const moveCard = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const updateIngredients = [...mainList]

			updateIngredients.splice(dragIndex, 1)
			updateIngredients.splice(hoverIndex, 0, mainList[dragIndex])
			dispatch(createMainList(updateIngredients))
		},
		[dispatch, mainList],
	)
	// End - Сортровка

	// Begin - Modal
	const handleShow = (item: DataType): void => {
		if (!success.user && !getCookie("access_token") && !getCookie("refresh_token")) {
			return navigate("/login")
		}

		if (getCookie("access_token") && getCookie("refresh_token")) {
			dispatch(openModal("order"))
		}
	}
	// End - Modal

	const dragBuns = canDrop && dragItem && dragItem.type === "bun"
	const dragIngredients = canDrop && dragItem && dragItem.type !== "bun"

	return (
		<section className={`${style.BurgerConstructor} pt-25`}>
			<div ref={drop} className={`${style.BurgerConstructorItems}`}>
				<div className={`${style.BurgerConstructorItem} ${dragBuns && style.BurgerConstructorBorder} mb-4`}>
					{bunItem && (
						<ConstructorElement
							type="top"
							isLocked={true}
							text={`${bunItem?.name} (верх)`}
							price={bunItem?.price}
							thumbnail={bunItem?.image}
						/>
					)}
				</div>

				<div
					className={`${style.BurgerConstructorItem} ${style.BurgerConstructorContainer} ${
						dragIngredients && style.BurgerConstructorBorder
					} ${mainList.length > 0 && "pr-2"} `}
				>
					{mainList.length > 0 &&
						mainList.map((item, index) => {
							return <BurgerConstructorItem key={item.sortingId} index={index} item={item} moveCard={moveCard} />
						})}
				</div>

				<div className={`${style.BurgerConstructorItem} ${dragBuns && style.BurgerConstructorBorder} mt-4`}>
					{bunItem && (
						<ConstructorElement
							type="bottom"
							isLocked={true}
							text={`${bunItem?.name} (низ)`}
							price={bunItem?.price}
							thumbnail={bunItem?.image}
						/>
					)}
				</div>
			</div>

			<div className={`${style.BurgerConstructorOrder} mt-10`}>
				<div className={`${style.BurgerConstructorOrderPrice} mr-10`}>
					<div className="mr-2 text text_type_digits-medium">{totalPrice}</div>
					<CurrencyIcon type="primary" />
				</div>

				{/* @ts-ignore */}
				<Button type="primary" size="large" onClick={handleShow} htmlType="button">
					Оформить заказ
				</Button>
			</div>
		</section>
	)
}

export default BurgerConstructor

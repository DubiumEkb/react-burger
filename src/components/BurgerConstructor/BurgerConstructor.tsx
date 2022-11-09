// Import Library
import { useCallback } from "react"
import { useDrop } from "react-dnd"

// Import Framework
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Components
import { BurgerConstructorItem } from "./ui"
import Modal from "components/Modal"
import OrderDetails from "components/OrderDetails/OrderDetails"

// Import Store
import { addBunItem, newMainList, addMainList } from "features/constructor/constructorSlice"
import { toggleModal, closeModal } from "features/constructor/constructorModalSlice"

// Import Style

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"

// Import Types
import { dataType } from "utils/types/dataType"

// Import Style
import style from "./BurgerConstructor.module.css"

const BurgerConstructor = () => {
	const dispatch = useAppDispatch()
	const { mainList, bunItem, totalPrice, orderCode } = useAppSelector((state) => state.constSlice)
	const { show } = useAppSelector((state) => state.constructorSliceModal)

	// Begin - Перенос из столбца ингредиентов
	const [{ dragItem, canDrop }, drop] = useDrop({
		accept: "ingredient",
		drop(item: dataType) {
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
			const newIngredients = [...mainList]

			newIngredients.splice(dragIndex, 1)
			newIngredients.splice(hoverIndex, 0, mainList[dragIndex])
			dispatch(newMainList(newIngredients))
		},
		[dispatch, mainList],
	)
	// End - Сортровка

	// Begin - Modal
	const handleClose = () => {
		dispatch(closeModal(false))
	}

	const handleShow = (item: dataType): void => {
		dispatch(toggleModal(true))
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
				{show && (
					<Modal isOpen={show} onClose={handleClose} overlay={true}>
						<OrderDetails sum={orderCode} />
					</Modal>
				)}
			</div>
		</section>
	)
}

export default BurgerConstructor

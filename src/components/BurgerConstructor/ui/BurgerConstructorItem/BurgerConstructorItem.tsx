// Import Assets

// Import Library
import { useRef } from "react"
import { useDrop, useDrag } from "react-dnd"
// Import Framework
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
// Import Components

// Import Store
import { deleteItem } from "services/constructor/constructorSlice"
// Import Style
import style from "./BurgerConstructorItem.module.css"
// Import Hooks
import { useAppDispatch } from "utils/hooks/useAppStore"
// Import Types
import type { FC } from "react"
import type { Identifier, XYCoord } from "dnd-core"
import { DataType } from "utils/types/dataType"
type BurgerConstructorItemProps = {
	item: DataType
	index: number
	moveCard: (dragIndex: number, hoverIndex: number) => void
}
type DragItem = {
	index: number
	id: string
}

export const BurgerConstructorItem: FC<BurgerConstructorItemProps> = ({ item, index, moveCard }) => {
	const dispatch = useAppDispatch()
	const ref = useRef<HTMLDivElement>(null)

	const handlerDelete = (ingredient: DataType) => {
		dispatch(deleteItem(ingredient))
	}

	// Begin - Сортровка
	const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
		accept: "sorting",
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			}
		},
		hover(item: DragItem, monitor) {
			if (!ref.current && !index) {
				return
			}

			const dragIndex = item.index
			const hoverIndex = index

			if (dragIndex === hoverIndex) {
				return
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect()

			if (hoverBoundingRect) {
				const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

				const clientOffset = monitor.getClientOffset()

				const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

				if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
					return
				}

				if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
					return
				}

				moveCard(dragIndex, hoverIndex)

				item.index = hoverIndex
			}
		},
	})

	const [{ isDragging }, drag] = useDrag({
		type: "sorting",
		item: () => {
			return { id: item.sortingId, index }
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const opacity = isDragging ? 0 : 1

	drag(drop(ref))
	// End - Сортровка

	return (
		<div className={style.Burger} style={{ opacity: opacity }} ref={ref} data-handler-id={handlerId}>
			<DragIcon type="primary" />
			<ConstructorElement
				key={item?.sortingId}
				isLocked={false}
				text={item?.name}
				price={item?.price}
				thumbnail={item?.image}
				handleClose={() => handlerDelete(item)}
			/>
		</div>
	)
}

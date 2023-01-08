// Imporrt Components
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Style
import style from "./BurgerConstructorItem.module.css"

// Import Props
import { dataType } from "utils/types/dataType"

export interface BurgerConstructorItemProps {
	data: dataType[]
	type?: string
}

const BurgerConstructorItem = ({ data, type }: BurgerConstructorItemProps) => {
	return (
		<>
			{data.map((item, index) => {
				return item.type === "bun" && type && index === 0 ? (
					<div
						key={item._id + index}
						className={`ml-8 mr-4 ${item.type === "bun" && type === "top" ? "mb-4" : "mt-4"} ${
							style.BurgerConstructorItem
						} `}
					>
						<ConstructorElement
							type={type === "top" ? "top" : "bottom"}
							isLocked={true}
							text={`${item.name} ${item.type === "bun" && type === "top" ? "(верх)" : "(низ)"}`}
							price={item.price}
							thumbnail={item.image}
						/>
					</div>
				) : (
					!type && item.type !== "bun" && (
						<div
							key={item._id + index}
							className={`${style.BurgerConstructorItem} ${style.BurgerConstructorItemContainer}`}
						>
							<DragIcon type="primary" />
							<ConstructorElement
								isLocked={false}
								text={`${item.name}`}
								price={item.price}
								thumbnail={item.image}
							/>
						</div>
					)
				)
			})}
		</>
	)
}

export default BurgerConstructorItem

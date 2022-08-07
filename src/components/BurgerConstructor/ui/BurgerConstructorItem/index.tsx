// Imporrt Components
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components"

// Import Style
import style from "./BurgerConstructorItem.module.css"

const BurgerConstructorItem = ({data,type}:any) => {
	return (
		<>
			{data.map((item:any, index:any) => {
				return item?.type === "bun" && type && index === 0 ? (
					<div key={item._id + index} className={`ml-8 mr-4 ${item?.type === "bun" && type === "top" ? "mb-4" : "mt-4"} ${style.BurgerConstructorItem} `}>
						<ConstructorElement
							type={type}
							isLocked={true}
							text={`${item?.name} ${item?.type === "bun" && type === "top" ? "(верх)" : "(низ)"}`}
							price={item?.price}
							thumbnail={item?.image}
						/>
					</div>
				) : (
					!type && (
						<div key={item._id + index} className={`${style.BurgerConstructorItem} ${style.BurgerConstructorItemContainer}`}>
							<DragIcon type="primary" />
							<ConstructorElement
								isLocked={true}
								text={`${item?.name}`}
								price={item?.price}
								thumbnail={item?.image}
							/>
						</div>
					)
				)
			})}
		</>
	)
}

export default BurgerConstructorItem
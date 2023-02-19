// Import Library
import classNames from "classnames"

// Import Framework
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Components

// Import Store

// Import Style
import styles from "./Order.module.css"
import { Link } from "react-router-dom"
// Import Hooks

// Import Types
import type { FC } from "react"
import { DataType, OrderType } from "utils/types/dataType"
import { ImageIngredient } from "components/ImageIngredient/ImageIngredient"
import { Price } from "components/Price/Price"

type Props = {
	order: OrderType
}

export const Order: FC<Props> = ({ order }) => {
	if (!order) {
		return null
	}

	const totalPrice = order?.ingredients?.reduce((acc, item) => {
		const dataTypeItem = item as DataType
		if (dataTypeItem.type === "bun") {
			return acc + dataTypeItem.price * 2
		} else {
			return acc + dataTypeItem.price
		}
	}, 0)

	const IngredientList = order?.ingredients?.slice(0, 5) as DataType[]
	const IngredientCount = order?.ingredients ? (order.ingredients.length >= 5 ? order.ingredients.length - 5 : 0) : 0

	return (
		<Link to={`/feed/${order._id}`} className={classNames(styles.order, "p-6")}>
			<div className={styles.orderHeader}>
				<div className="text text_type_digits-default">#{order.number}</div>

				<div className={styles.orderHeaderTime}>
					<FormattedDate date={new Date(order.updatedAt)} />
				</div>
			</div>

			<div className={styles.orderBody}>
				<p className="text text_type_main-medium">{order.name}</p>
			</div>

			<div className={styles.orderFooter}>
				<div className={classNames(styles.orderFooterComponents, "pr-6")}>
					{IngredientList?.map((item) => {
						return <ImageIngredient key={item._id} item={item} />
					})}

					{IngredientCount > 0 && order?.ingredients?.[6] && (
						<ImageIngredient
							key={(order.ingredients[6] as DataType)._id}
							item={order.ingredients[6] as DataType}
							num={IngredientCount}
						/>
					)}
				</div>
				<div className={styles.orderFooterAmount}>
					<p className="text text_type_digits-default">
						<Price>{totalPrice}</Price>
					</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</Link>
	)
}

// Import Assets

// Import Library
import classNames from "classnames"
import { Link, useLocation } from "react-router-dom"

// Import Framework
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Components
import { ImageIngredient } from "components/ImageIngredient/ImageIngredient"
import { Price } from "components/Price/Price"

// Import Pages

// Import Store
import { useAppDispatch } from "utils/hooks/useAppStore"
import { openModal } from "services/modal/modalSlice"

// Import Style
import styles from "./Order.module.css"

// Import Hooks

// Import Utils

// Import Types
import type { FC } from "react"
import { DataType, OrderType } from "utils/types/dataType"
type Props = {
	order: OrderType
	all?: boolean
}

export const Order: FC<Props> = ({ order, all }) => {
	const location = useLocation()
	const dispatch = useAppDispatch()

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

	let statusText
	switch (order?.status) {
		case "done":
			statusText = (
				<span className={classNames("text", "text_type_main-default", "text_color_inactive")}>Выполнен</span>
			)
			break
		case "pending":
			statusText = <span className={classNames("text", "text_type_main-default")}>Готовится</span>
			break
		case "created":
			statusText = <span className={classNames("text", "text_type_main-default")}>Создан</span>
			break
		default:
			statusText = <span className={classNames("text", "text_type_main-default")}>Статус неизвестен</span>
	}

	const link = all ? `/profile/orders/${order._id}` : `/feed/${order._id}`

	// Begin - Modal
	const handleShow = (name: string) => {
		dispatch(openModal(name))
	}
	// End - Modal

	return (
		<Link
			to={link}
			state={{ background: location }}
			className={classNames(styles.order, "p-6")}
			onClick={() => handleShow(all ? "profileOrder" : "feed")}
		>
			<div className={styles.orderHeader}>
				<div className="text text_type_digits-default">#{order.number}</div>

				<div className={styles.orderHeaderTime}>
					<FormattedDate date={new Date(order.updatedAt)} />
				</div>
			</div>

			<div className={styles.orderBody}>
				<p className="text text_type_main-medium">{order.name}</p>
				{all && <div className={classNames(styles.orderStatus, "mt-2")}>{statusText}</div>}
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

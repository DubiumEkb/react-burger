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
import { OrderType } from "utils/types/orderType"

type Props = {
	item: OrderType
}

export const Order: FC<Props> = ({ item }) => {
	// console.debug(item)

	return (
		<Link to={`/feed/${item._id}`} className={classNames(styles.order, "p-6")}>
			<div className={styles.orderHeader}>
				<div className="text text_type_digits-default">
					#{item.number} - {item.status}
				</div>

				<div className={styles.orderHeaderTime}>
					<FormattedDate date={new Date(item.createdAt)} />
					<FormattedDate date={new Date(item.updatedAt)} />
				</div>
			</div>

			<div className={styles.orderBody}>
				<p className="text text_type_main-medium">{item.name}</p>
			</div>

			<div className={styles.orderFooter}>
				<div className={classNames(styles.orderFooterComponents, "pr-6")}></div>
				<div className={styles.orderFooterAmount}>
					<p className="text text_type_digits-default">480</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</Link>
	)
}

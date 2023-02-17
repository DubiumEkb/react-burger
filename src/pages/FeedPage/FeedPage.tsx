// Import Library
import classNames from "classnames"
import { useEffect } from "react"
// Import Framework

// Import Components
import { Order } from "components/Order/Order"
// Import Store

// Import Style
import styles from "./FeedPage.module.css"

// Import Hooks

// Import Types
import type { FC } from "react"
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { urlWS } from "utils/config"
import { OrderType } from "utils/types/orderType"

const FeedPage: FC = () => {
	const dispatch = useAppDispatch()
	const { data } = useAppSelector((state) => state.feed)

	useEffect(() => {
		dispatch({ type: "websocket/connect", payload: { url: `${urlWS}/orders/all` } })
		return () => {
			dispatch({ type: "websocket/disconnect" })
		}
	}, [dispatch])

	if (!data) {
		return null
	}

	const doneArray = data.orders.filter((item) => item.status === "done")
	const pendingArray = data.orders.filter((item) => item.status === "pending")

	return (
		<>
			<section className={classNames(styles.feedList, "pr-15")}>
				<div className="pt-10 pb-5">
					<h1 className="text text_type_main-large">Лента заказов</h1>
				</div>
				<div className={classNames(styles.feedListOrders, "pr-2")}>
					{data.orders.map((item) => {
						return <Order key={item._id} item={item} />
					})}
				</div>
			</section>
			<section className={classNames(styles.feedItem, "pt-25")}>
				<div className={styles.feedItemReady}>
					<div className={styles.feedItemReadyTitle}>
						<div className="text text_type_main-medium">Готовы:</div>
					</div>

					<div className={styles.feedItemReadyList}>
						{doneArray.slice(0, 20).map((item: OrderType) => {
							return (
								<div
									key={item._id}
									className={classNames(
										styles.feedItemReadyListItem,
										"text",
										"text_type_digits-default",
									)}
								>
									{item.number}
								</div>
							)
						})}
					</div>
				</div>

				<div className={styles.feedItemWork}>
					<div className={styles.feedItemWorkTitle}>
						<div className="text text_type_main-medium">В работе:</div>
					</div>

					<div className={styles.feedItemWorkList}>
						{pendingArray.slice(0, 20).map((item: OrderType) => {
							return (
								<div
									key={item._id}
									className={classNames(
										styles.feedItemWorkListItem,
										"text",
										"text_type_digits-default",
									)}
								>
									{item.number}
								</div>
							)
						})}
					</div>
				</div>

				<div className={classNames(styles.feedItemDoneAllTime, "mt-15")}>
					<div className="text text_type_main-medium">Выполнено за все время:</div>
					<div className="text text_type_digits-large">{data.total.toLocaleString("ru-RU")}</div>
				</div>

				<div className={classNames(styles.feedItemDoneToday, "mt-15")}>
					<div className="text text_type_main-medium">Выполнено за сегодня:</div>
					<div className="text text_type_digits-large">{data.totalToday}</div>
				</div>
			</section>
		</>
	)
}

export default FeedPage

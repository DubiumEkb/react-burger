// Import Library
import classNames from "classnames"
import { Order } from "components/Order/Order"
import { Price } from "components/Price/Price"
import { useEffect } from "react"
import { getIngredients } from "services/ingredients/ingredientsSlice"
import { urlWS } from "utils/config"
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { OrderType } from "utils/types/dataType"

import styles from "./FeedPage.module.css"

import type { FC } from "react"

export const FeedPage: FC = () => {
	const dispatch = useAppDispatch()
	const { data } = useAppSelector((state) => state.feed)
	const { items } = useAppSelector((state) => state.ingredients)

	useEffect(() => {
		dispatch({ type: "websocket/connect", payload: { url: `${urlWS}/orders/all` } })
		return () => {
			dispatch({ type: "websocket/disconnect" })
		}
	}, [dispatch])

	useEffect(() => {
		if (data?.success) {
			dispatch(getIngredients())
		}
	}, [data?.success, dispatch])

	if (!data && !items) {
		return null
	}

	const doneArray = data?.orders?.filter((item) => item.status === "done")
	const pendingArray = data?.orders?.filter((item) => item.status === "pending")

	const orderItems = data?.orders?.map((order) => {
		const ingredients = items?.filter((product) => order?.ingredients?.includes(product._id))
		return {
			...order,
			ingredients,
		} as OrderType
	})

	return (
		<>
			<section className={classNames(styles.feedList, "pr-15")}>
				<div className="pt-10 pb-5">
					<h1 className="text text_type_main-large">Лента заказов</h1>
				</div>
				<div className={classNames(styles.feedListOrders, "pr-2")}>
					{orderItems?.map((item) => {
						return <Order key={item._id} order={item} />
					})}
				</div>
			</section>
			<section className={classNames(styles.feedItem, "pt-25")}>
				<div className={styles.feedItemReady}>
					<div className={styles.feedItemReadyTitle}>
						<div className="text text_type_main-medium">Готовы:</div>
					</div>

					<div className={styles.feedItemReadyList}>
						{doneArray?.slice(0, 20).map((item: OrderType) => {
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
						{pendingArray?.slice(0, 20).map((item: OrderType) => {
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
					<div className="text text_type_digits-large shadow">
						<Price>{data?.total}</Price>
					</div>
				</div>

				<div className={classNames(styles.feedItemDoneToday, "mt-15")}>
					<div className="text text_type_main-medium">Выполнено за сегодня:</div>
					<div className="text text_type_digits-large shadow">
						<Price>{data?.totalToday}</Price>
					</div>
				</div>
			</section>
		</>
	)
}

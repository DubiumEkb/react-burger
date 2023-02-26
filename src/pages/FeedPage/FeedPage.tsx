// Import Assets

// Import Library
import { useEffect, useMemo } from "react"
import classNames from "classnames"

// Import Framework

// Import Components
import { Order } from "components/Order/Order"
import { Price } from "components/Price/Price"

// Import Pages

// Import Store
import { getIngredients } from "services/ingredients/ingredientsSlice"
// import { connectOrdersAllSocket, disconnectOrdersAllSocket } from "services/socket/socket"
import { setSocketUrl, connect, disconnect } from "services/socket/socket"

// Import Style
import styles from "./FeedPage.module.css"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"

// Import Types
import { DataType, OrderType } from "utils/types/dataType"
import type { FC } from "react"
import { urlWS } from "utils/config"
type Props = {
	items: DataType[] | null
}

export const FeedPage: FC<Props> = ({ items }) => {
	const dispatch = useAppDispatch()
	const { data } = useAppSelector((state) => state.websockets)

	useEffect(() => {
		dispatch(disconnect())
		dispatch(setSocketUrl(`${urlWS}/orders/all`))
		dispatch(connect())

		return () => {
			dispatch(disconnect())
		}
	}, [dispatch])

	useEffect(() => {
		if (data?.success) {
			dispatch(getIngredients())
		}
	}, [data?.success, dispatch])

	const doneArray = useMemo(() => data?.orders?.filter((item) => item.status === "done"), [data?.orders])
	const pendingArray = useMemo(() => data?.orders?.filter((item) => item.status === "pending"), [data?.orders])

	const orderItems = useMemo(() => {
		return data?.orders?.map((order) => {
			const ingredients = items?.filter((product) => order?.ingredients?.includes(product._id))
			return {
				...order,
				ingredients,
			} as OrderType
		})
	}, [data?.orders, items])

	if (!orderItems) {
		return null
	}

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

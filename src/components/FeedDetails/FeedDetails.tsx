// Import Assets
// Import Library
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import classNames from "classnames"
// Import Framework
import { CloseIcon, CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
// Import Components
import { Price } from "components/Price/Price"
import { Component } from "components/Component/Component"
// Import Pages

// Import Store
import { getIngredients } from "services/ingredients/ingredientsSlice"

// Import Style
import styles from "./FeedDetails.module.css"
// Import Hooks
import { getCookie } from "utils/cookie/getCookie"
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"

// Import Utils
import { urlWS } from "utils/config"

// Import Types
import type { FC } from "react"
import { DataType, OrderType } from "utils/types/dataType"
type Props = {
	items: DataType[] | null
	type: string
	modal?: boolean
	onClose?: () => void
}

export const FeedDetails: FC<Props> = ({ items, type, modal, onClose }) => {
	modal = modal ?? false
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const { data } = useAppSelector((state) => state.feed)

	useEffect(() => {
		if (type === "feed") {
			dispatch({ type: "websocket/disconnect" })
			dispatch({ type: "websocket/connect", payload: { url: `${urlWS}/orders/all` } })
			return () => {
				dispatch({ type: "websocket/disconnect" })
			}
		}

		if (type === "profile") {
			let token = getCookie("access_token")
			if (token && typeof token === "string") {
				token = token.replace("Bearer ", "")
				dispatch({
					type: "websocket/connect",
					payload: { url: `${urlWS}/orders?token=${token}` },
				})
				return () => {
					dispatch({ type: "websocket/disconnect" })
				}
			}
		}
	}, [type, dispatch])

	useEffect(() => {
		if (data?.success) {
			dispatch(getIngredients())
		}
	}, [data?.success, dispatch])

	const order = data?.orders?.find((item: OrderType) => item._id === id)

	if (!order) {
		return null
	}

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

	const counts: { [id: string]: number } = {}
	const prices: number[] = []

	const orderItems = order.ingredients.reduce<Array<DataType>>((prev, item) => {
		const ingredient = items?.find((ing) => ing._id === item)
		if (ingredient) {
			prices.push(ingredient.price)
			if (counts[ingredient._id]) {
				counts[ingredient._id]++
			} else {
				counts[ingredient._id] = 1
				prev.push(ingredient)
			}
		}
		return prev
	}, [])

	const totalPrice: number = prices.reduce((prev: number, item: number) => prev + item, 0)

	return (
		<div className={classNames(styles.detail, { [styles.detailModal]: modal })}>
			<div className={classNames(styles.detailHeader, "mb-10")}>
				<div className={classNames("text", "text_type_digits-default")}>#{order?.number}</div>
				<button className={classNames(styles.detailHeaderClose)} onClick={onClose} type="button">
					<CloseIcon type="primary" />
				</button>
			</div>

			<div className={classNames(styles.detailTitle, "text", "text_type_main-medium", "mb-3")}>{order?.name}</div>

			<div className={classNames(styles.detailStatus, "mb-15")}>{statusText}</div>

			<div className={classNames(styles.detailComponent, "text", "text_type_main-medium", "mb-6")}>Состав:</div>

			<div className={classNames(styles.detailList, { [styles.detailListPadding]: orderItems.length > 5 })}>
				{orderItems?.map((item, index) => {
					item = { ...item, count: counts[item._id] }
					return <Component key={item._id + index} item={item} />
				})}
			</div>

			<div className={classNames(styles.detailFooter, "mt-10")}>
				<div className={classNames(styles.detailFooterDate, "text_color_inactive")}>
					{order?.updatedAt && <FormattedDate date={new Date(order.updatedAt)} />}
				</div>
				<div className={classNames(styles.detailFooterPrice)}>
					<span className={classNames("text", "text_type_digits-default")}>
						<Price>{totalPrice}</Price>
					</span>

					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	)
}

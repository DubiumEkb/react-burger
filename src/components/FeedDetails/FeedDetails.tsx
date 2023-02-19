import { useEffect } from "react"
import { useParams } from "react-router-dom"
import classNames from "classnames"
import { Component } from "components/Component/Component"
import styles from "./FeedDetails.module.css"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { urlWS } from "utils/config"
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { Price } from "components/Price/Price"
import { getIngredients } from "services/ingredients/ingredientsSlice"
// Import Types
import type { FC } from "react"
import { DataType, OrderType } from "utils/types/dataType"

type Props = {
	items: DataType[] | null
	modal?: boolean
}

type TIngredient = {
	readonly _id: string
	readonly name: string
	readonly type: string
	readonly proteins: number
	readonly fat: number
	readonly carbohydrates: number
	readonly calories: number
	readonly price: number
	readonly image: string
	readonly image_mobile: string
	readonly image_large: string
	readonly __v: number
}

export const FeedDetails: FC<Props> = ({ items, modal }) => {
	modal = modal ?? false
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const { data } = useAppSelector((state) => state.feed)

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

	const order = data?.orders?.find((item: OrderType) => item._id === id)

	if (!order) {
		return null
	}

	let statusText
	switch (order?.status) {
		case "done":
			statusText = "Выполнен"
			break
		case "pending":
			statusText = "Выполняется"
			break
		case "created":
			statusText = "Создан"
			break
		default:
			statusText = "Статус неизвестен"
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
			<div className={classNames(styles.detailNumber, "text", "text_type_digits-default", "mb-10")}>
				#{order?.number}
			</div>

			<div className={classNames(styles.detailTitle, "text", "text_type_main-medium", "mb-3")}>{order?.name}</div>

			<div
				className={classNames(
					styles.detailStatus,
					"text",
					"text_type_main-default",
					"text_color_inactive",
					"mb-15",
				)}
			>
				{statusText}
			</div>

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

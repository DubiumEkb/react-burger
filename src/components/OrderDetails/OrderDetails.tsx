// Import Assets
import { ReactComponent as Success } from "assets/images/success.svg"

// Import Library
import { useEffect } from "react"

// Import Store
import { orderNumber, sendOrder } from "services/constructor/constructorSlice"

// Import Style
import style from "./OrderDetails.module.css"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"

// Import Types
import type { FC } from "react"
import classNames from "classnames"
type OrderType = {
	sum: number
}

const OrderDetails: FC<OrderType> = ({ sum }) => {
	const dispatch = useAppDispatch()

	const { status, pending, fulfilled, rejected } = useAppSelector((state) => state.constSlice)

	useEffect(() => {
		dispatch(orderNumber())
		if (status) {
			dispatch(sendOrder())
		}
	}, [dispatch, status])

	return (
		<div className={classNames(style.OrderDetails, "pt-30", "pb-30")}>
			{pending && (
				<div className={classNames(style.OrderDetailsNumber, "text", "text_type_main-medium", "pb-8")}>
					Загрузка...
				</div>
			)}

			{fulfilled && (
				<div className={classNames(style.OrderDetailsNumber, "text", "text_type_digits-large", "pb-8")}>
					{sum}
				</div>
			)}

			{rejected && (
				<div className={classNames(style.OrderDetailsNumber, "text", "text_type_main-medium pb-8")}>
					Ошибка!
				</div>
			)}

			<div className={classNames("text", "text_type_main-medium")}>идентификатор заказа</div>

			<div className={classNames(style.OrderDetailsIcon, "pt-15", "pb-15")}>
				<Success />
			</div>

			<div className={classNames("text", "text_type_main-default", "pb-2")}>Ваш заказ начали готовить</div>

			<div className={classNames(style.OrderDetailsStatus, "text", "text_type_main-default")}>
				Дождитесь готовности на орбитальной станции
			</div>
		</div>
	)
}

export default OrderDetails

// Import Assets

// Import Library
import classNames from "classnames"
import { useEffect, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"

// Import Framework

// Import Components
import { Order } from "components/Order/Order"

// Import Pages

// Import Store
import { getUser, checkToken, postLogout } from "services/user/userSlice"
import { getIngredients } from "services/ingredients/ingredientsSlice"
import { connect, disconnect, setSocketUrl } from "services/socket/socket"

// Import Style
import styles from "./OrdersPage.module.css"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"

import { urlWS } from "utils/config"

// Import Types
import type { FC } from "react"
import { DataType, OrderType } from "utils/types/dataType"
type Props = {
	items: DataType[] | null
}

export const OrdersPage: FC<Props> = ({ items }) => {
	const { pathname } = useLocation()
	const dispatch = useAppDispatch()

	const { data } = useAppSelector((state) => state.websockets)

	useEffect(() => {
		if (getCookie("access_token") && getCookie("refresh_token")) {
			dispatch(checkToken(getCookie("access_token")))
			dispatch(getUser())
		}
	}, [dispatch])

	useEffect(() => {
		dispatch(disconnect())
		if (getCookie("access_token") && getCookie("refresh_token")) {
			let token = getCookie("access_token")
			if (token) {
				token = token.replace("Bearer ", "")
				dispatch(setSocketUrl(`${urlWS}/orders?token=${token}`))
				dispatch(connect())

				return () => {
					dispatch(disconnect())
				}
			}
		}
	}, [dispatch])

	useEffect(() => {
		if (data?.success) {
			dispatch(getIngredients())
		}
	}, [data?.success, dispatch])

	const handlerLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(checkToken(getCookie("refresh_token")))
		dispatch(postLogout())
	}

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
		<div className={styles.order}>
			<div className={classNames(styles.orderLeft, "mr-15")}>
				<nav className={classNames(styles.nav, "mb-20")}>
					<Link
						to="/profile"
						className={classNames(styles.navLink, "text_type_main-medium", {
							[styles.navLinkActive]: pathname === "/profile",
						})}
					>
						Профиль
					</Link>

					<Link
						to="/profile/orders"
						className={classNames(styles.navLink, "text_type_main-medium", {
							[styles.navLinkActive]: pathname === "/profile/orders",
						})}
					>
						История заказов
					</Link>

					<button className={classNames(styles.navLink, "text_type_main-medium")} onClick={handlerLogout}>
						Выход
					</button>
				</nav>

				<p className="text text_type_main-default text_color_inactive">
					В этом разделе вы можете
					<br /> просмотреть свою историю заказов
				</p>
			</div>

			<div className={styles.orderRight}>
				{orderItems?.map((item) => {
					return <Order key={item._id} order={item} all />
				})}
			</div>
		</div>
	)
}

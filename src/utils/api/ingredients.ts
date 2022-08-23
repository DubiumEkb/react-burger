// Import Config
import { urlAPI } from "utils/config"
import { dataType } from "utils/dataType"

export function fetchDataIngredients() {
	return fetch(`${urlAPI}/ingredients`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка ${response.status}`)
			}
			return response.json()
		})
		.then((result) => {
			if (result.success) {
				return result.data
			}
		})
		.catch((error) => {
			console.error(error)
		})
}

export function fetchDataOrders(orders: dataType[]) {
	const idOrders = orders.map((order) => {
		return order._id
	})

	// if (!idOrders) return

	return fetch(`${urlAPI}/orders`, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ingredients: idOrders }),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка ${response.status}`)
			}
			return response.json()
		})
		.then((result) => {
			if (result.success) {
				return result.order.number
			}
		})
		.catch((error) => {
			console.error(error)
		})
}

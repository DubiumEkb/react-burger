// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

// Import Config
import { urlAPI } from "utils/config"

// Import Types
import { dataType } from "utils/types/dataType"

type InitialState = {
	mainList: dataType[]
	bunItem: dataType | null
	totalPrice: number
	orderCode: number
	list: dataType[]
	status: boolean
}

const initialState: InitialState = {
	mainList: [],
	bunItem: null,
	totalPrice: 0,
	orderCode: 0,
	list: [],
	status: false,
}

export const sendOrder = createAsyncThunk("constructor/orderCode", async (_: void, { getState }: any) => {
	const response = await fetch(`${urlAPI}/orders`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			ingredients: getState().constSlice.list,
		}),
	})

	return response.json()
})

export const constructorSlice = createSlice({
	name: "constSlice",
	initialState,
	reducers: {
		addBunItem: (state, { payload }) => {
			if (state.bunItem === null) {
				state.bunItem = payload
				state.totalPrice = state.totalPrice + payload.price * 2
			} else if (state.bunItem._id !== payload._id) {
				state.totalPrice = state.totalPrice - state.bunItem.price * 2
				state.bunItem = payload
				state.totalPrice = state.totalPrice + payload.price * 2
			}
		},
		order: (state) => {
			if (state.mainList.length > 0) {
				state.list.push(...state.mainList)
			}

			if (state.bunItem) {
				state.list.push(state.bunItem, state.bunItem)
			}

			state.list?.map((item: dataType) => item._id)

			state.status = true
		},
		addMainList: (state, { payload }) => {
			state.mainList.push({ sortingId: uuidv4(), ...payload })
			state.totalPrice = state.totalPrice + payload.price
		},
		newMainList: (state, { payload }) => {
			state.mainList = payload
		},
		deleteItem: (state, { payload }) => {
			state.mainList = state.mainList.filter((item) => item.sortingId !== payload.sortingId)
			if (state.totalPrice !== 0) {
				state.totalPrice = state.totalPrice - payload.price
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(sendOrder.pending, () => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(sendOrder.fulfilled, (state, { payload }) => {
				// Положительный запрос
				state.mainList = []
				state.bunItem = null
				state.totalPrice = 0
				state.orderCode = payload?.order.number
				state.list = []
			})
			.addCase(sendOrder.rejected, () => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export const { addBunItem, addMainList, newMainList, deleteItem, order } = constructorSlice.actions

export default constructorSlice.reducer

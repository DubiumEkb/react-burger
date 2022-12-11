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
	pending: boolean
	fulfilled: boolean
	rejected: boolean
}

const initialState: InitialState = {
	mainList: [],
	bunItem: null,
	totalPrice: 0,
	orderCode: 0,
	list: [],
	status: false,
	pending: false,
	fulfilled: false,
	rejected: false,
}

export const sendOrder = createAsyncThunk("constructor/orderCode", async (_: void, { getState }: any) => {
	try {
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
	} catch (error) {
		throw new Error(`Ошибка ${error}`)
	}
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
		orderNumber: (state) => {
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
		createMainList: (state, { payload }) => {
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
			.addCase(sendOrder.pending, (state) => {
				// Отправлен запрос
				// console.log("pending")
				state.pending = true
				state.fulfilled = false
				state.rejected = false
			})
			.addCase(sendOrder.fulfilled, (state, { payload }) => {
				// Положительный запрос
				// console.dir("fulfilled")
				state.pending = false
				state.fulfilled = true
				state.rejected = false

				state.mainList = []
				state.bunItem = null
				state.totalPrice = 0
				state.orderCode = payload?.order.number
				state.list = []
			})
			.addCase(sendOrder.rejected, (state) => {
				// Ошибка запроса
				// console.error("rejected")
				state.pending = false
				state.fulfilled = false
				state.rejected = true
			})
	},
})

export const { addBunItem, addMainList, createMainList, deleteItem, orderNumber } = constructorSlice.actions

export default constructorSlice.reducer

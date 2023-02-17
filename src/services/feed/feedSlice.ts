import { createSlice } from "@reduxjs/toolkit"
import type { OrderType } from "utils/types/orderType"

type Data = {
	success: boolean
	orders: OrderType[]
	total: number
	totalToday: number
}

type InitialState = {
	connect: boolean
	data: Data | null
}

const initialState: InitialState = {
	connect: false,
	data: null,
}

export const feedSlice = createSlice({
	name: "feed",
	initialState,
	reducers: {
		setConnect: (state, { payload }) => {
			state.connect = payload
		},
		setData: (state, { payload }) => {
			state.data = payload
		},
	},
})

export const { setConnect, setData } = feedSlice.actions
export default feedSlice.reducer

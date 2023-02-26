import { createSlice } from "@reduxjs/toolkit"
import { RootState, store } from "services"
import { OrderType } from "utils/types/dataType"

type Data = {
	success: boolean
	orders: OrderType[]
	total: number
	totalToday: number
}

interface WebSocketState {
	socketUrl?: string
	isConnected: boolean
	data: Data | null
}

const initialState: WebSocketState = {
	socketUrl: undefined,
	isConnected: false,
	data: null,
}

export const connect = () => {
	return (dispatch: typeof store.dispatch, getState: () => RootState) => {
		const { socketUrl } = getState().websockets
		if (!socketUrl) {
			console.log("Не указан URL WS")
			return
		}

		const socket = new WebSocket(socketUrl)

		socket.onopen = () => {
			// console.log("WebSocket connected")
			dispatch(setIsConnected(true))
		}

		socket.onclose = () => {
			// console.log("WebSocket disconnected")
			dispatch(setSocketUrl(undefined))
			dispatch(setMessage(null))
			dispatch(setIsConnected(false))
		}

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data)
			dispatch(setMessage(data))
		}

		dispatch(setSocketUrl(socketUrl))
	}
}

export const disconnect = () => {
	return (dispatch: typeof store.dispatch, getState: () => RootState) => {
		const { isConnected } = getState().websockets
		if (isConnected) {
			const socketUrl = getState().websockets.socketUrl
			if (socketUrl) {
				const socket = new WebSocket(socketUrl)
				socket.close()
				dispatch(setSocketUrl(undefined))
				dispatch(setMessage(null))
				dispatch(setIsConnected(false))
			}
		}
	}
}

const websocketSlice = createSlice({
	name: "websockets",
	initialState,
	reducers: {
		setSocketUrl: (state, { payload }) => {
			state.socketUrl = payload
		},
		setIsConnected: (state, { payload }) => {
			state.isConnected = payload
		},
		setMessage: (state, { payload }) => {
			state.data = payload
		},
	},
})

export const { setSocketUrl, setIsConnected, setMessage } = websocketSlice.actions

export default websocketSlice.reducer

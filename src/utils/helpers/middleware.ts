import { ThunkMiddleware } from "@reduxjs/toolkit"
import { setConnect, setData } from "services/feed/feedSlice"
import { Store } from "redux"

type WebSocketAction = {
	type: string
	payload: {
		url: string
	}
}

export const websocketMiddleware: ThunkMiddleware<{}, WebSocketAction, Store> = ({ dispatch }) => {
	let ws: WebSocket | null = null

	const onOpen = () => {
		console.debug("WebSocket Connected")
		dispatch(setConnect(true))
	}

	const onError = (event: Event) => {
		console.debug("WebSocket Error:", event)
		dispatch(setConnect(false))
	}

	const onClose = (event: CloseEvent) => {
		console.debug("WebSocket Disconnected:", event.code)
		dispatch(setConnect(false))
	}

	const onMessage = (event: MessageEvent) => {
		const data = JSON.parse(event.data)
		console.debug("WebSocket Data:", data)
		dispatch(setData(data))
	}

	return (next) => (action: WebSocketAction) => {
		if (action.type === "websocket/connect") {
			ws = new WebSocket(action.payload.url)
			ws.addEventListener("open", onOpen)
			ws.addEventListener("error", onError)
			ws.addEventListener("close", onClose)
			ws.addEventListener("message", onMessage)
		} else if (action.type === "websocket/disconnect") {
			ws?.close()
		}

		return next(action)
	}
}

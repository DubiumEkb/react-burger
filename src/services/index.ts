// Import Library
import { Action } from "redux"
import { configureStore, ThunkAction } from "@reduxjs/toolkit"

// Import Slices
import ingredientsSlice from "./ingredients/ingredientsSlice"
import constructorSlice from "./constructor/constructorSlice"
import modalSlice from "./modal/modalSlice"
import userSlice from "./user/userSlice"
import websocketsSlice from "./socket/socket"

// Import Helpers
// import { websocketMiddleware } from "utils/helpers/middleware"

export const store = configureStore({
	reducer: {
		// Записываем сюда все reducers/slices
		ingredients: ingredientsSlice,
		constSlice: constructorSlice,
		modalSlice: modalSlice,
		user: userSlice,
		websockets: websocketsSlice,
	},
})

// Нужен для Hook useAppSelector
export type RootState = ReturnType<typeof store.getState>
// Нужен для Hook useAppDispatch
export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

// Import Library
import { configureStore } from "@reduxjs/toolkit"

// Import Slices
import ingredientsSlice from "./ingredients/ingredientsSlice"
import constructorSlice from "./constructor/constructorSlice"
import modalSlice from "./modal/modalSlice"
import userSlice from "./user/userSlice"
import feedSlice from "./feed/feedSlice"

// Import Helpers
import { websocketMiddleware } from "utils/helpers/middleware"

export const store = configureStore({
	reducer: {
		// Записываем сюда все reducers/slices
		ingredients: ingredientsSlice,
		constSlice: constructorSlice,
		modalSlice: modalSlice,
		user: userSlice,
		feed: feedSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(websocketMiddleware),
})

// Нужен для Hook useAppSelector
export type RootState = ReturnType<typeof store.getState>
// Нужен для Hook useAppDispatch
export type AppDispatch = typeof store.dispatch

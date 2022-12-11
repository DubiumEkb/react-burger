// Import Library
import { configureStore } from "@reduxjs/toolkit"

// Import Slices
import ingredientsSlice from "./ingredients/ingredientsSlice"
import constructorSlice from "./constructor/constructorSlice"
import modalSlice from "./modal/modalSlice"

export const store = configureStore({
	reducer: {
		// Записываем сюда все reducers/slices
		ingredients: ingredientsSlice,
		constSlice: constructorSlice,
		modalSlice: modalSlice,
	},
})

// Типы для корретной работы hook'ов

// Нужен для Hook useAppSelector
export type RootState = ReturnType<typeof store.getState>
// Нужен для Hook useAppDispatch
export type AppDispatch = typeof store.dispatch

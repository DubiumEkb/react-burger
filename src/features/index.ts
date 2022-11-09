// Import Library
import { configureStore } from "@reduxjs/toolkit"

// Import Slices
import ingredientsSlice from "./ingredients/ingredientsSlice"
import ingredientModalSlice from "./ingredients/ingredientModalSlice"
import constructorSlice from "./constructor/constructorSlice"
import constructorModalSlice from "./constructor/constructorModalSlice"

export const store = configureStore({
	reducer: {
		// Записываем сюда все reducers/slices
		ingredients: ingredientsSlice,
		ingredientModal: ingredientModalSlice,
		constSlice: constructorSlice,
		constructorSliceModal: constructorModalSlice,
	},
})

// Типы для корретной работы hook'ов

// Нужен для Hook useAppSelector
export type RootState = ReturnType<typeof store.getState>
// Нужен для Hook useAppDispatch
export type AppDispatch = typeof store.dispatch

// Import Library
import { configureStore } from "@reduxjs/toolkit"

// Import Slices
import ingredientsSlice from "./ingredients/ingredientsSlice"
import constructorSlice from "./constructor/constructorSlice"
import modalSlice from "./modal/modalSlice"
import forgotPasswordSlice from "./forgotPassword/forgotPasswordSlice"
import resetPasswordSlice from "./resetPassword/resetPasswordSlice"
import loginSlice from "./login/loginSlice"
import registerSlice from "./register/registerSlice"
import logoutSlice from "./logout/logoutSlice"
import tokenSlice from "./token/tokenSlice"
import profileSlice from "./profile/profileSlice"

export const store = configureStore({
	reducer: {
		// Записываем сюда все reducers/slices
		ingredients: ingredientsSlice,
		constSlice: constructorSlice,
		modalSlice: modalSlice,
		forgotPassword: forgotPasswordSlice,
		resetPassword: resetPasswordSlice,
		login: loginSlice,
		register: registerSlice,
		logout: logoutSlice,
		token: tokenSlice,
		profile: profileSlice,
	},
})

// Нужен для Hook useAppSelector
export type RootState = ReturnType<typeof store.getState>
// Нужен для Hook useAppDispatch
export type AppDispatch = typeof store.dispatch

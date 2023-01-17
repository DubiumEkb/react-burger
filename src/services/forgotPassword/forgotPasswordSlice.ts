// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Helpers
import { request } from "utils/helpers/fetch"

// Import Config
import { urlAPI } from "utils/config"

type InitialState = {
	success: boolean
	email: string
}

const initialState: InitialState = {
	success: false,
	email: "",
}

export const postForgotPassword = createAsyncThunk("user/postForgotPassword", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/password-reset`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			email: getState().forgotPassword.email,
		}),
	})
})

export const forgotPasswordSlice = createSlice({
	name: "forgotPassword",
	initialState,
	reducers: {
		emailValue: (state, { payload }) => {
			state.email = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postForgotPassword.pending, () => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(postForgotPassword.fulfilled, (state, { payload }) => {
				// Положительный запрос
				state.success = payload.success
				if (payload.success) {
				}
			})
			.addCase(postForgotPassword.rejected, () => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export const { emailValue } = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer

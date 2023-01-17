// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Helpers
import { request } from "utils/helpers/fetch"

// Import Config
import { urlAPI } from "utils/config"

type InitialState = {
	success: boolean
	password: string
	token: string
}

const initialState: InitialState = {
	success: false,
	password: "",
	token: "",
}

export const postResetPassword = createAsyncThunk("user/resetPassword", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/password-reset/reset`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			password: getState().resetPassword.password,
			token: getState().resetPassword.token,
		}),
	})
})

export const resetPasswordSlice = createSlice({
	name: "resetPassword",
	initialState,
	reducers: {
		passwordValue: (state, { payload }) => {
			state.password = payload
		},
		tokenValue: (state, { payload }) => {
			state.token = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postResetPassword.pending, () => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(postResetPassword.fulfilled, (state, { payload }) => {
				// Положительный запрос
				state.success = payload.success
			})
			.addCase(postResetPassword.rejected, () => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export const { passwordValue, tokenValue } = resetPasswordSlice.actions

export default resetPasswordSlice.reducer

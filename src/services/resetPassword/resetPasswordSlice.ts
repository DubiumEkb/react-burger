// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

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
	try {
		const response = await fetch(`${urlAPI}/password-reset`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				password: getState().resetPassword.password,
				token: getState().resetPassword.token,
			}),
		})

		return response.json()
	} catch (error) {
		throw new Error(`Ошибка ${error}`)
	}
})

export const resetPasswordSlice = createSlice({
	name: "resetPassword",
	initialState,
	reducers: {
		passwordValue: (state, { payload }) => {
			state.password = payload
		},
		tokenValue: (state, { payload }) => {
			state.token = payload.replace(/\D/g, "")
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

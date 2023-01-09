// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Config
import { urlAPI } from "utils/config"

type InitialState = {
	success: boolean
	email: string
	token: string
}

const initialState: InitialState = {
	success: false,
	email: "",
	token: "",
}

export const postResetPassword = createAsyncThunk("forgotPassword", async (_: void, { getState }: any) => {
	try {
		const response = await fetch(`${urlAPI}/password-reset`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				email: getState().forgotPassword.email,
			}),
		})

		return response.json()
	} catch (error) {
		throw new Error(`Ошибка ${error}`)
	}
})

export const resetPasswordSlice = createSlice({
	name: "forgotPassword",
	initialState,
	reducers: {
		emailValue: (state, { payload }) => {
			state.email = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postResetPassword.pending, (state) => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(postResetPassword.fulfilled, (state, { payload }) => {
				// Положительный запрос
				state.success = payload.success
			})
			.addCase(postResetPassword.rejected, (state) => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export const { emailValue } = resetPasswordSlice.actions

export default resetPasswordSlice.reducer

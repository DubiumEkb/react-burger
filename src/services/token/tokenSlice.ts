// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Config
import { urlAPI } from "utils/config"

type InitialState = {
	user: {
		email: string
		password: string
	}
	success: boolean
}

const initialState: InitialState = {
	user: {
		email: "",
		password: "",
	},
	success: false,
}

export const postToken = createAsyncThunk("user/postToken", async (_: void, { getState }: any) => {
	try {
		const response = await fetch(`${urlAPI}/auth/token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				email: getState().register.user.email,
				password: getState().register.user.password,
			}),
		})

		return response.json()
	} catch (error) {
		throw new Error(`Ошибка ${error}`)
	}
})

export const tokenSlice = createSlice({
	name: "token",
	initialState,
	reducers: {
		emailValue: (state, { payload }) => {
			state.user.email = payload
		},
		passwordValue: (state, { payload }) => {
			state.user.password = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postToken.pending, (state) => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(postToken.fulfilled, (state, { payload }) => {
				// Положительный запрос
				state.success = payload.success
			})
			.addCase(postToken.rejected, (state) => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export const { emailValue, passwordValue } = tokenSlice.actions

export default tokenSlice.reducer

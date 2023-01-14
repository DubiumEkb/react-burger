// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Config
import { urlAPI } from "utils/config"

type InitialState = {
	success: boolean
}

const initialState: InitialState = {
	success: false,
}

export const postLogout = createAsyncThunk("user/postLogout", async (_: void, { getState }: any) => {
	try {
		const response = await fetch(`${urlAPI}/auth/logout`, {
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

export const logoutSlice = createSlice({
	name: "logout",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postLogout.pending, (state) => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(postLogout.fulfilled, (state, { payload }) => {
				// Положительный запрос
				state.success = payload.success
			})
			.addCase(postLogout.rejected, (state) => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export default logoutSlice.reducer

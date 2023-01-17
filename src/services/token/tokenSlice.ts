// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Helpers
import { request } from "utils/helpers/fetch"

// Import Config
import { urlAPI } from "utils/config"

import { setCookie } from "utils/cookie/setCookie"

type InitialState = {
	token: ""
	success: boolean
}

const initialState: InitialState = {
	token: "",
	success: false,
}

export const postToken = createAsyncThunk("user/postToken", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/auth/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			token: getState().token.token,
		}),
	})
})

export const tokenSlice = createSlice({
	name: "token",
	initialState,
	reducers: {
		tokenValue: (state, { payload }) => {
			state.token = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postToken.pending, () => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(postToken.fulfilled, (state, { payload }) => {
				// Положительный запрос
				state.success = payload.success
				setCookie("access_token", payload.accessToken)
				setCookie("refresh_token", payload.refreshToken)
			})
			.addCase(postToken.rejected, () => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export const { tokenValue } = tokenSlice.actions

export default tokenSlice.reducer

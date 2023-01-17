// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Helpers
import { request } from "utils/helpers/fetch"

// Import Config
import { urlAPI } from "utils/config"
import { deleteCookie } from "utils/cookie/deleteCookie"

type InitialState = {
	token: string
	success: boolean
}

const initialState: InitialState = {
	token: "",
	success: false,
}

export const postLogout = createAsyncThunk("user/postLogout", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/auth/logout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			token: getState().logout.token,
		}),
	})
})

export const logoutSlice = createSlice({
	name: "logout",
	initialState,
	reducers: {
		tokenValue: (state, { payload }) => {
			state.token = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postLogout.pending, () => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(postLogout.fulfilled, (state, { payload }) => {
				// Положительный запрос
				state.success = payload.success
				deleteCookie("access_token")
				deleteCookie("refresh_token")
			})
			.addCase(postLogout.rejected, () => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export const { tokenValue } = logoutSlice.actions

export default logoutSlice.reducer

// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Helpers
import { request } from "utils/helpers/fetch"

// Import Config
import { urlAPI } from "utils/config"
import { setCookie } from "utils/cookie/setCookie"

type InitialState = {
	user: {
		name: string
		email: string
		password: string
	}
	success: boolean
}

const initialState: InitialState = {
	user: {
		name: "",
		email: "",
		password: "",
	},
	success: false,
}

export const postRegister = createAsyncThunk("user/postRegister", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			email: getState().register.user.email,
			password: getState().register.user.password,
			name: getState().register.user.name,
		}),
	})
})

export const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers: {
		nameValue: (state, { payload }) => {
			state.user.name = payload
		},
		emailValue: (state, { payload }) => {
			state.user.email = payload
		},
		passwordValue: (state, { payload }) => {
			state.user.password = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postRegister.pending, () => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(postRegister.fulfilled, (state, { payload }) => {
				// Положительный запрос
				state.success = payload.success

				setCookie("access_token", payload.accessToken)
				setCookie("refresh_token", payload.refreshToken)
			})
			.addCase(postRegister.rejected, () => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export const { nameValue, emailValue, passwordValue } = registerSlice.actions

export default registerSlice.reducer

// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Config
import { urlAPI } from "utils/config"
import { setCookie } from "utils/cookie/setCookie"

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

export const postLogin = createAsyncThunk("user/postLogin", async (_: void, { getState }: any) => {
	try {
		const response = await fetch(`${urlAPI}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				email: getState().login.user.email,
				password: getState().login.user.password,
			}),
		})

		return response.json()
	} catch (error) {
		throw new Error(`Ошибка ${error}`)
	}
})

export const loginSlice = createSlice({
	name: "login",
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
			.addCase(postLogin.pending, (state) => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(postLogin.fulfilled, (state, { payload }) => {
				// Положительный запрос

				state.success = payload.success
				setCookie("access_token", payload.accessToken)
				setCookie("refresh_token", payload.refreshToken)
			})
			.addCase(postLogin.rejected, (state) => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export const { emailValue, passwordValue } = loginSlice.actions

export default loginSlice.reducer

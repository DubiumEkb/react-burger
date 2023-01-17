// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Helpers
import { request } from "utils/helpers/fetch"

// Import Config
import { urlAPI } from "utils/config"

type InitialState = {
	user: {
		email: string
		name: string
		password: string
		token: string
	}
	origin: {
		email: string
		name: string
		password: string
	}
	success: boolean
	updateToken: boolean
	status: boolean
}

const initialState: InitialState = {
	user: {
		email: "",
		name: "",
		password: "",
		token: "",
	},
	origin: {
		email: "",
		name: "",
		password: "",
	},
	success: false,
	updateToken: false,
	status: false,
}

export const getProfile = createAsyncThunk("user/profile/get", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/auth/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: getState().profile.user.token,
		},
	})
})

export const postProfile = createAsyncThunk("user/profile/patch", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/auth/user`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			authorization: getState().profile.user.token,
		},
		body: JSON.stringify({
			email: getState().profile.user.email,
			password: getState().profile.user.password,
			name: getState().profile.user.name,
		}),
	})
})

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		emailValue: (state, { payload }) => {
			state.user.email = payload
		},
		nameValue: (state, { payload }) => {
			state.user.name = payload
		},
		passwordValue: (state, { payload }) => {
			state.user.password = payload
		},
		tokenValue: (state, { payload }) => {
			state.user.token = payload
		},
		resetForm: (state) => {
			state.user.name = state.origin.name
			state.user.email = state.origin.email
			state.user.password = state.origin.password
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProfile.pending, () => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(getProfile.fulfilled, (state, { payload }) => {
				// Положительный запрос

				if (payload.message === "jwt expired") {
					state.updateToken = true
				}

				state.success = payload.success

				if (payload.success) {
					state.user.email = payload.user.email
					state.user.name = payload.user.name

					state.origin.email = payload.user.email
					state.origin.name = payload.user.name
				}

				state.status = true
			})
			.addCase(getProfile.rejected, (state) => {
				// Ошибка запроса
				// console.error("rejected")
				state.status = true
			})

		builder
			.addCase(postProfile.pending, () => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(postProfile.fulfilled, (state, { payload }) => {
				// Положительный запрос

				if (payload.message === "jwt expired") {
					state.updateToken = true
				}

				state.success = payload.success

				if (payload.success) {
					state.user.email = payload.user.email
					state.user.name = payload.user.name

					state.origin.email = payload.user.email
					state.origin.name = payload.user.name
				}

				state.status = true
			})
			.addCase(postProfile.rejected, (state) => {
				// Ошибка запроса
				// console.error("rejected")
				state.status = true
			})
	},
})

export const { emailValue, nameValue, passwordValue, tokenValue, resetForm } = profileSlice.actions

export default profileSlice.reducer

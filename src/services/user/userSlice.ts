// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Helpers
import { request } from "utils/helpers/fetch"

// Import Config
import { urlAPI } from "utils/config"
import { setCookie } from "utils/cookie/setCookie"
import { deleteCookie } from "utils/cookie/deleteCookie"

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
	success: {
		user: boolean
		status: boolean
		updateToken: boolean
		forgot: false
	}
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
	success: {
		user: false,
		status: false,
		updateToken: false,
		forgot: false,
	},
}

export const getUser = createAsyncThunk("user/profile/get", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/auth/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: getState().user.user.token,
		},
	})
})

export const patchUser = createAsyncThunk("user/profile/patch", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/auth/user`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			authorization: getState().user.user.token,
		},
		body: JSON.stringify({
			email: getState().user.user.email,
			password: getState().user.user.password,
			name: getState().user.user.name,
		}),
	})
})

export const postToken = createAsyncThunk("user/postToken", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/auth/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			token: getState().user.user.token,
		}),
	})
})

export const postForgotPassword = createAsyncThunk("user/forgotPassword", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/password-reset`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			email: getState().user.user.email,
		}),
	})
})

export const postResetPassword = createAsyncThunk("user/resetPassword", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/password-reset/reset`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			password: getState().user.user.password,
			token: getState().user.user.token,
		}),
	})
})

export const postRegister = createAsyncThunk("user/register", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			email: getState().user.user.email,
			password: getState().user.user.password,
			name: getState().user.user.name,
		}),
	})
})

export const postLogin = createAsyncThunk("user/login", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			email: getState().user.user.email,
			password: getState().user.user.password,
		}),
	})
})

export const postLogout = createAsyncThunk("user/logout", async (_: void, { getState }: any) => {
	return await request(`${urlAPI}/auth/logout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			token: getState().user.user.token,
		}),
	})
})

// Begin - Slice
export const userSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		changeEmail: (state, { payload }) => {
			state.user.email = payload
		},
		changeName: (state, { payload }) => {
			state.user.name = payload
		},
		changePassword: (state, { payload }) => {
			state.user.password = payload
		},
		checkToken: (state, { payload }) => {
			state.user.token = payload
		},
		resetForm: (state) => {
			state.user.name = state.origin.name
			state.user.email = state.origin.email
			state.user.password = state.origin.password
		},
	},
	extraReducers: (builder) => {
		// Begin - getUser
		builder
			.addCase(getUser.pending, (state) => {
				// Отправлен запрос
				state.success.status = false
			})
			.addCase(getUser.fulfilled, (state, { payload }) => {
				// Положительный запрос

				if (payload.message === "jwt expired") {
					state.success.updateToken = true
				}

				if (payload.success) {
					state.user.email = payload.user.email
					state.user.name = payload.user.name

					state.origin.email = payload.user.email
					state.origin.name = payload.user.name
				}

				state.success.status = true
				state.success.user = payload.success
			})
			.addCase(getUser.rejected, (state) => {
				// Ошибка запроса
				state.success.status = false
			})
		// End - getUser
		// Begin - patchUser
		builder
			.addCase(patchUser.pending, (state) => {
				// Отправлен запрос
				state.success.status = false
			})
			.addCase(patchUser.fulfilled, (state, { payload }) => {
				// Положительный запрос

				if (payload.message === "jwt expired") {
					state.success.updateToken = true
				}

				if (payload.success) {
					state.user.email = payload.user.email
					state.user.name = payload.user.name

					state.origin.email = payload.user.email
					state.origin.name = payload.user.name
				}

				state.success.status = true
				state.success.user = payload.success
			})
			.addCase(patchUser.rejected, (state) => {
				// Ошибка запроса
				state.success.status = false
			})
		// End - patchUser
		// Begin - postToken
		builder
			.addCase(postToken.pending, (state) => {
				// Отправлен запрос
				state.success.status = false
			})
			.addCase(postToken.fulfilled, (state, { payload }) => {
				// Положительный запрос

				setCookie("access_token", payload.accessToken)
				setCookie("refresh_token", payload.refreshToken)
				state.success.status = true
				state.success.user = payload.success
			})
			.addCase(postToken.rejected, (state) => {
				// Ошибка запроса
				state.success.status = false
			})
		// End - postToken
		// Begin - postForgotPassword
		builder
			.addCase(postForgotPassword.pending, (state) => {
				// Отправлен запрос
				state.success.status = false
			})
			.addCase(postForgotPassword.fulfilled, (state, { payload }) => {
				// Положительный запрос

				state.user.email = ""

				state.success.status = true
				state.success.forgot = payload.success
			})
			.addCase(postForgotPassword.rejected, (state) => {
				// Ошибка запроса
				state.success.status = false
			})
		// End - postForgotPassword
		// Begin - postResetPassword
		builder
			.addCase(postResetPassword.pending, (state) => {
				// Отправлен запрос
				state.success.status = false
			})
			.addCase(postResetPassword.fulfilled, (state, { payload }) => {
				// Положительный запрос
				state.user.password = ""
				state.user.token = ""

				state.success.status = true
				state.success.user = payload.success
			})
			.addCase(postResetPassword.rejected, (state) => {
				// Ошибка запроса
				state.success.status = false
			})
		// End - postResetPassword
		// Begin - postRegister
		builder
			.addCase(postRegister.pending, (state) => {
				// Отправлен запрос
				state.success.status = false
			})
			.addCase(postRegister.fulfilled, (state, { payload }) => {
				// Положительный запрос

				if (payload.success) {
					state.user.name = payload.user.name
					state.user.email = payload.user.email
					state.user.password = ""

					setCookie("access_token", payload.accessToken)
					setCookie("refresh_token", payload.refreshToken)
				} else {
					state.user.name = ""
					state.user.email = ""
					state.user.password = ""
				}

				state.success.status = true
				state.success.user = payload.success
			})
			.addCase(postRegister.rejected, (state) => {
				// Ошибка запроса
				state.success.status = false
			})
		// End - postRegister
		// Begin - postLogin
		builder
			.addCase(postLogin.pending, (state) => {
				// Отправлен запрос
				state.success.status = false
			})
			.addCase(postLogin.fulfilled, (state, { payload }) => {
				// Положительный запрос

				if (payload.success) {
					state.user.name = payload.user.name
					state.user.email = payload.user.email
					state.user.password = ""

					setCookie("access_token", payload.accessToken)
					setCookie("refresh_token", payload.refreshToken)
				} else {
					state.user.name = ""
					state.user.email = ""
					state.user.password = ""
				}

				state.success.status = true
				state.success.user = payload.success
			})
			.addCase(postLogin.rejected, (state) => {
				// Ошибка запроса
				state.success.status = false
			})
		// End - postLogin
		// Begin - postLogout
		builder
			.addCase(postLogout.pending, (state) => {
				// Отправлен запрос
				state.success.status = false
			})
			.addCase(postLogout.fulfilled, (state) => {
				// Положительный запрос

				deleteCookie("access_token")
				deleteCookie("refresh_token")

				state.success.status = true
				state.success.user = false
			})
			.addCase(postLogout.rejected, (state) => {
				// Ошибка запроса
				state.success.status = false
			})
		// End - postLogout
	},
})
// End - Slice

export const { changeEmail, changeName, changePassword, checkToken, resetForm } = userSlice.actions

export default userSlice.reducer

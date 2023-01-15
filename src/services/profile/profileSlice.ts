// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Config
import { urlAPI } from "utils/config"

type InitialState = {
	user: {
		email: string
		name: string
		password: string
		token: string
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
	success: false,
	updateToken: false,
	status: false,
}

export const getProfile = createAsyncThunk("user/profile", async (_: void, { getState }: any) => {
	const response = await fetch(`${urlAPI}/auth/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: getState().profile.user.token,
		},
	})

	return await response.json()
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
				}

				state.status = true
			})
			.addCase(getProfile.rejected, (state) => {
				// Ошибка запроса
				// console.error("rejected")
				state.status = true
			})
	},
})

export const { emailValue, nameValue, passwordValue, tokenValue } = profileSlice.actions

export default profileSlice.reducer

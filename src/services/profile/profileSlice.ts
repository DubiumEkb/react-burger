// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Config
import { urlAPI } from "utils/config"

type InitialState = {
	token: string
	user: {
		email: string
		name: string
	}
	success: boolean
}

const initialState: InitialState = {
	token: "",
	user: {
		email: "",
		name: "",
	},
	success: false,
}

export const getProfile = createAsyncThunk("user/profile", async (_: void, { getState }: any) => {
	try {
		const response = await fetch(`${urlAPI}/auth/user`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: getState().profile.token,
			},
		})

		return response.json()
	} catch (error) {
		throw new Error(`Ошибка ${error}`)
	}
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
		token: (state, { payload }) => {
			state.token = payload
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
				state.success = payload.success
			})
			.addCase(getProfile.rejected, () => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export const { emailValue, nameValue, token } = profileSlice.actions

export default profileSlice.reducer

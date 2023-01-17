// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Config
import { urlAPI } from "utils/config"

// Import Types
import { DataType } from "utils/types/dataType"

type InitialState = {
	items: DataType[] | null
	pending: boolean
	fulfilled: boolean
	rejected: boolean
}

const initialState: InitialState = {
	items: null,
	pending: false,
	fulfilled: false,
	rejected: false,
}

export const getIngredients = createAsyncThunk("ingredients/getIngredients", async () => {
	const response = await fetch(`${urlAPI}/ingredients`)
	return await response.json()
})

export const ingredientsSlice = createSlice({
	name: "ingredients",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getIngredients.pending, (state) => {
				// Отправлен запрос
				// console.log("pending")
				state.pending = true
				state.fulfilled = false
				state.rejected = false
			})
			.addCase(getIngredients.fulfilled, (state, { payload }) => {
				// Положительный запрос
				// console.dir("fulfilled")
				state.pending = false
				state.fulfilled = true
				state.rejected = false
				state.items = payload.data
			})
			.addCase(getIngredients.rejected, (state) => {
				// Ошибка запроса
				// console.error("rejected")
				state.pending = false
				state.fulfilled = false
				state.rejected = true
			})
	},
})

export default ingredientsSlice.reducer

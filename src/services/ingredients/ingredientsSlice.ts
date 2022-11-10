// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Config
import { urlAPI } from "utils/config"

// Import Types
import { dataType } from "utils/types/dataType"

type InitialState = {
	items: dataType[]
	pending: boolean
	fulfilled: boolean
	rejected: boolean
}

const initialState: InitialState = {
	items: [],
	pending: false,
	fulfilled: false,
	rejected: false,
}

export const getIngredients = createAsyncThunk("ingredients/getIngredients", async () => {
	try {
		const res = await fetch(`${urlAPI}/ingredients`).then((data) => data.json())
		return res
	} catch (error) {
		throw new Error(`Ошибка ${error}`)
	}
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

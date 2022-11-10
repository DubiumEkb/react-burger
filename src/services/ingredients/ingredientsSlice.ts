// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Config
import { urlAPI } from "utils/config"

// Import Types
import { dataType } from "utils/types/dataType"

type InitialState = {
	items: dataType[]
}

const initialState: InitialState = {
	items: [],
}

export const getIngredients = createAsyncThunk(
	"ingredients/getIngredients",
	async () => {
		const res = await fetch(`${urlAPI}/ingredients`).then((data) =>
			data.json(),
		)
		return res
	},
)

export const ingredientsSlice = createSlice({
	name: "ingredients",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getIngredients.pending, () => {
				// Отправлен запрос
				// console.log("pending")
			})
			.addCase(getIngredients.fulfilled, (state, { payload }) => {
				// Положительный запрос
				state.items = payload.data
			})
			.addCase(getIngredients.rejected, () => {
				// Ошибка запроса
				// console.error("rejected")
			})
	},
})

export default ingredientsSlice.reducer

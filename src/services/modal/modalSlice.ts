// Import Library
import { createSlice } from "@reduxjs/toolkit"

// Import Types

type InitialState = {
	show: {
		order: boolean
		ingredient: boolean
	}
	type: string
}

const initialState: InitialState = {
	show: {
		order: false,
		ingredient: false,
	},
	type: "",
}

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, { payload }) => {
			if (payload === "order") {
				state.show.order = true
			}

			if (payload === "ingredient") {
				state.show.ingredient = true
			}
		},
		closeModal: (state, { payload }) => {
			if (payload === "order") {
				state.show.order = false
			}

			if (payload === "ingredient") {
				state.show.ingredient = false
			}
		},
	},
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer

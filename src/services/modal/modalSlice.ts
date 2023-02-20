// Import Library
import { createSlice } from "@reduxjs/toolkit"

// Import Types
type InitialState = {
	show: {
		order: boolean
		ingredient: boolean
		feed: boolean
		profileOrder: boolean
	}
	type: string
}

const initialState: InitialState = {
	show: {
		order: false,
		ingredient: false,
		feed: false,
		profileOrder: false,
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

			if (payload === "feed") {
				state.show.feed = true
			}

			if (payload === "profileOrder") {
				state.show.profileOrder = true
			}
		},
		closeModal: (state, { payload }) => {
			if (payload === "order") {
				state.show.order = false
			}

			if (payload === "ingredient") {
				state.show.ingredient = false
			}

			if (payload === "feed") {
				state.show.feed = false
			}

			if (payload === "profileOrder") {
				state.show.profileOrder = false
			}
		},
	},
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer

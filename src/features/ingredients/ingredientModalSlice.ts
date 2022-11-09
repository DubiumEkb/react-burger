// Import Library
import { createSlice } from "@reduxjs/toolkit"

// Import Types
import { dataType } from "utils/types/dataType"

type InitialState = {
	show: boolean
	itemModal: dataType | null
}

const initialState: InitialState = {
	show: false,
	itemModal: null,
}

export const ingredientModalSlice = createSlice({
	name: "ingredientModal",
	initialState,
	reducers: {
		toggleModal: (state, { payload }) => {
			const { show, itemModal } = payload
			state.show = show
			state.itemModal = itemModal
		},
		closeModal: (state, { payload }) => {
			state.show = payload
		},
	},
})

export const { toggleModal, closeModal } = ingredientModalSlice.actions

export default ingredientModalSlice.reducer

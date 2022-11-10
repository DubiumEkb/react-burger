// Import Library
import { createSlice } from "@reduxjs/toolkit"

// Import Types
import { dataType } from "utils/types/dataType"

type InitialState = {
	show: boolean
	type: string
	ingredient: dataType | null
}

const initialState: InitialState = {
	show: false,
	type: "",
	ingredient: null,
}

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, { payload }) => {
			state.show = true
			state.ingredient = payload
		},
		closeModal: (state) => {
			state.show = false
		},
	}
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
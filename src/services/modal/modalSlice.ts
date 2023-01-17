// Import Library
import { createSlice } from "@reduxjs/toolkit"

// Import Types
import { dataType } from "utils/types/dataType"

type InitialState = {
	show: boolean
	type: string
}

const initialState: InitialState = {
	show: false,
	type: "",
}

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state) => {
			state.show = true
		},
		closeModal: (state) => {
			state.show = false
		},
	},
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer

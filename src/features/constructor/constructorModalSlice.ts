// Import Library
import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
	show: boolean
}

const initialState: InitialState = {
	show: false,
}

export const constructorModalSlice = createSlice({
	name: "constructorModal",
	initialState,
	reducers: {
		toggleModal: (state, { payload }) => {
			state.show = payload
		},
		closeModal: (state, { payload }) => {
			state.show = payload
		},
	},
})

export const { toggleModal, closeModal } = constructorModalSlice.actions

export default constructorModalSlice.reducer

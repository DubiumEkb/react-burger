// Import Library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Import Config
import { urlAPI } from "utils/config"

type InitialState = {
	success: boolean
}

const initialState: InitialState = {
	success: false,
}

export const forgotPasswordSlice = createSlice({
	name: "forgotPassword",
	initialState,
	reducers: {},
})

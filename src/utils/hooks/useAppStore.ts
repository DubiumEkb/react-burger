import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "features"

export const useAppDispatch = () => useDispatch<AppDispatch>() // Типизирование useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // Типизирование useSelector

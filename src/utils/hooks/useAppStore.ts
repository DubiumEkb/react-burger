import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "services"

export const useAppDispatch = () => useDispatch<AppDispatch>() // Типизирование useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // Типизирование useSelector

// Import Library
import { Navigate, Outlet } from "react-router-dom"

// Import Hooks
// import { useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"

// Import Types
import type { FC } from "react"

const ProtectedRouteAuth: FC = () => {
	// const { success } = useAppSelector((state) => state.user)

	// Если требуется авторизация, а пользователь не авторизован...
	// if (!success.user && !getCookie("access_token") && !getCookie("refresh_token")) {
	// 	return <Navigate to="/login" state={{ from: location }} />
	// }

	// Если требуется авторизация, а пользователь авторизован...
	if (getCookie("access_token") && getCookie("refresh_token")) {
		return <Navigate to="/" />
	}

	return <Outlet />
}

export default ProtectedRouteAuth

// Import Library
// import { useEffect } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

// Import Framework

// Import Components

// Import Store

// Import Style

// Import Hooks
import { useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"

const ProtectedRoutes = () => {
	const location = useLocation()

	// const from = location.state?.from

	const { success } = useAppSelector((state) => state.user)

	// Если требуется авторизация, а пользователь не авторизован...
	if (!success.user && !getCookie("access_token") && !getCookie("refresh_token")) {
		return <Navigate to="/login" state={{ from: location }} />
	}

	// Если разрешен неавторизованный доступ, а пользователь авторизован...
	// if (success.user && getCookie("access_token") && getCookie("refresh_token")) {
	// 	return <Navigate to={from} />
	// }

	return <Outlet />
}

export default ProtectedRoutes

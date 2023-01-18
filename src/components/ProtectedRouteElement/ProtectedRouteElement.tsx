import { Navigate, Outlet, useLocation } from "react-router-dom"

// Import Hooks
import { useAppSelector } from "utils/hooks/useAppStore"

const ProtectedRoutes = () => {
	const location = useLocation()
	const { status, success } = useAppSelector((state) => state.profile)
	const login = useAppSelector((state) => state.login)
	const from = location.state?.from

	console.debug(status, success, login.success)

	if (!status) {
		return null
	}

	// Если требуется авторизация, а пользователь не авторизован...
	// if (!success && !login.success) {
	// 	return <Navigate to="/login" state={{ from: location }} />
	// }

	// Если разрешен неавторизованный доступ, а пользователь авторизован...
	// if (success && login.success) {
	// 	return <Navigate to={from} />
	// }

	return <Outlet />
}

export default ProtectedRoutes

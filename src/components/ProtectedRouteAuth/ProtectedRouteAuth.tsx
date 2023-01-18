import { Navigate, Outlet, useLocation } from "react-router-dom"

// Import Hooks
import { useAppSelector } from "utils/hooks/useAppStore"

const ProtectedRouteAuth = () => {
	const location = useLocation()
	const { status, success } = useAppSelector((state) => state.profile)
	const login = useAppSelector((state) => state.login)
	const from = location.state?.from || "/"

	if (!status) {
		return null
	}
	console.debug(login.success, success)
	// if (success) {
	// 	return <Navigate to={from} />
	// }

	// return <Outlet />

	// Если разрешен неавторизованный доступ, а пользователь авторизован...
	if (login.success || success) {
		// ...то отправляем его на предыдущую страницу
		return <Navigate to={from} />
	}

	// Если требуется авторизация, а пользователь не авторизован...
	// console.debug(login.success, success)
	// if (!login.success && !success) {
	// 	// ...то отправляем его на страницу логин
	// 	return <Navigate to="/login" state={{ from: location }} />
	// }

	// Если все ок, то рендерим внутреннее содержимое
	return <Outlet />
}

export default ProtectedRouteAuth

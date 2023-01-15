import { Navigate, Outlet } from "react-router-dom"

// Import Hooks
import { useAppSelector } from "utils/hooks/useAppStore"

const useAuth = () => {
	const { status, success } = useAppSelector((state) => state.profile)

	if (status) {
		return success
	}
}

const ProtectedRoutes = () => {
	const isAuth = useAuth()
	if (!isAuth) {
		return null
	}
	return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes

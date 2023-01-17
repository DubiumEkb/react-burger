import { Navigate, Outlet } from "react-router-dom"

// Import Hooks
import { useAppSelector } from "utils/hooks/useAppStore"

const ProtectedRoutes = () => {
	const { status, success } = useAppSelector((state) => state.profile)
	const isAuth = success
	if (!status) {
		return null
	}
	// return isAuth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
	return isAuth ? <Outlet /> : <Navigate to={{ pathname: "/login" }} />
}

export default ProtectedRoutes

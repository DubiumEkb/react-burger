import { useEffect } from "react"

// Import Components
import AppHeader from "components/AppHeader"
import Modal from "components/Modal"
import { IngredientDetails } from "components/BurgerIngredients/ui"
import OrderDetails from "components/OrderDetails/OrderDetails"
import ProtectedRouteElement from "components/ProtectedRouteElement/ProtectedRouteElement"

import { Routes, Route, Navigate } from "react-router-dom"

// Import Store
import { closeModal } from "services/modal/modalSlice"
import { getProfile, tokenValue } from "services/profile/profileSlice"
import { tokenValue as tokenUpdate, postToken } from "services/token/tokenSlice"

// Import Style
import style from "./App.module.css"

// Import Pages
import HomePage from "pages/HomePage/HomePage"
import LoginPage from "pages/LoginPage/LoginPage"
import RegisterPage from "pages/RegisterPage/RegisterPage"
import ForgotPasswordPage from "pages/ForgotPasswordPage/ForgotPasswordPage"
import ResetPasswordPage from "pages/ResetPasswordPage/ResetPasswordPage"
import ProfilePage from "pages/ProfilePage/ProfilePage"
import IngredientsPage from "pages/IngredientsPage/IngredientsPage"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"

function App() {
	const dispatch = useAppDispatch()
	const { show, ingredient } = useAppSelector((state) => state.modalSlice)
	const { orderCode } = useAppSelector((state) => state.constSlice)
	const { updateToken } = useAppSelector((state) => state.profile)

	useEffect(() => {
		dispatch(tokenValue(getCookie("access_token")))
		dispatch(getProfile())
	}, [dispatch])

	useEffect(() => {
		if (updateToken) {
			dispatch(tokenUpdate(getCookie("refresh_token")))
			dispatch(postToken())
		}
	}, [dispatch, updateToken])

	// Begin - Modal
	const handleClose = () => {
		dispatch(closeModal())
	}

	let ParamsModal
	if (ingredient !== null) {
		ParamsModal = {
			title: "Детали ингредиента",
			isOpen: show,
			onClose: handleClose,
		}
	}
	// End - Modal

	return (
		<>
			<AppHeader />
			<main className={style.main}>
				<Routes>
					{/* Главная страница, конструктор бургеров. */}
					<Route path="/" element={<HomePage />} />

					{/* Страница авторизации. */}
					<Route path="/login" element={<LoginPage />} />

					{/* Страница регистрации. */}
					<Route path="/register" element={<RegisterPage />} />

					{/* Страница восстановления пароля. */}
					<Route path="/forgot-password" element={<ForgotPasswordPage />} />

					{/* Страница сброса пароля. */}
					<Route path="/reset-password" element={<ResetPasswordPage />} />

					{/* Страница ингредиента. */}
					<Route path="/ingredients/:id" element={<IngredientsPage />} />

					{/* Проверка безопасности */}
					<Route element={<ProtectedRouteElement />}>
						{/* Страница с настройками профиля пользователя. */}
						<Route path="/profile" element={<ProfilePage />} />

						{/* Страница с историей заказов. */}
						<Route path="/profile/orders" element={<ProfilePage />} />

						{/* Страница с историей заказа. */}
						<Route path="/profile/orders/:id" element={<ProfilePage />} />
					</Route>

					{/* Редирект. */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>

			{show && (
				// <Routes>
				// 	<Route
				// 		path="/ingredients/:ingredientId"
				// 		children={
				<Modal {...ParamsModal} isOpen={show} onClose={handleClose} overlay={true}>
					{ingredient !== null ? <IngredientDetails item={ingredient} /> : <OrderDetails sum={orderCode} />}
				</Modal>
				// 		}
				// 	/>
				// </Routes>
			)}
		</>
	)
}

export default App

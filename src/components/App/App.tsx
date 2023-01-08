// Import Components
import AppHeader from "components/AppHeader"
import Modal from "components/Modal"
import { IngredientDetails } from "components/BurgerIngredients/ui"
import OrderDetails from "components/OrderDetails/OrderDetails"

import { Routes, Route, Navigate } from "react-router-dom"

// Import Store
import { closeModal } from "services/modal/modalSlice"

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

function App() {
	const dispatch = useAppDispatch()
	const { show, ingredient } = useAppSelector((state) => state.modalSlice)
	const { orderCode } = useAppSelector((state) => state.constSlice)

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

					{/* Страница с настройками профиля пользователя. */}
					<Route path="/profile" element={<ProfilePage />} />

					{/* Страница ингредиента. */}
					<Route path="/ingredients/:id" element={<IngredientsPage />} />

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

import { useEffect } from "react"

// Import Components
import AppHeader from "components/AppHeader"
import Modal from "components/Modal"
import { IngredientDetails } from "components/BurgerIngredients/ui"
import OrderDetails from "components/OrderDetails/OrderDetails"
// import ProtectedRouteAuth from "components/ProtectedRouteAuth/ProtectedRouteAuth"
import ProtectedRouteElement from "components/ProtectedRouteElement/ProtectedRouteElement"
import { FormContainer } from "components/FormContainer/FormContainer"
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"

// Import Store
import { closeModal } from "services/modal/modalSlice"
// import { getProfile, tokenValue } from "services/user/userSlice"
// import { tokenValue as tokenUpdate, postToken } from "services/token/tokenSlice"
// import { getIngredients } from "services/ingredients/ingredientsSlice"

// Import Style
import style from "./App.module.css"

// Import Pages
import HomePage from "pages/HomePage/HomePage"
import LoginPage from "pages/LoginPage/LoginPage"
import RegisterPage from "pages/RegisterPage/RegisterPage"
import ForgotPasswordPage from "pages/ForgotPasswordPage/ForgotPasswordPage"
import ResetPasswordPage from "pages/ResetPasswordPage/ResetPasswordPage"
import ProfilePage from "pages/ProfilePage/ProfilePage"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"

function App() {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { show } = useAppSelector((state) => state.modalSlice)
	const { items } = useAppSelector((state) => state.ingredients)
	const { orderCode } = useAppSelector((state) => state.constSlice)
	// const { updateToken } = useAppSelector((state) => state.profile)
	const background = location.state && location.state.background

	// useEffect(() => {
	// 	dispatch(getIngredients())
	// dispatch(tokenValue(getCookie("access_token")))
	// dispatch(getProfile())
	// }, [dispatch])

	// useEffect(() => {
	// 	if (updateToken) {
	// 		dispatch(tokenUpdate(getCookie("refresh_token")))
	// 		dispatch(postToken())
	// 	}
	// }, [dispatch, updateToken])

	// Begin - Modal
	const handleClose = () => {
		dispatch(closeModal("order"))
	}

	const handleModalClose = () => {
		navigate(-1)
		dispatch(closeModal("ingredient"))
	}

	let ParamsModal
	if (items !== null) {
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
				<Routes location={background || location}>
					{/* Главная страница, конструктор бургеров. */}
					<Route path="/" element={<HomePage />} />

					{/* Проверка авторизации пользователя */}
					{/* <Route element={<ProtectedRouteAuth />}> */}
					{/* Страница авторизации. */}
					<Route path="/login" element={<LoginPage />} />

					{/* Страница регистрации. */}
					<Route path="/register" element={<RegisterPage />} />

					{/* Страница восстановления пароля. */}
					<Route path="/forgot-password" element={<ForgotPasswordPage />} />

					{/* Страница сброса пароля. */}
					<Route path="/reset-password" element={<ResetPasswordPage />} />
					{/* </Route> */}

					{/* Страница ингредиента. */}
					<Route
						path="/ingredients/:id"
						element={
							<FormContainer>
								<IngredientDetails items={items} />
							</FormContainer>
						}
					/>

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

			{show.order && (
				<Modal isOpen={show.order} onClose={handleClose} overlay={true}>
					<OrderDetails sum={orderCode} />
				</Modal>
			)}

			{background && (
				<Routes location={background && location}>
					<Route
						path="/ingredients/:id"
						element={
							<Modal {...ParamsModal} isOpen={true} onClose={handleModalClose} overlay={true}>
								<IngredientDetails items={items} />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	)
}

export default App

// Import Library
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"

// Import Components
import Modal from "components/Modal/Modal"
import { Header } from "components/Header/Header"
import { IngredientDetails } from "components/BurgerIngredients/ui"
import OrderDetails from "components/OrderDetails/OrderDetails"
import ProtectedRouteAuth from "components/ProtectedRouteAuth/ProtectedRouteAuth"
import ProtectedRoutePrivate from "components/ProtectedRoutePrivate/ProtectedRoutePrivate"

// Import Pages
import {
	HomePage,
	FeedPage,
	FeedDetailPage,
	IngredientPage,
	LoginPage,
	RegisterPage,
	ForgotPasswordPage,
	ResetPasswordPage,
	OrdersPage,
	OrdersDetailPage,
	ProfilePage,
} from "pages"

// Import Store
import { closeModal } from "services/modal/modalSlice"
import { postToken, checkToken } from "services/user/userSlice"

// Import Style
import style from "./App.module.css"

// Import Types
import { FC, useEffect } from "react"

// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"
import { FeedDetails } from "components/FeedDetails/FeedDetails"

const App: FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const { show } = useAppSelector((state) => state.modalSlice)
	const { items } = useAppSelector((state) => state.ingredients)
	const { orderCode } = useAppSelector((state) => state.constSlice)
	const { success } = useAppSelector((state) => state.user)

	const background = location.state && location.state.background

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

	useEffect(() => {
		if (success.updateToken) {
			dispatch(checkToken(getCookie("access_token")))
			dispatch(postToken())
		}

		if (success.logout) {
			window.location.href = "/login"
		}
	}, [dispatch, success.updateToken, success.logout])

	return (
		<>
			<Header />
			<main className={style.main}>
				<Routes location={background || location}>
					{/* Главная страница, конструктор бургеров. */}
					<Route path="/" element={<HomePage />} />

					{/* Страница ленты заказов. Доступен всем пользователям. */}
					<Route path="/feed" element={<FeedPage />} />

					{/* Страница заказа в ленте. Доступен всем пользователям. */}
					<Route
						path="/feed/:id"
						element={
							<FeedDetailPage>
								<FeedDetails items={items} />
							</FeedDetailPage>
						}
					/>

					{/* Проверка на не авторизованного пользователя */}
					<Route element={<ProtectedRouteAuth />}>
						{/* Страница ингредиента. */}
						<Route
							path="/ingredients/:id"
							element={
								<IngredientPage>
									<IngredientDetails items={items} />
								</IngredientPage>
							}
						/>

						{/* Страница авторизации. */}
						<Route path="/login" element={<LoginPage />} />

						{/* Страница регистрации. */}
						<Route path="/register" element={<RegisterPage />} />

						{/* Страница восстановления пароля. */}
						<Route path="/forgot-password" element={<ForgotPasswordPage />} />

						{/* Страница сброса пароля. */}
						<Route path="/reset-password" element={<ResetPasswordPage />} />
					</Route>

					{/* Проверка на авторизованного пользователя */}
					<Route element={<ProtectedRoutePrivate />}>
						{/* Страница с настройками профиля пользователя. */}
						<Route path="/profile" element={<ProfilePage />} />

						{/* Страница истории заказов пользователя. */}
						<Route path="/profile/orders" element={<OrdersPage />} />

						{/* Страница заказа в истории заказов. */}
						<Route
							path="/profile/orders/:id"
							element={
								<OrdersDetailPage>
									<FeedDetails items={items} />
								</OrdersDetailPage>
							}
						/>
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

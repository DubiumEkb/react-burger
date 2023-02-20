// Import Library
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"

// Import Framework

// Import Components
import Modal from "components/Modal/Modal"
import { Header } from "components/Header/Header"
import { IngredientDetails } from "components/BurgerIngredients/ui"
import OrderDetails from "components/OrderDetails/OrderDetails"
import ProtectedRouteAuth from "components/ProtectedRouteAuth/ProtectedRouteAuth"
import ProtectedRoutePrivate from "components/ProtectedRoutePrivate/ProtectedRoutePrivate"
import { FeedDetails } from "components/FeedDetails/FeedDetails"

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
// Import Hooks
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppStore"
import { getCookie } from "utils/cookie/getCookie"

// Import Types
import { FC, useEffect } from "react"

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
	const handleClose = (name: string) => {
		dispatch(closeModal(name))
	}

	const handleModalClose = (name: string) => {
		navigate(-1)
		dispatch(closeModal(name))
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
					<Route path="/feed" element={<FeedPage items={items} />} />

					{/* Страница заказа в ленте. Доступен всем пользователям. */}
					<Route
						path="/feed/:id"
						element={
							<FeedDetailPage>
								<FeedDetails type={"feed"} items={items} />
							</FeedDetailPage>
						}
					/>

					{/* Страница ингредиента. */}
					<Route
						path="/ingredients/:id"
						element={
							<IngredientPage>
								<IngredientDetails items={items} />
							</IngredientPage>
						}
					/>

					{/* Проверка на не авторизованного пользователя */}
					<Route element={<ProtectedRouteAuth />}>
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
						<Route path="/profile/orders" element={<OrdersPage items={items} />} />

						{/* Страница заказа в истории заказов. */}
						<Route
							path="/profile/orders/:id"
							element={
								<OrdersDetailPage>
									<FeedDetails type={"profile"} items={items} />
								</OrdersDetailPage>
							}
						/>
					</Route>

					{/* Редирект. */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>

			{show.order && (
				<Modal isOpen={show.order} onClose={() => handleClose("order")} overlay>
					<OrderDetails sum={orderCode} onClose={() => handleClose("order")} />
				</Modal>
			)}

			{background && (
				<Routes location={background && location}>
					{/* Модальное окно ингредиента. */}
					<Route
						path="/ingredients/:id"
						element={
							<Modal isOpen={true} onClose={() => handleModalClose("ingredient")} overlay>
								<IngredientDetails items={items} onClose={() => handleModalClose("ingredient")} modal />
							</Modal>
						}
					/>

					{/* Модальное окно заказа в ленте. Доступен всем пользователям. */}
					<Route
						path="/feed/:id"
						element={
							<Modal isOpen={true} onClose={() => handleModalClose("feed")} overlay>
								<FeedDetails
									items={items}
									type={"feed"}
									onClose={() => handleModalClose("feed")}
									modal
								/>
							</Modal>
						}
					/>

					{/* Проверка на авторизованного пользователя */}
					<Route element={<ProtectedRoutePrivate />}>
						{/* Страница заказа в истории заказов. */}
						<Route
							path="/profile/orders/:id"
							element={
								<Modal isOpen={true} onClose={() => handleModalClose("profileOrder")} overlay>
									<FeedDetails
										items={items}
										type={"profile"}
										onClose={() => handleModalClose("profileOrder")}
										modal
									/>
								</Modal>
							}
						/>
					</Route>
				</Routes>
			)}
		</>
	)
}

export default App

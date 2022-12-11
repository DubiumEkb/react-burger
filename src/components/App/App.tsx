// Import Library
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

// Import Framework

// Import Components
import AppHeader from "components/AppHeader"
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor"
import Modal from "components/Modal"
import { IngredientDetails } from "components/BurgerIngredients/ui"
import OrderDetails from "components/OrderDetails/OrderDetails"

// Import Store
import { closeModal } from "services/modal/modalSlice"

// Import Style
import style from "./App.module.css"

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
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</main>
			{show && (
				<Modal {...ParamsModal} isOpen={show} onClose={handleClose} overlay={true}>
					{ingredient !== null ? <IngredientDetails item={ingredient} /> : <OrderDetails sum={orderCode} />}
				</Modal>
			)}
		</>
	)
}

export default App

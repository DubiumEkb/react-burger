// Import Library
import { useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

// Import Components
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor"

// Import Store
import { getIngredients } from "services/ingredients/ingredientsSlice"

// Import Hooks
import { useAppDispatch } from "utils/hooks/useAppStore"

// Import Types
import type { FC } from "react"

export const HomePage: FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getIngredients())
	}, [dispatch])

	return (
		<DndProvider backend={HTML5Backend}>
			<BurgerIngredients />
			<BurgerConstructor />
		</DndProvider>
	)
}

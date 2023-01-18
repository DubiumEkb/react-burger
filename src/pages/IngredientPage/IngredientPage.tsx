// Import Library
import { useEffect } from "react"

// Import Framework

// Import Components
import { FormContainer } from "components/FormContainer/FormContainer"

// Import Store
import { getIngredients } from "services/ingredients/ingredientsSlice"

// Import Style

// Import Hooks
import { useAppDispatch } from "utils/hooks/useAppStore"

// Import Types
type TypeProps = {
	children: React.ReactNode
}

const IngredientPage = ({ children }: TypeProps) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getIngredients())
	}, [dispatch])

	return <FormContainer>{children}</FormContainer>
}

export default IngredientPage

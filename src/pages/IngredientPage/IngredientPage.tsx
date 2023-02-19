// Import Library
import { useEffect } from "react"

// Import Components
import { FormContainer } from "components/FormContainer/FormContainer"

// Import Store
import { getIngredients } from "services/ingredients/ingredientsSlice"

// Import Hooks
import { useAppDispatch } from "utils/hooks/useAppStore"

// Import Types
import type { FC } from "react"
type TypeProps = {
	children: React.ReactNode
}

export const IngredientPage: FC<TypeProps> = ({ children }) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getIngredients())
	}, [dispatch])

	return <FormContainer>{children}</FormContainer>
}

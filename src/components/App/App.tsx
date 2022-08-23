// Import Components
import { useEffect, useState } from "react"
import AppHeader from "../AppHeader/AppHeader"
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"

// Import Style
import style from "./App.module.css"

// Import Data
import { fetchDataIngredients } from "utils/api/ingredients"

// Import Context
import { IngredientsContext } from "../../utils/context/IngredientsContext"

function App() {
	const [state, setState] = useState([])

	useEffect(() => {
		fetchDataIngredients().then((data) => {
			setState(data)
		})
	}, [])

	if (!state) return <></>

	return (
		<>
			<AppHeader />
			<main className={style.main}>
				<IngredientsContext.Provider value={state}>
					<BurgerIngredients />
					<BurgerConstructor />
				</IngredientsContext.Provider>
			</main>
		</>
	)
}

export default App

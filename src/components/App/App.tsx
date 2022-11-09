// Import Library
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

// Import Framework

// Import Components
import AppHeader from "components/AppHeader"
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor"

// Import Store

// Import Style
import style from "./App.module.css"

// Import Hooks

function App() {
	return (
		<>
			<AppHeader />
			<main className={style.main}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</main>
		</>
	)
}

export default App

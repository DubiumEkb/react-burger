// Import Style
import style from "./App.module.css"

// Import Data
// import data from "../../utils/data"

// Import Components
import AppHeader from "../AppHeader/AppHeader"
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"
import useFetch from "../../utils/hooks/useFetch"

function App() {
	const data = useFetch("https://norma.nomoreparties.space/api/ingredients")

	if (!data) return <></>

	return (
		<>
			<AppHeader />
			<main className={style.main}>
				<BurgerIngredients data={data} />
				<BurgerConstructor data={data} />
			</main>
		</>
	)
}

export default App

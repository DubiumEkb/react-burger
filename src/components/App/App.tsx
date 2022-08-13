// Import Style
import style from "./App.module.css"

// Import Data
// import data from "../../utils/data"

// Import Components
import { useState, useEffect } from "react"
import AppHeader from "../AppHeader/AppHeader"
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"

const useFetch = (url: string) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		async function fetchData() {
			fetch(url)
				.then((response) => {
					return response.json()
				})
				.then((data) => {
					setData(data.data)
				})
				.catch((error) => {
					console.error(console.error())
				})
		}
		fetchData()
	}, [url])

	return data
}

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

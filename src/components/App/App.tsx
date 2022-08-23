// Import Style
import style from "./App.module.css"

// Import Data
import data from "../../utils/data"

// Import Components
import AppHeader from "../AppHeader/AppHeader"
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"

function App() {
  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
}

export default App;

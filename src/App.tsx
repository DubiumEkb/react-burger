// Import Style
import style from "./App.module.css"

// Import Data
import data from "./utils/data"

// Import Components
import AppHeader from "./components/AppHeader/AppHeader"
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor"

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

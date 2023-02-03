// Import Framework
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

// Import Components
import App from "components/App/App"
import reportWebVitals from "./reportWebVitals"
// Import Store
import { Provider } from "react-redux"
import { store } from "services"

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
<<<<<<< HEAD
  <React.StrictMode>
<App />
  </React.StrictMode>
);
=======
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
)
>>>>>>> 1ba2c6b30a86975e0f44e2880fbf4390ffa36935

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// Import Framework
import React from "react"
import { createRoot } from "react-dom/client"

// Import Components
import App from "components/App/App"
import reportWebVitals from "./reportWebVitals"

// Import Store
import { Provider } from "react-redux"
import { store } from "features"

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

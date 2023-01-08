import { urlAPI } from "utils/config"

export const ForgotPassword = () => {
	const data = {}

	return fetch(`${urlAPI}/password-reset`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка ${response.status}`)
			}
			return response.json()
		})
		.then((response) => {
			console.debug(response)
		})
		.catch((error) => {
			console.error(error)
		})
}

export const ResetPassword = () => {}

export const Login = () => {}

export const Register = () => {}

export const LoginOut = () => {}

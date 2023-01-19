export const request = (url: string, options?: RequestInit) => {
	return fetch(url, options)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка ${response.status}`)
			}
			return response.json()
		})
		.catch((error: Error) => {
			throw new Error(`Ошибка ${error}`)
		})
}

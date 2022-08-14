// Import Components
import { useState, useEffect } from "react"

const useFetch = (url: string) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		async function fetchData() {
			fetch(url)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Ошибка ${response.status}`)
					}
					return response.json()
				})
				.then((data) => {
					setData(data.data)
				})
				.catch((error) => {
					console.error(error)
				})
		}
		fetchData()
	}, [url])

	return data
}

export default useFetch

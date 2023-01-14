import { setCookie } from "./setCookie"

export const deleteCookie = (name: string) => {
	// Находим куку по ключу token, удаляем её значение,
	// устанавливаем отрицательное время жизни, чтобы удалить сам ключ token
	setCookie(name, "", { expires: -1 })
}

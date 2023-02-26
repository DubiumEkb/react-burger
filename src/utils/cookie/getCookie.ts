export const getCookie = (name: string) => {
	const cookie = document.cookie
	/* eslint-disable */
	const escapedName = name.replace(/([.\\+\-*:\/?!|^${}()\[\]])/g, "\\$1")
	const regex = new RegExp(`(?:^|; )${escapedName}=([^;]*)`)
	const matches = cookie.match(regex)

	return matches ? decodeURIComponent(matches[1]) : undefined
}

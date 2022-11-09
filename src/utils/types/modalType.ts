export interface modalType {
	title?: string
	children: React.ReactNode
	isOpen: boolean
	onClose: () => void
	overlay?: boolean
}

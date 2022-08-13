// Import Components
import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Style
import style from "./Modal.module.css"

// Types
type Props = {
	title?: string
	children: React.ReactNode
	isOpen: boolean
	onClose: () => void
	overlay?: boolean
}

const Modal = ({ children, title, isOpen, onClose, overlay = false }: Props) => {
	const containerModal = document.getElementById("react-modals")

	useEffect(() => {
		const handleClose = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose()
			}
		}
		window.addEventListener("keydown", handleClose)
		return () => {
			window.removeEventListener("keydown", handleClose)
		}
	}, [onClose])

	if (!containerModal) return null

	return ReactDOM.createPortal(
		<>
			<div className={`${style.Modal} ${isOpen && style.ModalActive}`}>
				{title ? (
					<div className={`${style.ModalHeader} pt-10 pl-10 pr-10`}>
						<strong className="text text_type_main-large">{title}</strong>
						<button className={style.ModalHeaderClose} onClick={onClose}>
							<CloseIcon type="primary" />
						</button>
					</div>
				) : (
					<div className={`${style.ModalHeaderNotTitle} pt-15 pr-10`}>
						<button className={style.ModalHeaderNotTitleClose} onClick={onClose}>
							<CloseIcon type="primary" />
						</button>
					</div>
				)}
				{children}
			</div>
			{overlay === true && <ModalOverlay isOpen={isOpen} />}
		</>,
		containerModal,
	)
}

export default Modal

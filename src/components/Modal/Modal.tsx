// Import Assets

// Import Library
import classNames from "classnames"
import { useEffect } from "react"
import { createPortal } from "react-dom"

// Import Framework

// Import Components

// Import Pages

// Import Store

// Import Style
import style from "./Modal.module.css"

// Import Hooks

// Import Utils

// Import Types
import type { FC } from "react"
import { ModalType } from "utils/types/modalType"

const Modal: FC<ModalType> = ({ children, isOpen, onClose, overlay }) => {
	overlay = overlay || false

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

	return createPortal(
		<>
			<div className={classNames(style.modal, { [style.modalActive]: isOpen })}>{children}</div>
			{overlay && (
				<div className={classNames(style.overlay, { [style.overlayActive]: isOpen })} onClick={onClose}></div>
			)}
		</>,
		containerModal,
	)
}

export default Modal

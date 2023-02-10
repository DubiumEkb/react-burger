// Import Components
import { useEffect } from "react"
import ReactDOM from "react-dom"
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Style
import style from "./Modal.module.css"

// Import Types
import type { FC } from "react"
import { ModalType } from "utils/types/modalType"
import classNames from "classnames"

const Modal: FC<ModalType> = ({ children, title, isOpen, onClose, overlay }) => {
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

	return ReactDOM.createPortal(
		<>
			<div className={classNames(style.Modal, { [style.ModalActive]: isOpen })}>
				{title ? (
					<div className={classNames(style.ModalHeader, "pt-10", "pl-10", "pr-10")}>
						<strong className="text text_type_main-large">{title}</strong>
						<button className={style.ModalHeaderClose} onClick={onClose} type="button">
							<CloseIcon type="primary" />
						</button>
					</div>
				) : (
					<div className={classNames(style.ModalHeaderNotTitle, "pt-15", "pr-10")}>
						<button className={style.ModalHeaderNotTitleClose} onClick={onClose} type="button">
							<CloseIcon type="primary" />
						</button>
					</div>
				)}
				{children}
			</div>
			{overlay === true && <ModalOverlay isOpen={isOpen} closeModal={onClose} />}
		</>,
		containerModal,
	)
}

export default Modal

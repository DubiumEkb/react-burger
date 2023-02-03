// Imporrt Style
import style from "./ModalOverlay.module.css"

// Import Types
import type { FC } from "react"
type Props = {
	isOpen: Boolean
	closeModal: () => void
}

const ModalOverlay: FC<Props> = ({ isOpen, closeModal }) => {
	return <div className={`${style.Overlay} ${isOpen === true && style.OverlayActive}`} onClick={closeModal}></div>
}

export default ModalOverlay

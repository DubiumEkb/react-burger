// Imporrt Style
import style from "./ModalOverlay.module.css"

// Import Types
import type { FC } from "react"
import classNames from "classnames"
type Props = {
	isOpen: Boolean
	closeModal: () => void
}

const ModalOverlay: FC<Props> = ({ isOpen, closeModal }) => {
	return <div className={classNames(style.Overlay, { [style.OverlayActive]: isOpen })} onClick={closeModal}></div>
}

export default ModalOverlay

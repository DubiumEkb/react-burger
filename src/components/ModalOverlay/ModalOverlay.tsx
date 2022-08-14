// Imporrt Style
import style from "./ModalOverlay.module.css"

// Types
type Props = {
	isOpen: Boolean
	closeModal: () => void
}

const ModalOverlay = ({ isOpen, closeModal }: Props) => {
	return <div className={`${style.Overlay} ${isOpen === true && style.OverlayActive}`} onClick={closeModal}></div>
}

export default ModalOverlay

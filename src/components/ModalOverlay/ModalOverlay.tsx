// Imporrt Style
import style from "./ModalOverlay.module.css"

// Types
type Props = {
	isOpen: Boolean
}

const ModalOverlay = ({ isOpen }: Props) => {
	return <div className={`${style.Overlay} ${isOpen === true && style.OverlayActive}`}></div>
}

export default ModalOverlay

// Import Assets

// Import Library
import { useParams } from "react-router-dom"
import classNames from "classnames"
// Import Framework
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
// Import Components

// Import Store

// Import Style
import style from "./IngredientDetails.module.css"
// Import Hooks

// Import Types
import type { FC } from "react"
import { DataType } from "utils/types/dataType"
export type IngredientDetailsProps = {
	items: DataType[] | null
	modal?: boolean
	onClose?: () => void
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({ items, modal, onClose }) => {
	const { id } = useParams()

	if (items === null) return <></>
	const item = items.find((item) => item._id === id)

	return (
		<div className={style.IngredientsModal}>
			{modal && (
				<div className={classNames(style.IngredientsModalTitle, "mt-10", "ml-10", "mr-10")}>
					<strong className={classNames("text text_type_main-large")}>Детали ингредиента</strong>
					<button className={style.IngredientsModalTitleClose} onClick={onClose} type="button">
						<CloseIcon type="primary" />
					</button>
				</div>
			)}

			<div className={style.IngredientsModalImage}>
				<img src={item?.image_large} alt={item?.name} />
			</div>

			<p className="text text_type_main-medium pt-4 pb-8">{item?.name}</p>
			<div className={classNames(style.IngredientsModalFooter, "mb-15")}>
				<div className={style.IngredientsModalFooterItem}>
					<div className="text text_type_main-default pb-2">Калории,ккал</div>
					<div className="text text_type_digits-default">{item?.calories}</div>
				</div>
				<div className={style.IngredientsModalFooterItem}>
					<div className="text text_type_main-default pb-2">Белки,г</div>
					<div className="text text_type_digits-default">{item?.proteins}</div>
				</div>
				<div className={style.IngredientsModalFooterItem}>
					<div className="text text_type_main-default pb-2">Жиры,г</div>
					<div className="text text_type_digits-default">{item?.fat}</div>
				</div>
				<div className={style.IngredientsModalFooterItem}>
					<div className="text text_type_main-default pb-2">Углеводы,г</div>
					<div className="text text_type_digits-default">{item?.carbohydrates}</div>
				</div>
			</div>
		</div>
	)
}

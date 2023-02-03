// Import Library
import { useParams } from "react-router-dom"

// Import Style
import style from "./IngredientDetails.module.css"

// Import Types
import type { FC } from "react"
import { DataType } from "utils/types/dataType"

export interface IngredientDetailsProps {
	items: DataType[] | null
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({ items }) => {
	const { id } = useParams()

	if (items === null) return <></>
	const item = items.find((item) => item._id === id)

	return (
		<div className={`${style.IngredientsModal}`}>
			<div className={style.IngredientsModalImage}>
				<img src={item?.image_large} alt={item?.name} />
			</div>
			<p className="text text_type_main-medium pt-4 pb-8">{item?.name}</p>
			<div className={`${style.IngredientsModalFooter} pb-15`}>
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

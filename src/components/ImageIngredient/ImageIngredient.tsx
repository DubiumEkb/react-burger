import classNames from "classnames"
import type { FC } from "react"
import { DataType } from "utils/types/dataType"
import styles from "./ImageIngredient.module.css"

type Props = {
	key: string
	item: DataType
	num?: number
}

export const ImageIngredient: FC<Props> = ({ item, num }) => {
	return (
		<div className={classNames(styles.Image, { [styles.ImageOpacity]: num })}>
			{num && <span className={styles.ImageNum}>+{num}</span>}
			{<img className={styles.ImageIngredient} src={item.image_mobile} alt={item.name} />}
		</div>
	)
}

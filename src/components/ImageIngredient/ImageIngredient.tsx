// Import Assets

// Import Library
import classNames from "classnames"

// Import Framework

// Import Components

// Import Pages

// Import Store

// Import Style
import styles from "./ImageIngredient.module.css"

// Import Hooks

// Import Utils

// Import Types
import type { FC } from "react"
import { DataType } from "utils/types/dataType"
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

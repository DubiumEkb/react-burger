// Import Assets

// Import Library
import classNames from "classnames"
// Import Framework
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
// Import Components
import { ImageIngredient } from "components/ImageIngredient/ImageIngredient"
import { Price } from "components/Price/Price"
// Import Pages

// Import Store

// Import Style
import styles from "./Component.module.css"
// Import Hooks

// Import Types
import type { FC } from "react"
import { DataType } from "utils/types/dataType"
type Props = {
	item: DataType
}

export const Component: FC<Props> = ({ item }) => {
	let price = 0

	if (item.count && item.price) {
		price = item.count * item.price
	}

	return (
		<div className={styles.card}>
			<div className={styles.cardImg}>
				<ImageIngredient key={item._id} item={item} />
			</div>
			<div className={classNames(styles.cardName, "ml-4", "mr-4")}>{item.name}</div>
			<div className={styles.cardPrice}>
				<div className={classNames(styles.cardPriceNumber, "text", "text_type_digits-default")}>
					<div className={styles.cardPriceNumberCount}>{item.count}</div>
					<div className={styles.cardPriceNumberX}>x</div>
					<div className={styles.cardPriceNumberPrice}>
						<Price>{price}</Price>
					</div>
				</div>

				<CurrencyIcon type="primary" />
			</div>
		</div>
	)
}

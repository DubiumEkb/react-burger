// Import Library
import classNames from "classnames"

// Import Framework
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"

// Import Components

// Import Store

// Import Style
import styles from "./Order.module.css"
// Import Hooks

export const Order = () => {
	const dateFromServer = "2023-02-02T17:33:32.877Z"

	return (
		<div className={classNames(styles.order, "p-6")}>
			<div className={styles.orderHeader}>
				<div className="text text_type_digits-default">#034535</div>

				<div className={styles.orderHeaderTime}>
					<FormattedDate date={new Date(dateFromServer)} />
				</div>
			</div>

			<div className={styles.orderBody}>
				<p className="text text_type_main-medium">Death Star Starship Main бургер</p>
			</div>

			<div className={styles.orderFooter}></div>
		</div>
	)
}

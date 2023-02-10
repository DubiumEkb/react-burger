// Import Library
import classNames from "classnames"

// Import Framework

// Import Components
import { Order } from "components/Order/Order"
// Import Store

// Import Style
import styles from "./FeedPage.module.css"

// Import Hooks

// Import Types
import type { FC } from "react"

const FeedPage: FC = () => {
	return (
		<>
			<section className={classNames(styles.feedList, "pr-15")}>
				<div className="pt-10 pb-5">
					<h1 className="text text_type_main-large">Лента заказов</h1>
				</div>
				<div>
					<Order />
				</div>
			</section>
			<section className={classNames(styles.feedItem, "pt-25")}>2</section>
		</>
	)
}

export default FeedPage

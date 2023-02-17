import classNames from "classnames"
import { FormContainer } from "components/FormContainer/FormContainer"
import { Component } from "components/Component/Component"
import styles from "./FeedDetailPage.module.css"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const FeedDetailPage = () => {
	return (
		<FormContainer>
			<div className={classNames(styles.detailNumber)}>#034533</div>

			<div className={classNames(styles.detailTitle)}>Black Hole Singularity острый бургер</div>

			<div className={classNames(styles.detailStatus)}>Выполнен</div>

			<div className={classNames(styles.detailComponent)}>Состав:</div>

			<div className={classNames(styles.detailList)}>
				<Component />

				<Component />

				<Component />

				<Component />

				<Component />
			</div>

			<div className={classNames()}>
				<div>Вчера, 13:50 i-GMT+3</div>
				<div>
					<span>510</span>

					<CurrencyIcon type="primary" />
				</div>
			</div>
		</FormContainer>
	)
}

export default FeedDetailPage

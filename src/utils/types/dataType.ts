export interface DataType {
	calories: number
	carbohydrates: number
	fat: number
	image: string
	image_large: string
	image_mobile: string
	name: string
	price: number
	proteins: number
	type: string
	__v: number
	_id: string
	sortingId: string
	index?: number
	count?: number
}

export interface OrderType {
	createdAt: string
	ingredients: (string | DataType)[]
	name: string
	number: number
	status: string
	updatedAt: string
	_id: string
}

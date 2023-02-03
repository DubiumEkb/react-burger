export interface DataType {
	filter(arg0: (item: any) => void): unknown
	_id: string
	name: string
	type: string
	proteins: number
	fat: number
	carbohydrates: number
	calories: number
	price: number
	image: string
	image_mobile: string
	image_large: string
	__v: number
	sortingId: string
	index?: number
}

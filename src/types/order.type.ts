export type OrderProduct = {
	product_id: number;
	quantity: number;
};

export type Order = {
	id?: number;
	products: OrderProduct[];
	user_id: number;
	status: boolean;
};

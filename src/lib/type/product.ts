export type TProduct = {
	productId: number;
	id: number;
	name: string;
	description: string;
	price: number; 
	tags: string;
	image: string;
	createdAt: string;
	updateAt: string;
};

export type TProductsResponse = {
	data: {
		collection: TProduct[];
		pagination: {
			currentPage: number;
			totalPages: number;
			totalOrders: number;
			limit: number;
		};
	};
	status: number;
};

export type CartItem = {
	productId: number;
	id: number;
	name: string;
	description: string;
	price: number; 
	tags: string;
	image: string;
	createdAt: string;
	updateAt: string;
	quantity: number;
};

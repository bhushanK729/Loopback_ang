import { Product } from "./product";

export class Sale {
    id: number;
    productId: string;
    product_price: string;
    quantity: number;
    total_price: number;
    sale_date: string;  
    product: Product;
}
import { Product } from "@prisma/client";

abstract class ProductRepository{ 
    abstract import(product: Product[]): Promise<Product[]>

}

export default ProductRepository;

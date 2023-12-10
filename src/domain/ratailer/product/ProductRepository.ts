import { CreateProductDTO } from "@dtos/product/ImportProductDTO";
import { Product } from "@prisma/client";

abstract class ProductRepository{  

    abstract listAll(): Promise<Product[]>
    abstract create(product: CreateProductDTO): Promise<Product>
    abstract findByName(name: string): Promise<Product>
}

export default ProductRepository;

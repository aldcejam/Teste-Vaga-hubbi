import { Product } from "@prisma/client";

abstract class ProductRepository{

    abstract create(product: Product): Promise<Product>

}
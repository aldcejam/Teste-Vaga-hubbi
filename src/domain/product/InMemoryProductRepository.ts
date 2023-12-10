import { Product } from "@prisma/client";
import ProductRepository from "./ProductRepository";

class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

    async import(products: Product[]): Promise<Product[]> {
        this.products.push(...products);
        return products;
    }
 
}

export default InMemoryProductRepository;
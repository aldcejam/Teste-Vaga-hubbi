import { Product } from "@prisma/client";
import ProductRepository from "./ProductRepository";
import { v4 as uuidV4 } from 'uuid';
import { CreateProductDTO } from "@dtos/product/ImportProductDTO";

class InMemoryProductRepository implements ProductRepository {
    private products: Product[] = [];

    async listAll(): Promise<Product[]> {
        return this.products;
    }   
    
    async create(product: CreateProductDTO): Promise<Product> {
        const productCreated:Product = {
            id: uuidV4(),
            name: product.name,
            retailerId: product.retailerId,
            affiliateId: product.affiliateId,
            affiliatePercent: product.affiliatePercent,
        } 

        this.products.push(productCreated);

        return productCreated;
    }
 
    async findByName(name: string): Promise<Product | null> {
        const product = this.products.find(product => product.name === name);
        return product;
    }

}

export default InMemoryProductRepository;
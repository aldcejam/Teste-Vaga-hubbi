import ProductRepository from "@domain/product/ProductRepository";

class ImportProductUseCase{
    constructor(private productRepository: ProductRepository){} 

    async execute(){
        
    }
}

export { ImportProductUseCase }
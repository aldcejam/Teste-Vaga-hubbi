import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import ProductRepository from "@domain/ratailer/product/ProductRepository";
import { CreateProductDTO } from "@dtos/product/ImportProductDTO";
import { HttpException } from "@nestjs/common";

class CreateProductUseCase {
    constructor(
        private productRepository: ProductRepository,
        private retailerRepository: RetailerRepository    
    ) {}
    
    async execute({name,affiliatePercent,retailerId,affiliateId}: CreateProductDTO) {
        
        if(!affiliateId){
            affiliateId = null;
        }

        const productAlreadyExists = await this.productRepository.findByName(name);
        const retailerExist = await this.retailerRepository.findByName(name);

        if(productAlreadyExists) {
            throw new HttpException("Produto já existe", 400);
        }

        if (!retailerExist) {
            throw new HttpException("Id de Varejista está inválido", 400);
        }  
         
        if(affiliatePercent < 1){
            throw new HttpException("Percentual de afiliado não pode ser menor que 1", 400);
        }
        if(affiliatePercent > 100){
            throw new HttpException("Percentual de afiliado não pode ser maior que 100", 400);
        }
         
        const productCreated = await this.productRepository.create({name,affiliatePercent,retailerId,affiliateId});
        return productCreated;
    }
}

export default CreateProductUseCase;
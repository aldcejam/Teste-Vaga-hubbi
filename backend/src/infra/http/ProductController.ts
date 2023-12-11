import { RetailerRepository } from '@domain/ratailer/RetailerRepository';
import ProductRepository from '@domain/ratailer/product/ProductRepository';
import { CreateProductDTO } from '@dtos/product/CreateProductDTO';
import { Body, Controller, Post } from '@nestjs/common';
import CreateProductUseCase from '@usecases/retailer/product/CreateProductUseCase';

@Controller("produto")
export class ProductController {

    constructor(
        private productRepository: ProductRepository,
        private retailerRepository: RetailerRepository
    ) { }

    @Post("/")
    async createProductController(@Body() body: CreateProductDTO) {
        const { name, affiliatePercent, retailerId, affiliateId } = body;
        const createRatailerUseCase = new CreateProductUseCase(this.productRepository, this.retailerRepository);
        const retailerCreated = await createRatailerUseCase.execute({
            name, affiliatePercent, retailerId, affiliateId
        });

        return retailerCreated;
    }
}

import { SaleRepository } from '@domain/ratailer/sale/SaleRepository';
import { RetailerRepository } from '@domain/ratailer/RetailerRepository';
import { AffiliateRepository } from '@domain/ratailer/affiliate/AffiliateRepository'; 
import { CreateSaleDTO } from '@dtos/sale/CreateSaleDTO';
import { Body, Controller, Get, Post, Query } from '@nestjs/common'; 
import { CreateSaleUseCase } from '@usecases/retailer/sale/CreateSaleUseCase';
import { FindAffiliateByRetailerUseCase } from '@usecases/retailer/affiliate/findAffiliateByRetailer/FindAffiliateByRetailerUseCase';

@Controller("vendas")
export class SaleController {

    constructor(
        private saleRepository: SaleRepository,
        private retailerRepository: RetailerRepository,
        private affiliateRepository: AffiliateRepository
    ) { }

    @Post("/")
    async createSaleController(@Body() body: CreateSaleDTO) {
        const { date,price,product,retailerId,seller,transactionType,affiliateId } = body;
        const createSaleUseCase = new CreateSaleUseCase(this.saleRepository, this.retailerRepository,this.affiliateRepository);

        const sale = await createSaleUseCase.execute({
            affiliateId,
            retailerId,
            date,
            price,
            product,
            seller,
            transactionType,
        });

        return sale;
    }
    @Get("/")
    async findSaleController(@Query("retailerId") retailerId: string) { 
        const findAffiliateByRetailerUseCase = new FindAffiliateByRetailerUseCase(this.affiliateRepository);
        const affiliate = await findAffiliateByRetailerUseCase.execute(retailerId);
        return affiliate;
    }
}

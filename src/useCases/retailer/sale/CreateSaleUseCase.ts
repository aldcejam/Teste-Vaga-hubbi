import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import { AffiliateRepository } from "@domain/ratailer/affiliate/AffiliateRepository";
import { SaleRepository } from "@domain/ratailer/sale/SaleRepository";
import { CreateSaleDTO } from "@dtos/sale/CreateSaleDTO";
import { HttpException } from "@nestjs/common";

class CreateSaleUseCase {
    constructor(
        private saleRepository: SaleRepository,
        private retailerRepository: RetailerRepository,
        private affiliateRepository: AffiliateRepository
    ) {}
    
    async execute({affiliateId,retailerId,date,price,product,seller,transactionType}: CreateSaleDTO) {
        
        if(!affiliateId) {
            affiliateId = null;
        }

        const retailerExists = await this.retailerRepository.findById(retailerId);
        if(!retailerExists) {
            throw new HttpException('varejista não existe', 404);
        }
        const affiliateExists = await this.affiliateRepository.findById(affiliateId);
        if(!affiliateExists && affiliateId != null) {
            throw new HttpException('afiliado não existe', 404);
        }

        const saleAlreadyCadastred = await this.saleRepository.findByDateAndRetailerIdAndAffiliateId({affiliateId,retailerId,date});
        if(saleAlreadyCadastred.length > 0) {
            throw new HttpException('Venda já cadastrada', 409);
        }

        
        const saleCreated =  await this.saleRepository.create({
            affiliateId,
            retailerId,
            date,
            price,
            product,
            seller,
            transactionType
        });

        return saleCreated;
    }
}

export { CreateSaleUseCase }
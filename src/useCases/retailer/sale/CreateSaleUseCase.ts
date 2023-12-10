import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import { AffiliateRepository } from "@domain/ratailer/affiliate/AffiliateRepository";
import { SaleRepository } from "@domain/ratailer/sale/SaleRepository";
import { CreateSaleDTO } from "@dtos/sale/CreateSaleDTO";
import { HttpException } from "@nestjs/common";
import { FormatStructureCurrency } from "src/utils/FormatStructureCurrency";

class CreateSaleUseCase {
    constructor(
        private saleRepository: SaleRepository,
        private retailerRepository: RetailerRepository,
        private affiliateRepository: AffiliateRepository
    ) {}
    
    async execute({affiliateId,retailerId,date,price,product,seller,transactionType}: CreateSaleDTO) {
        
        const formatedPrice = FormatStructureCurrency(price);

        
        const retailerExists = await this.retailerRepository.findById(retailerId);
        if(!retailerExists) {
            throw new HttpException('varejista não existe', 404);
        }
        if(affiliateId) {
            const affiliateExists = await this.affiliateRepository.findById(affiliateId); 
            if (affiliateId != null && affiliateExists.retailerId != retailerId) {
                throw new HttpException('Afiliado não pertence a este varejista', 404);
            }
        }
        
        const saleAlreadyCadastred = await this.saleRepository.findByDateAndRetailerIdAndAffiliateId({affiliateId,retailerId,date});
        if(saleAlreadyCadastred.length > 0) {
            throw new HttpException('Venda já cadastrada', 409);
        }
        
        if(!affiliateId) {
            affiliateId = null;
        }
        
        const saleCreated =  await this.saleRepository.create({
            affiliateId,
            retailerId,
            date,
            price: formatedPrice,
            product,
            seller,
            transactionType
        });
        
        return saleCreated;
    }
}

export { CreateSaleUseCase }
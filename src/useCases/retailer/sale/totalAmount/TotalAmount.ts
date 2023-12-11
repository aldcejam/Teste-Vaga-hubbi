import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import { AffiliateRepository } from "@domain/ratailer/affiliate/AffiliateRepository";
import { SaleRepository } from "@domain/ratailer/sale/SaleRepository";
import { TotalAmountDTO } from "@dtos/sale/TotalAmountDTO";
import { HttpException } from "@nestjs/common";

class TotalAmountUseCase {
    constructor( 
        private saleRepository: SaleRepository,
        private retailerRepository: RetailerRepository,
        private affiliateRepository: AffiliateRepository,
    ) {}
     
    async execute({retailerId, affiliateId}:TotalAmountDTO) {
         
        try{
            await this.retailerRepository.findById(retailerId);
        }
        catch(err){
            throw new HttpException('Varejista não existe', 404);
        }
    
        
 

    }

}

export { TotalAmountUseCase }
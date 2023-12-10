import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import { AffiliateRepository } from "@domain/ratailer/affiliate/AffiliateRepository";
import { CreateAffiliateDTO } from "@dtos/affiliate/CreateAffiliateDTO";
import { HttpException } from "@nestjs/common";
import { Affiliate } from "@prisma/client";

class CreateAffiliateUseCase {
    constructor(
        private affiliateRepository: AffiliateRepository,
        private retailerRepository: RetailerRepository    
        ) {}
    
    async execute({name,retailerId}: CreateAffiliateDTO): Promise<Affiliate> {
        const retailerExists = await this.retailerRepository.findById(retailerId);
        const affiliateExists = await this.affiliateRepository.findByName(name);

        if(affiliateExists) {
            throw new HttpException("Afiliado já existe",409);
        }

        if(!retailerExists) {
            throw new HttpException("Id de Varejista está inválido",404);
        }
        

        const affiliateCreated = await this.affiliateRepository.create({name,retailerId});

        return affiliateCreated;
    }
}

export { CreateAffiliateUseCase }
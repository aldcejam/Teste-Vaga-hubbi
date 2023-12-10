import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import { AffiliateRepository } from "@domain/ratailer/affiliate/AffiliateRepository";
import { CreateAffiliateDTO } from "@dtos/affiliate/CreateAffiliateDTO";
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
            throw new Error("Afiliado já existe");
        }

        if(!retailerExists) {
            throw new Error("Id de Varejista está inválido");
        }
        

        const affiliateCreated = await this.affiliateRepository.create({name,retailerId});

        return affiliateCreated;
    }
}

export { CreateAffiliateUseCase }
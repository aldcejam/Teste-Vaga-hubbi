import { AffiliateRepository } from "@domain/affiliate/AffiliateRepository";
import { FindAffiliateByRetailerDTO } from "@dtos/affiliate/FindAffiliateByRetailerDTO";
import { Affiliate } from "@prisma/client";

class FindAffiliateByRetailerUseCase{
    constructor(private affiliateRepository: AffiliateRepository){}

    async execute({retailerId}: FindAffiliateByRetailerDTO): Promise<Affiliate[]>{
        const affiliate = await this.affiliateRepository.findByRetailerId(retailerId);
        return affiliate;
    }
}

export { FindAffiliateByRetailerUseCase }
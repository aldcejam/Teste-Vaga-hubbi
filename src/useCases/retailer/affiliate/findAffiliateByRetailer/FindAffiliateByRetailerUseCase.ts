import { AffiliateRepository } from "@domain/ratailer/affiliate/AffiliateRepository";
import { Affiliate } from "@prisma/client";

class FindAffiliateByRetailerUseCase{
    constructor(private affiliateRepository: AffiliateRepository){}

    async execute(retailerId: string): Promise<Affiliate[]>{
        const affiliate = await this.affiliateRepository.findByRetailerId(retailerId);
        return affiliate;
    }
}

export { FindAffiliateByRetailerUseCase }
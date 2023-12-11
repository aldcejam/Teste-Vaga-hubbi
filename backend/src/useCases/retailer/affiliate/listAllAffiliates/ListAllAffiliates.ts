import { AffiliateRepository } from "@domain/ratailer/affiliate/AffiliateRepository";
import { Affiliate } from "@prisma/client";

class ListAllAffiliates {
    constructor(private affiliateRepository: AffiliateRepository) {}
    
    async execute(): Promise<Affiliate[]> {
        const affiliates = await this.affiliateRepository.listAll();
    
        return affiliates;
    }
}

export { ListAllAffiliates };
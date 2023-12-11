import { AffiliateRepository } from "@domain/affiliate/AffiliateRepository";
import { HttpException } from "@nestjs/common";
import { Affiliate } from "@prisma/client";

class ListAllAffiliates {
    constructor(private affiliateRepository: AffiliateRepository) {}
    
    async execute(): Promise<Affiliate[]> {

        try{
            return await this.affiliateRepository.listAll();
        }
        catch(err){
            throw new HttpException("não há afiliados", 404);
        }
    }
}

export { ListAllAffiliates };
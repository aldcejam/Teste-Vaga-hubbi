import { AffiliateRepository } from "@domain/affiliate/AffiliateRepository";
import { FindAffiliateByRetailerDTO } from "@dtos/affiliate/FindAffiliateByRetailerDTO";
import { HttpException } from "@nestjs/common";
import { Affiliate } from "@prisma/client";

class FindAffiliateByRetailerUseCase{
    constructor(private affiliateRepository: AffiliateRepository){}

    async execute({retailerId}: FindAffiliateByRetailerDTO): Promise<Affiliate[]>{

        try{
            const affiliate = await this.affiliateRepository.findByRetailerId(retailerId);
            return affiliate;
        }catch(err){
            throw new HttpException("Afiliado não encontrado", 404);
        } 
    }
}

export { FindAffiliateByRetailerUseCase }
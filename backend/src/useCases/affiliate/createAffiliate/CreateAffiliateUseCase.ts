import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import { AffiliateRepository } from "@domain/affiliate/AffiliateRepository";
import { CreateAffiliateDTO } from "@dtos/affiliate/CreateAffiliateDTO";
import { HttpException } from "@nestjs/common";
import { Affiliate } from "@prisma/client";

class CreateAffiliateUseCase {
    constructor(
        private affiliateRepository: AffiliateRepository,
        private retailerRepository: RetailerRepository
    ) { }

    async execute({ name, retailerId }: CreateAffiliateDTO): Promise<Affiliate> {

        const affiliateAlreadyExists = await this.affiliateRepository.findByName(name);
        if (affiliateAlreadyExists) {
            throw new HttpException('Afiliado já existe', 404);
        }
        try {
            await this.retailerRepository.findById(retailerId);
        }
        catch (err) {
            throw new HttpException('Varejista não existe', 404);
        }
        
        const affiliate = await this.affiliateRepository.create({ name, retailerId });
        return affiliate;

    }
}

export { CreateAffiliateUseCase }
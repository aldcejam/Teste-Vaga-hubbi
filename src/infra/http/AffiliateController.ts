import { AffiliateRepository } from '@domain/ratailer/affiliate/AffiliateRepository';
import { RetailerRepository } from '@domain/ratailer/RetailerRepository'; 
import { CreateAffiliateDTO } from '@dtos/affiliate/CreateAffiliateDTO'; 
import { Body, Controller, Post } from '@nestjs/common'; 
import { CreateAffiliateUseCase } from '@usecases/retailer/affiliate/CreateAffiliateUseCase';

@Controller("afiliado")
export class AffiateController {

    constructor(
        private afiliateRepository: AffiliateRepository,
        private retailerRepository: RetailerRepository
    ) { }

    @Post("/")
    async createAffiliateController(@Body() body: CreateAffiliateDTO) {
        const { name, retailerId } = body;
        const createAffiliateUseCase = new CreateAffiliateUseCase(this.afiliateRepository, this.retailerRepository);
        const retailerCreated = await createAffiliateUseCase.execute({
            name, retailerId
        });

        return retailerCreated;
    }
}
